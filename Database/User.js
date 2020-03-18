const { Schema, model } = require("mongoose");
const discrim = Math.floor(Math.random() * 9999) + 1000;

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: Date.now().toString()
    },
    tag: {
        type: String,
        default: discrim
    },
    created: {
        type: Date,
        default: new Date()
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: `https://cdn.discordapp.com/embed/avatars/${discrim % 5}.png`
    }
});

module.exports = model("User", user);