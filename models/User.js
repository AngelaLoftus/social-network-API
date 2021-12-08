const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//schema for a user
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        //email must match the regex expression 
        email: {
            type: String,
            unique: true,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please give a valid email address']
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

//virtual that counts thoughts a user has
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
})

//virtual that counts friends a user has
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//export the user model
const User = model('User', UserSchema);

module.exports = User;
