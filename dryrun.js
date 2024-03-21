const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app=express();
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
app.use(express.json());
app.post('/ecomm/api/v1/auth/signup', (req, res) => {
    try {
        const reqBody = req.body;
        const user = {
            name: reqBody.name,
            userId: reqBody.userId,
            email: reqBody.email,
            userType: reqBody.userType,
            password: bcrypt.hashSync(reqBody.password,8)
        };
        console.log(user);
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
const PORT=8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Server startup error:', error);
});
