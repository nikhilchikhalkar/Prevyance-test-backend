const express = require('express');

const { UserListController, UserCreateController, UserUpdateController, UserDeleteController } = require('../controller/UserDashboardController.js');

const UsersInfoRoute = express.Router()

UsersInfoRoute.get('/userlist',UserListController)
UsersInfoRoute.post('/usercreate',UserCreateController)
UsersInfoRoute.put('/userupdate/:id',UserUpdateController)
UsersInfoRoute.delete('/userdelete/:id',UserDeleteController)


module.exports= UsersInfoRoute














// const express = require('express');
// const Blogmodel = require('../module/Blogmodel');
// const { UserList } = require('../controller/UserDashboardController');


// const BlogRoute = express.Router()

// BlogRoute.post('/create', async(req,res)=>{
//     try {
//         const newblog = await Blogmodel.create(req.body)
//         if (newblog) {
//             return res.status(200).json({
//                 msg:'blog created sucessfully..'
//             })
//         }
//     } catch (error) {
//         res.status(404).json({
//             msg:"server not found",
//             error:error
//         })
//     }
// })

// BlogRoute.get('/allblogs', async(req,res)=>{
//     try {
//         const allblog = await Blogmodel.find()
//         if (allblog) {
//             res.status(200).json({
//                 msg:'getin all blog',
//                 Blog: allblog
//             })
//         }
//     } catch (error) {
//         res.status(404).json({
//             msg:"server not found",
//             error:error
//         })
//     }
// })


// module.exports = BlogRoute