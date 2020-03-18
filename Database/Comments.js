const { Schema, model } = require("mongoose");

const comments = new Schema({
    author: {
        type: Object,
        required: true
    },
    comment: {
        type: Object,
        required: true
    },
    replies: {
        type: Object,
        required: false
    },
    edits: {
        type: Object,
        required: false
    }
});

module.exports = model("Comments", comments);