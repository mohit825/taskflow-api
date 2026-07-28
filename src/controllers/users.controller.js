import { UserService } from "../services/user.service.js";

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

export const registerUser = async (req, res) => {
  const user = await UserService.addUserInDB(req.body);
  console.log(user, "user");
  if (user?.rows?.length) {
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

export const UserController = {
  registerUser,
};
