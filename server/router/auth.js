const { RegisterUser, LoginUser } = require("../controller/auth");

const authRouter = require("express").Router();

authRouter.post("/sign-up", RegisterUser);
authRouter.post("/login", LoginUser);

module.exports = authRouter;
