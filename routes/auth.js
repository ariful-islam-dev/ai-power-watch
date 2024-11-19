const { loginController, registerController } = require("../controlers/auth");
const { login, registerUser } = require("../services/auth");
const { serverError } = require("../utils/error");

const authRouter = (router) => {



router.post("/auth/login", loginController);


router.post("/auth/register", registerController )
}
module.exports = authRouter