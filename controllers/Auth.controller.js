const { generateToken } = require("../jwt.util");
const UserModel = require("../model/User.model");

const AuthRouter = require("express").Router();

// post-method
AuthRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email or password is not provider",
    });
  }
  try {
    const result = await UserModel.findOne({
      email,
    });
    if (result && result._id) {
      if (result.password === password) {
        return res.status(200).json({
          token: generateToken(
            {
              name: result.name,
              role: result.role,
              permission: result.permission,
            },
            result._id
          ),
          message: "sign in successful",
        });
      } else {
        return res.status(401).json({
          message: "email or pwd is invalid",
        });
      }
    } else {
      return res.status(404).json({
        message: "account does not exists",
      });
    
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
});
// post-method
AuthRouter.post("/signup", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const result = await user.save();
    if (result && result._id) {
      return res.status(200).json({
        message: "Signup successful",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Bad request",
    });
  }
});

module.exports = AuthRouter;
