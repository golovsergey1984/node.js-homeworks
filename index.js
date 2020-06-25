require = require('esm')(module)
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import cors from "cors"
import userRouter from "./users/user.router"
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*' //тут описываем uri, с которых возможен доступ к бд. Если стоит '*', значит доступ разрешен всем
}

const runServer = async () => {
    const app = express();
    try {
        const result = await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true });
        /* console.log(result) */
        console.log("Database connection successful")
        app.use(cors(corsOptions))
        /* app.use(morgan('combined')) */
        app.use(express.json())
        app.use("/user", userRouter)

        app.listen(PORT, () => {
            console.log('Server listening on ' + PORT + ' port')
        });
    } catch (err) {
        console.log(err.message)
        process.exit(1)

    }


}
runServer();