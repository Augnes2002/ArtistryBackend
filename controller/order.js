const Order = require('../model/orderModel');
const Product = require('../model/productModel');
const User = require('../model/userRegistration');
const Address = require('../model/addressModel');
const Cart = require('../model/cartModel');
//const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id:'rzp_test_3MJ0cPqPZC9AWJ',
    key_secret:'3YCF5Rpic74iI5tBybJYuY60',
});

exports.createOrder = async(req, res) => {
    try {
        const { products, addressId } = req.body;
        const userId = req.user.id;
        
        if(!products || !products.length || !addressId) {
            return res.status(400).json({success: false, message: "Products or Address not found"});
        }

        const address = await Address.findById(addressId);
        if(!address) {
            return res.status(400).json({success: false, message: "Address not found"});
        }

        let totalAmount = 0;
        const orderItems = [];
        const productUpdates = [];

        for(const item of products) {
            const product = await Product.findById(item.productId);
            if(!product) {
                return res.status(400).json({success: false, message: `Product not found: ${item.productId}`});
            }

            const orderQuantity = item.quantity || 1;
            if(product.quantity < 1) {
                return res.status(400).json({success: false, message: `Product out of stock: ${product.name}`});
            }
            
            totalAmount +=Number(product.price )+ Number(product.shippingFee || 0);
            orderItems.push({
                productId: product._id,
                price: product.price,
                shippingFee: product.shippingFee || 0,
            });
            
            productUpdates.push({
                productId: product._id,
                newQuantity: product.quantity - 1,
            });
        }
        console.log("Creating Razorpay order with amount:", Math.round(totalAmount * 100));
        // Create Razorpay order with proper amount format
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100), // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`, // Fixed: use Date.now() instead of new Date().getTime
        });
        console.log("Razorpay order created:", razorpayOrder.id);
        // Create order with updated schema structure
        const order = new Order({
            userId,
            productId: products[0].productId, // Assuming the first product is the main product
            items: orderItems, // Updated to match schema
            addressId,
            amount: totalAmount,
            orderId: razorpayOrder.id, // String ID from Razorpay
            status: 'Pending',
            paymentDetails: {
                razorpayOrderId: razorpayOrder.id,
                paymentStatus: 'Pending'
            },
        });
        
        await order.save();
        
        // Update product quantities
        for (const update of productUpdates) {
            await Product.findByIdAndUpdate(
                update.productId,
                { quantity: update.newQuantity }
            );
        }

        res.status(200).json({  // Changed to 201 for resource creation
            success: true,
            message: "Order created successfully",
            order,
            razorpayOrderId: razorpayOrder.id,
            amount: Math.round(totalAmount * 100), // Return amount in paise
        });
    }
    catch(error) {
        console.error("Order creation error:", error);
        return res.status(500).json({
            success: false, 
            message: "Error occurred during order creation", 
            error: error.message
        });
    }
}


exports.verifyPayment = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
        const text = `${razorpayOrderId}|${razorpayPaymentId}`;
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '3YCF5Rpic74iI5tBybJYuY60')
            .update(text)
            .digest('hex');

        // Fixed: Use generatedSignature instead of expectedSignature
        if (generatedSignature !== razorpaySignature) {
            return res.status(400).json({ message: 'Invalid signature' });
        }

        const order = await Order.findOneAndUpdate(
            {'paymentDetails.razorpayOrderId': razorpayOrderId},
            {
                'paymentDetails.paymentId': razorpayPaymentId,
                'paymentDetails.paymentStatus': 'Success',
                'status': 'Approved'
            },
            {new: true}  
        );
        if(!order) {
            return res.status(404).json({message: 'Order not found'});
        }

        await Cart.deleteMany({userId: order.userId});

        res.status(200).json({success: true, message: 'Payment verified successfully', order});
    }
    catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.getMyOrders = async(req,res)=>{
    try{
        const orders = await Order.find({userId:req.user._id})
        .populate('productId','name price productImage')
        .populate('addressId')
        .sort({createdAt:-1});
        res.status(200).json({success:true,message:"Orders fetched successfully",orders});
    }
    catch(e){
        return res.status(500).json({success:false,message:"Error occured",e});
    }
}

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      res.status(200).json({
        success: true,
        orders
      });
    } catch (error) {
      console.error('Error fetching all orders:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  exports.updateOrderStatus = async (req, res) => {
    try {
      // Check if user is admin
    //   if (!req.user.isAdmin) {
    //     return res.status(403).json({ message: 'Not authorized' });
    //   }
      
      const { orderId, status } = req.body;
      
      // Validate status
      const validStatuses = ['Pending', 'Approved', 'Packed', 'Shipped', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      ).populate('userId', 'name email')
       .populate('productId', 'name price images')
       .populate('addressId');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // If order is cancelled and payment was successful, implement refund logic here
      if (status === 'Cancelled' && order.paymentDetails.paymentStatus === 'Success') {
        // Implement refund logic with Razorpay
        // This is just placeholder. You would need to implement actual refund logic
        console.log(`Refund should be processed for order ${orderId}`);
      }
      
      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        order
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('productId', 'name price images')
        .populate('addressId')
        .populate('userId', 'name email');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Check if the order belongs to the user or the user is an admin
      if (order.userId._id.toString() !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
      
      res.status(200).json({
        success: true,
        order
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };