const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //  Get user By email
      const user = await User.findOne({ email: email });

      //  Match The password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          resolve(user);
        } else {
          // pass didn't Match
          reject("Authentication Failed");
        }
      });
    } catch (err) {
      // EMail not found
      reject("Authentication Failed");
    }
  });
};
