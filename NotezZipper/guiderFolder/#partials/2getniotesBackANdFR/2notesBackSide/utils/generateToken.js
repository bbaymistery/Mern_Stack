const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  //bunu regisster ve login edende front end terefinden tesdiqlenmesi ucun gonderirik
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
