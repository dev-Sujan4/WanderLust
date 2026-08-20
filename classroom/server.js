const express = require ("express")
const app = express();
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const flash = require('connect-flash');
const session = require('express-session')


app.use (session ({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(flash())

app.use ((req,res,next)=>{
    res.locals.sucess=req.flash("sucess")
    res.locals.error=req.flash("error")
    
    next()
})

app.get ("/listen", (req,res)=>{
    req.session.name = req.query.name;
    req.flash("sucess","listing created")
    res.redirect ("/sujan" )
})

app.get ("/sujan", (req,res) =>{
    res.render("show.ejs",{name : req.session.name})
})


app.get ("/" ,(req,res) =>{
    res.send ("hello")
})




app.listen(3000, () =>{
    console.log("app is listning")
})