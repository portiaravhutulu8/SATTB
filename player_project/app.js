//creating the localhost/express server to test functions
//nodemon restarts the server
//Automatically adds Env information to the file(Transfersnmp)
const express = require('express');
const app = express();
require("./Database/db")

const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    req.on('data', (chunk) => {
        console.log(JSON.parse(chunk));//will produce teh results on the terminal
        next();
    });

});

//much shorter way can be the app.use(express.json())
/*app.post('/api/user/create', (req, res, next) => {
    req.on('data', (chunk) => {
        console.log(JSON.parse(chunk));//will produce teh results on the terminal
        next();
    });

}, (res, req) => {
    res.send(req.body) This is the long way use app.use
});*/

//using app.use(A middleware function)//research the function

app.listen(PORT, () => {
    console.log('app is running on port 8000');
});