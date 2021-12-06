const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Thought = require('./Thought');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please give a valid email address fool']
        },
        //I don't understand how to do thoughts and friends, it says I cannot import a model here
        //friends is supposed to be self referencing, I don't get that.
        thoughts: [ ],
        friends: []
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
