// Import necessary packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

// Create Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing urlencoded request bodies
app.use(bodyParser.urlencoded({extended: true}));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB database
mongoose.connect("mongodb+srv://ruthstewart1000:Max%2BBlossom%3D100%25@clusternew0.blygh3y.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Define schema for individual to-do list items
const itemsSchema = {
  name: String
};

// Define Mongoose model for items
const Item = mongoose.model("Item", itemsSchema);

// Create default items
const item1 = new Item({
  name: "Welcome to your to do list!"
});

const item2 = new Item({
  name: "Hit the ☁️ button to add a new item."
});

const item3 = new Item({
  name: "← Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

// Define schema for lists
const listSchema = {
  name: String,
  items: [itemsSchema]
};

// Define Mongoose model for lists
const List = mongoose.model("List", listSchema);

// Utility function to get current date
function getCurrentDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  return today.toLocaleDateString(undefined, options);
}

// Route to render homepage with today's to-do list items
app.get("/", async function(req, res) {
  try {
    const foundItems = await Item.find({});
    if (foundItems.length === 0) {
      await Item.insertMany(defaultItems);
      console.log("Successfully saved default items to DB.");
      res.redirect("/");
    } else {
      const currentDate = getCurrentDate();
      res.render("list", { listTitle: "Today", newListItems: foundItems, currentDate: currentDate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to render custom list page or create a new list
app.get("/:customListName", async function(req, res){
  try {
    const customListName = _.capitalize(req.params.customListName);
    const foundList = await List.findOne({name: customListName});
    if (!foundList){
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      await list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle adding new items to lists
app.post("/", async function(req, res){
  try {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({ name: itemName });
    if (listName === "Today"){
      await item.save();
      res.redirect("/");
    } else {
      const foundList = await List.findOne({name: listName});
      foundList.items.push(item);
      await foundList.save();
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle deleting items from lists
app.post("/delete", async function(req, res){
  try {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName === "Today") {
      await Item.findByIdAndRemove(checkedItemId);
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    } else {
      await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}});
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to render the about page
app.get("/about", function(req, res){
  res.render("about");
});

// Determine port for server to listen on
let port = process.env.PORT;
if (port === null || port == "") {
  port = 8000;
}

// Start server
app.listen(3000, function() {
  console.log("Server started successfully");
});


