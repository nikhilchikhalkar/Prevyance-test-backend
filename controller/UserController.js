const Usermodel = require('../module/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.UserRegisterController = async (req,res)=>{
    try {
        const {firstName,lastName, mobile, address,profilePicture,email,password} = req.body;
        const existuser = await Usermodel.findOne({email})
        if (existuser) {
            return res.status(200).json({
                msg:"user allready register"
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        const user = await Usermodel.create({firstName,lastName,mobile, address, profilePicture, email, password:hashPassword})
        if (user) {
            return res.status(200).json({
                msg:'register sucessfully',
            })
        }
        return res.status(400).json({
            msg: 'user not created try again '
        })  

    } catch (error) {
        console.log(`error while register user ${error}`);
        res.status(400).json({
            msg: 'server not running ',
            error: error
        }) 
    }
}

exports.UserLoginController =  async(req,res)=>{
    const {email, password} = req.body;
    try {
        const existuser = await Usermodel.findOne({email})
        if (!existuser) {
            return res.status(200).json({
                msg: "user not register "
            })
        }
        const user = bcrypt.compareSync(password, existuser.password)
        // console.log(user,"checking login");
        const token = jwt.sign({userid:existuser._id }, 'Nikhil' ,{expiresIn:'1h'});
        if (user) {
            return res.status(200).json({
                msg:'login sucessfully',
                token: token
            })
        }

    } catch (error) {
        res.status(400).json({
            msg:'error while login',
            error: error
        })
    }
}