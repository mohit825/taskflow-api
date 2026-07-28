import { UserService } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  const user = await UserService.addUserInDB(req.body);
  console.log(user, "user");
  if (user) {
    res.send({
      message: "User added successfully",
      status: "success",
      user: user,
    });
  } else {
  }
};

export const UserController = {
  registerUser,
};
