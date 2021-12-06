//import express router
const router = require('express').Router();

//import the user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//tell router to use the user and thoughtroutes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes); 

//export the router
module.exports = router;