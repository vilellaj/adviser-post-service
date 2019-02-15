const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const CommentSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

CommentSchema.plugin(timestamps);

const PostSchema = new mongoose.Schema({
        userId: {
            type: String,
            require: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true
        },
        comments: [CommentSchema]

	},
	{ minimize: false }
);

PostSchema.plugin(timestamps);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;