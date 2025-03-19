const express = require('express');

const { UserLoginController, UserRegisterController } = require('../controller/UserController');

const UserRoute = express.Router()

UserRoute.post('/register',UserRegisterController)

UserRoute.post('/login',UserLoginController)

module.exports= UserRoute