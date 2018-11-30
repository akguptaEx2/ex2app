const router = require('express')();
const UserController = require('./user.controller');
router.get('/',UserController.getAllUsers);
//Creating new user
router.post('/new',UserController.createNewUser);
//get user by username
router.get('/:pattern',UserController.getUser);
//delete user by username
router.delete('/:username',UserController.deleteUser);
//update user by username
router.patch('/:username',UserController.updateUser);
//login user
router.post('/login',UserController.login);
//logout user
router.delete('/me/logout',UserController.authMiddleware,UserController.logout);
module.exports = router;