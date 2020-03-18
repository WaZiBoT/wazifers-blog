const app = require("express").Router();
const { User } = require("../Database/index");
const { admins } = require("../config");

app.get("/", (req, res) => {
    if (req.session.user) return res.redirect("/");
    else return res.redirect("/auth/login");
});

app.get("/login", (req, res) => {
    if (req.session.user) return res.redirect("/");
    return res.render("login", { user: req.session.user || null, error: false, obj: null });
});

app.post("/login", async (req, res) => {
    if (req.session.user) return res.redirect("/");
    let obj = {
        email: req.body.email,
        password: req.body.password
    };
    let user = await User.findOne({ email: obj.email });
    if (!user) return res.render("login", { user: req.session.user || null, error: "User with that e-mail doesn't exists!", obj: obj });
    if (obj.password !== user.password) return res.render("login", { user: req.session.user || null, error: "Invalid password!", obj: obj });
    req.session.user = user;
    return res.redirect("/");
});

app.get("/create", (req, res) => {
    if (req.session.user) return res.redirect("/");
    return res.render("register", { user: req.session.user || null, error: false, obj: null });
});

app.post("/create", async (req, res) => {
    if (req.session.user) return res.redirect("/");
    let obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    let user = await User.findOne({ email: obj.email });
    if (user) return res.render("register", { user: req.session.user || null, error: "User with that e-mail already exists!" });
    let newUser = new User({
        username: obj.name,
        email: obj.email,
        password: obj.password,
        admin: checkAdmin(obj.email)
    });
    newUser = await newUser.save().catch(e => {});
    req.session.user = newUser;
    return res.redirect("/");
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    return res.redirect("/");
});

function checkAdmin(email) {
    if (admins.includes(email)) return true;
    return false;
};

module.exports = app;