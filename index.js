const express = require("express");
const morgan = require('morgan')
const PORT = 3000;
const app = express();
const cors = require("cors")
const { userRouter } = require("./user/user.router");

const corsOptions = {
    origin: '*' //тут описываем uri, с которых возможен доступ к бд. Если стоит '*', значит доступ разрешен всем
}

app.use(cors(corsOptions))
app.use(morgan('combined'))

app.use(express.json())
app.use('/api/contacts', userRouter)

app.listen(PORT, () => {
    console.log('Server listening on ' + PORT + ' port')
});