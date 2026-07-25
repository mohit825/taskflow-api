import { UserService } from "../services/user.service.js";

export const registerUser = (req, res) => {
  const isSuccess = UserService.addUserInDB();
  if (isSuccess) {
    const users = res.json({
      message: "User added successfully",
      status: "success",
    });
  }
};

export const UserController = {
  registerUser,
};
