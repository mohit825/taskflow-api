import { UserService } from "../../services/user/user.service.js";
import bcrypt from "bcrypt";

const createErrorMessage = (user) => {
  const errObj = {
    DuplicateErr: {
      message: "Duplicate key exists",
      code: 409,
    },
  };
  return {
    message: errObj[user.err].message,
    constraint: user.constraint,
    code: errObj[user.err].code,
  };
};

const registerUser = async (req, res) => {
  const user = await UserService.addUserInDB(req.body);
  if (user?.id) {
    res.status(201).json({
      message: "User added successfully",
      status: "success",
      user: user,
    });
  } else {
    const queryErr = createErrorMessage(user);
    res.status(queryErr.code).json(queryErr);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await UserService.findUserByEmail(email);
  console.log(foundUser, "ioio");
  if (foundUser !== undefined) {
    const { password_hash } = foundUser;
    const isPasswordValid = await bcrypt.compare(password, password_hash);
    if (isPasswordValid) {
      res.status(200).json({
        message: "User Authenticated Successfully",
        status: "true",
        user: {
          email: foundUser.email,
          name: foundUser.display_name,
          status: foundUser.acc_status,
        },
      });
    } else {
      res.status(401).json({
        message: "Provide correct email and password",
        status: "error",
      });
    }
  } else {
    res.status(401).json({
      message: "Provide correct email and password",
      status: "error",
    });
  }
};

export const UserController = {
  registerUser,
  loginUser,
};
