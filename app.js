
const express = require("express")
const date = require(__dirname + "/date.js")


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())


//If this doesnt work use app.set()
app.set('view engine', 'ejs');

app.use(express.static("public"));


var items = ['Buy Food', 'Cook Food', 'Eat Food',]

var workItems = []

app.get('/', function(req, res) {

    res.render("list", {kindOfDay: date.getDate(), newTodo: items, typeOfList: "todo"})
})

app.post('/', function(req, res){
    console.log(req.body)
    if (req.body.button === "todo"){
        items.push(req.body.newTodo)
        res.redirect("/")
    } else{
        workItems.push(req.body.newTodo)
        res.redirect("/work")
    }
});

app.get('/work', function(req, res) {
    var work = "Work"

    res.render("list", {kindOfDay: work, newTodo: workItems, typeOfList: "business"})
})

app.post('/work', function(req, res){
    workItems.push(req.body.newTodo)

    res.redirect("/work")
});

app.get("/about", function(req, res){
    res.render("about")
})

app.listen(3000, function(){
    console.log("Server started on port 3000")
})