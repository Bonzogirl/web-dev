// modes
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();
// Mode use
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Mongoose
mongoose.connect('mongodb://localhost:27017/todolistDB');
//list schema
const itemsSchema = new mongoose.Schema({
  name: String,
});

const ItemModel = mongoose.model('Item', itemsSchema);

const item1 = new ItemModel({
  name: 'Hug',
});
const item2 = new ItemModel({
  name: 'Kiss',
});
const item3 = new ItemModel({
  name: 'Fuck',
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const ListModel = mongoose.model('List', listSchema);

// open the main page
app.get('/', function (req, res) {
  console.log('GET_STARTED');
  //find all items
  ItemModel.find({}, function (err, foundItems) {
    //if not found insert/create items
    if (foundItems.length === 0) {
      ItemModel.insertMany(defaultItems, function (err) {
        if (err) {
          //log error if failed
          console.log(err);
        } else {
          //log successful
          console.log('Success');
        }
      });
      //redirect homepage after insert
      res.redirect('/');
    } else {
      //if items found, render/display list
      res.render('list', { listTitle: 'Today', newListItem: foundItems });
    }
  });
  //currently unused
  // let day = date.getDate();
});

// add items on main page
app.post('/', function (request, response) {
  console.log('POST_STARTED');
  const itemName = request.body.newItem; //change to itemName
  const listName = request.body.list; //listName

  const item = new ItemModel({
    name: itemName,
  });

  console.log('listName', listName);

  if (listName === 'Today') {
    item.save();
    response.redirect('/');
  } else {
    console.log('HERE');
    ListModel.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      response.redirect('/' + listName);
    });
  }
});

// deleted main page
app.post('/delete', function (req, res) {
  const checkedItem = req.body.checkbox;
  ItemModel.findByIdAndRemove(checkedItem, function (err) {
    if (!err) {
      res.redirect('/');
    }
  });
});

// render other created pages
app.get('/:customList', function (req, res) {
  const customList = req.body.customList;
  ListModel.findOne({ name: customList }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new ListModel({
          name: customList,
          items: defaultItems,
        });
        list.save();
        res.redirect('/' + customList);
      } else {
        res.render('list', {
          listTitle: foundList.name,
          newListItem: foundList.items,
        });
      }
    }
  });
});

// post work items
// app.post('/work', function (req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect('/work');
// });

app.listen(4000, function () {
  console.log('Server started');
});
