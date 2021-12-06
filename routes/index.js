//package up all the routes and send them through '/api'
const router = require('express').Router();
const apiRoutes = require('./api');

//tell router to use '/api' route
router.use('/api', apiRoutes);

router.use((req,res) => {
    res.status(404).send('<h1>HEY!!!! 404 Error!</h1>');
});

//export the router
module.exports = router;