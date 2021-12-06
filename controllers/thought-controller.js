//import the Thought model
const { Thought } = require('../models');

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
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err=> {
                console.log(err);
                res.sendStatus(400);
            });
    },
//create a new thought and associate it to its user
//(don't forget to push the created thought's _id to the associated user's thoughts array field)
//NEED HELP WITH THIS $Push method??
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                User.findOneAndUpdate({}, {$push: {user: _id }}, {new: true})
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
    }
};

//export the thought controller
module.exports = thoughtController;
