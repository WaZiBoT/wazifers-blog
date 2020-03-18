const { Schema, model } = require("mongoose");

const blog = new Schema({
    data: {
        type: Object,
        required: true
    },
    author: {
        type: Object,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    views: {
        type: Number,
        default: 0
    },
    edits: {
        type: Object,
        required: false
    },
    edited_at: {
        type: Date,
        required: true
    },
    comments: {
        type: Object,
        required: true
    },
    upvotes: {
        type: Number,
        required: false,
        default: 0
    },
    downvotes: {
        type: Number,
        required: false,
        default: 0
    },
    comments: {
        type: Object,
        required: false
    }
});

module.exports = model("Blog", blog);