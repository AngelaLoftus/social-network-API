//import the User model
const { User, Thought} = require('../models');

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
        })
        .populate({ 
            path: 'friends',
            select: '-__v'
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: "no user found with this id"});
                return;
            }
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
    //Remove a user's associated thoughts when deleted.
    deleteUser({ params }, res) {
        User.findOneAndDelete(
            { _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
            res.json(dbUserData);
            console.log('userdata.thoughts', dbUserData.thoughts);
            return Thought.deleteMany({_id: {$in: dbUserData.thoughts}})
        })
        .catch(err => res.json(err));
    },
    addFriend({ params, body }, res){
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
    },
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId } },
            {new: true, runvalidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "no User found with this ID" });
                return;
            }
            response.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

//export the user controller 
module.exports = userController;