const UserModel = require("./model");
const bcrypt = require("bcrypt");

const { createJWT } = require("../../utils/createToken");

//creating a login
module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const data = req.body;
    if (!email || !password || !firstName || !lastName) {
      throw new Error(
        "Please provide your password, email, firstName, lastName"
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    data.password = encryptedPassword;

    const user = await UserModel.create(data);

    res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//to login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json("invalid password of email");
    }

    //search
    const user = await UserModel.find({ email: email });

    //does it exists
    if (user.length === 0) {
      return res.status(401).json("Invalid password or email");
    }

    //compare
    const checkUser = await bcrypt.compare(password, user[0].password);

    //validate
    if (!checkUser) {
      return res.status(401).json("Invalid password or email");
    }

    const token = createJWT(user[0].id);

    res.status(201).json({
        data: { user: user[0] },
        token,
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
