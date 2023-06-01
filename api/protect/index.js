const jwt = require("jsonwebtoken");
const configs = require("../../config");

const user = require("../user/model");
const UserModel = require("../user/model");

//protection route
module.exports = async (req, res, next) => {
  try {
    let token = "";

    //get the token
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //checking the token
    if (!token) return res.send("Please login");

    //verifiying the token
    const data = jwt.verify(token, configs.jwt);

    //check user
    const user = await UserModel.findOne({ _id: data.id });

    //attach user on request object
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
  }
};
