const logindb = require("../model/login");
const bcrypt = require("bcrypt");


exports.signup = async (req, res) => {
  const data = {
    name: req.body.username,
    email: req.body.Email,
    password: req.body.password,
  };

  try {
    // check the user already exists
    const existingUser = await logindb.findOne({ email: data.email });
    if (existingUser) {
      return res.render("signup",{errorMessage:"Username already exists."});
    }

    // hash the password using bcrypt
    const saltRounds = 10; // number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // replace the plain password with the hashed one
    const userData = await logindb.insertMany(data);
    console.log(userData);

    // session after successful signup
    req.session.user = userData;
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).send("Internal Server Error");
  }
};


//   login user

// exports.login = async (req, res) => {
//   try {
//       const check = await logindb.findOne({ name: req.body.username });

//       if (!check) {
//        return   res.send("User name cannot be found");
//       }

//       // Compare the password from the database with the plain text
//       const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

//       if (isPasswordMatch) {
//         return res.render("index");
//     } else {
//         return res.send("Wrong password");
//     }
    
//   } catch (error) {
//     return res.send("Wrong details");
// }

// };
exports.login = async (req, res) => {
  try {
    const check = await logindb.findOne({ email: req.body.Email });

    // Check if the username is not found
    if (!check) {
      return res.render("login", { errorMessage: "*Invalid username or password?" });
    }

    // Compare the password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

    if (isPasswordMatch) {
      // Set the user session upon successful login
      req.session.user = check;
      res.redirect("/");
  }else {
      return res.render("login", { errorMessage: "*Invalid username or password?" });
    }
  } catch (error) {
    return res.render("login", { errorMessage: "Error processing your request" });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

