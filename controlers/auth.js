const { login, registerUser } = require("../services/auth");
const { serverError } = require("../utils/error");

const loginController =  async(req, res)=> {
    const {email, password} = req.body;
    
   try{
    const authUser = await login(email, password);

    res.status(200).json(
        {
            code: 200,
            data: authUser,
            message: "Login successful",
            links: "/auth/login"
        }
    );

   }catch(error) {
    res.status(500).json(serverError(error.message));
   }

}


const registerController =  async(req, res)=> {
    const {name, email, password} = req.body;

    try {
        const authUser = await registerUser(name, email, password);
        res.status(200).json(
            {
                code: 200,
                data: authUser,
                message: "User created successfully",
                links: "/auth/login"
            }
        );
    } catch (error) {
       res.status(500).json(serverError(error.message));
    }
}



module.exports = {loginController, registerController};