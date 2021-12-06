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
            //validator for email address (look into mongoo'se matching validation)
        },
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
