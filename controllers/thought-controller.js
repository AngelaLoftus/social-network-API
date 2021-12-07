//import the Thought model
const { Thought, User } = require('../models');

//controller to contain all thought functions
const thoughtController = {
//get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
//get a single thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                console.log('dbthoughtdata', dbThoughtData);
                res.json(dbThoughtData)})
            .catch(err=> {
                console.log(err);
                res.sendStatus(400);
            });
    },
//create a new thought and associate it to its user
    createThought({ body }, res) {
        console.log("body", body)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ username: body.username}, {$push: {thoughts: _id }}, {new: true})
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err)); 
    },
//update an existing thought (put route)
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: "No thought found with this id"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
//delete a thought by id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: "No thought found with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
//add a reaction to a thought 
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "no thought found with this id man"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
//delete a reaction from a thought
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            // { $pull: {replies: {replyId: params.replyId} } },
            { $pull: {reactions: {reactionId: params.reactionId} } },
            { new: true, runValidators: true})
        .then(dbReactionData => {
            if(!dbReactionData){
                res.status(404).json({ message: "No reaction found with this id"});
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err => res.json(err));
    }
};

//export the thought controller
module.exports = thoughtController;
