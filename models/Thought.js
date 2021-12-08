//import mongoose and date format
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//schema for a reaction to a thought
const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

//schema for a thought
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
); 

//virtual that counts the number of reactions a thought has
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//export the Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;