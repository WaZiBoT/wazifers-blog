const app = require("express").Router();
const { Blog, User } = require("../Database/index");

app.get("/", async (req, res) => {
    let blogs = await Blog.find();
    return res.render("index", { user: req.session.user || null, blogs: blogs });
});

app.get("/me", async (req, res) => {
    if (!req.session.user) return res.redirect("/auth");
    let blogs = await Blog.find({ author: req.session.user });
    return res.render("me", {
        user: req.session.user || null,
        blogs: blogs
    });
});

app.get("/user/:id", async (req, res) => {
    let users = await User.find();
    let struct = {
        username: users.username,
        discriminator: users.tag,
        id: users.id,
        avatar: users.avatar,
        admin: users.admin,
        created: users.created
    };
    return res.render("user", {
        user: req.session.user || null,
        users: struct
    });
});

module.exports = app;