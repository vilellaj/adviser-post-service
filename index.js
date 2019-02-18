const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/post');

const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const userId = req.body.userId;
        const name = req.body.name;
        const message = req.body.message;

        const post = new Post();
        post.userId = userId;
        post.name = name;
        post.message = message;

        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/posts/:id/comments', async (req, res) => {
    try {
        await Post.updateOne({ _id: req.params.id }, {
            $push: {
                comments: req.body
            }
        });

        res.status(200).json({ message: 'Comment added.' });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/posts/user/:id', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.put('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });

        if (post) {
            Object.assign(post, req.body);
            await post.save();
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found'});
        }

    } catch (error) {
        console.dir(error);
        res.status(500).send(error);
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(200).json({ "message": "Post deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, async () => {
    console.log(`post-service running on ${port}`);
    mongoose.connect(mongoUri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});