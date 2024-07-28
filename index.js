import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let id = 0;
let id1 = 0;
let post = [];
let user = [];

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        post
    });
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    const {title, content} = req.body;
    // const id = post.length;
    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = currentDate.getFullYear();
    const date = `${dd}/${mm}/${yyyy}`;

    post.unshift({id, title, content, date});
    // post.reverse();
    id = id + 1;
    // console.log(post);
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const ind = post.findIndex((i) => i.id === parseInt(req.params.id));
    if(ind !== -1){
        post.splice(ind, 1);
        res.redirect("/");
    }
    else{
        res.status(404).send("Post not found !!!!!!!!!!");
    }
});
app.get("/edit/:id", (req, res) => {
    const ind = post.findIndex((i) => i.id === parseInt(req.params.id));
    if(ind !== -1){
        res.render("edit.ejs", {
            id: post[ind].id,
            title: post[ind].title,
            content: post[ind].content
        });
    }
    else{
        res.status(404).send("Post Not found !!!!!!!");
    }
});

app.post("/edit/:id", (req,res) => {
    const {title, content} = req.body;
    const ind = post.findIndex((i) => i.id === parseInt(req.params.id));
    post[ind].title = title;
    post[ind].content = content;
    
    res.redirect("/");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/contact", (req, res) => {
    const{fname, lname, email, message} = req.body;
    user.unshift({fname, lname, email, message});
    // console.log(user);
    res.redirect("/contact");
});

app.listen(port, () => {
    console.log(`Server started at ${port}.`);
});