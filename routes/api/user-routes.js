//import the express router
const router = require('express').Router();
//import functions from user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

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

//routes to add or remove a friend from the list
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

//export the router
module.exports = router;