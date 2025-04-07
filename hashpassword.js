const bcrypt = require("bcrypt");

const password = "Augnes@2002"; 

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }
  console.log("Hashed password:", hash);
});
