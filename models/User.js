const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// const Thought = require('./Thought');

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
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
