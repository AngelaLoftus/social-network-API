//import the router
const router = require('express').Router();

//import the functions from thought controller
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//routes for getting and posting thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

//routes referring to thoughts by id
router.route('/:id')
    .get(getThoughtById)
    .delete(deleteThought)
    .put(updateThought);

//route to add a reaction to a thought
router.route('/:id/reactions')
    .post(addReaction)

//route to delete a reaction by id
router.route('/:id/reactions/:reactionId')
    .delete(deleteReaction);
    
//export the router
module.exports = router;