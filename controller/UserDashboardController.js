const Usermodel = require('../module/Usermodel');
const bcrypt = require('bcrypt');

exports.UserListController = async (req, res) => {
    try {
        // Fetching all users from the database
        const users = await Usermodel.find();

        // Check if there are any users
        if (users.length === 0) {
            return res.status(404).json({
                msg: "No users found"
            });
        }

        // Sending the list of users as a response
        return res.status(200).json({
            msg: "Users retrieved successfully",
            data: users
        });

    } catch (error) {
        console.log(`Error while fetching users: ${error}`);
        res.status(400).json({
            msg: 'Server error while fetching users',
            error: error.message
        });
    }
}


exports.UserCreateController = async (req,res)=>{
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





exports.UserUpdateController = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a URL parameter
        const { firstName, lastName, mobile, address, profilePicture, email, password } = req.body;

        // Check if the user exists
        const user = await Usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // Update the user data
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.mobile = mobile || user.mobile;
        user.address = address || user.address;
        user.profilePicture = profilePicture || user.profilePicture;
        user.email = email || user.email;

        // If password is provided, hash it before updating
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(password, salt);
        }

        // Save the updated user
        const updatedUser = await user.save();

        // Send success response
        return res.status(200).json({
            msg: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.log(`Error while updating user: ${error}`);
        res.status(400).json({
            msg: 'Error updating user',
            error: error.message
        });
    }
}



exports.UserDeleteController = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a URL parameter

        // Check if the user exists
        const user = await Usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // Delete the user
        await user.remove();

        // Send success response
        return res.status(200).json({
            msg: "User deleted successfully"
        });

    } catch (error) {
        console.log(`Error while deleting user: ${error}`);
        res.status(400).json({
            msg: 'Error deleting user',
            error: error.message
        });
    }
}
