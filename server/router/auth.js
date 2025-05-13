const authRouter = require("express").Router();

const { register, login } = require("../controller/auth");

authRouter.post("/sign-up", register);
authRouter.post("/login", login);

module.exports = authRouter;
