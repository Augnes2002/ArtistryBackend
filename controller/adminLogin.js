const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const password = "$2b$10$w.1s/1zqIjKtA.61HvwSTORaDvaJSosuYHiK5cUXv9fklbJwmVoUi";
const username = "admin";

router.post("/admin/login",async(req, res) => {
    const { username: inputUsername, password: inputPassword } = req.body;
    
    if (inputUsername !== username) {
        return res.status(401).json({ message: "Invalid username" });
    }

    try {
        const isMatch = await bcrypt.compare(inputPassword, password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }


        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during password comparison:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
);

module.exports = router;
