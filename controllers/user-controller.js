//import the User model
const { User } = require('../models');

//controller to contain functions for users
const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //get single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .select('-__v')
        .populate({ 
            path: 'thoughts',
            select: '-__v'
        }
        // }
        )
        .then(dbUserData => {
            console.log('dbuserdata', dbUserData);
            res.json(dbUserData)})
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    //update an existing user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //delete an existing user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

//export the user controller 
module.exports = userController;