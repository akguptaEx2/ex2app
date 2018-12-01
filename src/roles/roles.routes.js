/**
 * @author Arup Kumar Gupta
 * @email akgupta@ex2india.com
 * @create date 2018-12-01 11:48:01
 * @modify date 2018-12-01 11:48:01
 * @desc roles routes accessed by /api/roles
*/

const router = require('express').Router();
const {SyncDb} = require('../middleware');
const RolesController = require('./roles.controller');
router.use(SyncDb);
//get all roles
router.get('/',RolesController.getRoles);

//create a new role
router.post('/new',RolesController.createRole);

//delete an existing role - set it inactive
router.patch('/:role',RolesController.deleteRole);
module.exports = router;