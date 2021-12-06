//import the router
const router = require('express').Router();

//import the functions from thought controller
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought
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

//export the router
module.exports = router;