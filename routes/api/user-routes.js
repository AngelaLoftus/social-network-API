//import the express router
const router = require('express').Router();
//import functions from user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend

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

    // /api/users/:userId/friends/:friendId

    // POST to add a new friend to a user's friend list
    
    // DELETE to remove a friend from a user's friend list

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete();

// router
//     .route('/:userId/friends/:friendId')

//export the router
module.exports = router;