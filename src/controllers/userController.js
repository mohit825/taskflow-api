export const registerUser = (req, res) => {
  res.json({
    code: 201,
    message: "User registered successfully",
    status: "success",
  });
};

export const UserController = {
  registerUser,
};
