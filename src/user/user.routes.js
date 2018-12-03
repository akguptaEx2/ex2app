/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:49:33
 * @modify date 2018-12-01 11:49:33
 * @desc User Routes
*/

const router = require('express')();
const {SyncDb} = require('../middleware');
router.use(SyncDb);
const UserController = require('./user.controller');
const {Auth} = require('../middleware');
router.get('/',UserController.getAllUsers);
//Creating new user
router.post('/new',Auth.authMiddleware,UserController.createNewUser);
//get user by username
router.get('/:pattern',UserController.getUser);
//delete user by id - set it inactive
router.patch('/:id/delete',UserController.deleteUser);
//update user by username
router.patch('/:id',UserController.updateUser);
//login user
router.post('/login',UserController.login);
//logout user
router.delete('/me/logout',Auth.authMiddleware,UserController.logout);
//update profile
router.patch('/me/profile',Auth.authMiddleware,UserController.updateProfile);
//view profile
router.get('/me/profile',Auth.authMiddleware,UserController.viewProfile)
module.exports = router;