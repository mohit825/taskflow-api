import * as z from "zod";

export const registerUserValidation = (req, res, next) => {
  const registeredUserSchema = z.object({
    display_name: z.string().min(3),
    email: z.email(),
    password: z.string(),
  });
  let result = registeredUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      status: "Failed",
      message: "Please check input for ",
    });
  } else {
    next();
  }
};

export const loginUserValidation = (req, res, next) => {
  const loginUserSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
  });
  let result = loginUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      status: "Failed",
      message: "Please provide valid email and password ",
    });
  } else {
    next();
  }
};
