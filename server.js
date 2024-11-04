const http = require('http');
const app = require('./app.js');
const connectionDB = require('./db/index.js');

const server = http.createServer(app);

const PORT = process.env.PORT || 4000

const main = async()=>{
    try{
        await connectionDB();
        server.listen(PORT, ()=>{
            console.log("Server is running on port", PORT);
        })
    }catch(err){
        console.log("Database Error");
        console.log(err)
    }
}

main(); 