const { login, registerUser } = require("../services/auth");

const loginController =  async(req, res, next)=> {
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
    next(error)
   }

}


const registerController =  async(req, res)=> {
    const {name, email, password} = req.body;

    try {
        const authUser = await registerUser(name, email, password);
        res.status(201).json(
            {
                code: 201,
                data: authUser,
                message: "User created successfully",
                links: "/auth/login"
            }
        );
    } catch (error) {
        next(error)
    }
}



module.exports = {loginController, registerController};