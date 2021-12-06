//import the express router
const router = require('express').Router();
//import functions from user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser

} = require('../../controllers/user-controller');

//routes for getting and posting users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//routes referring to user by id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// router
//     .route('/:userId/friends/:friendId')

//export the router
module.exports = router;