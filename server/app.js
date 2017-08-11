const express = require('express');
const morgan = require('morgan');
const chai = require('chai');
const chaiHttp = require('chai-http');
const bodyParser = require('body-parser');
const _ = require('lodash');

var toDoData = [
            {
            todoItemId: 0,
            name: 'an item',
            priority: 3,
            completed: false
            },
            {
            todoItemId: 1,
            name: 'another item',
            priority: 2,
            completed: false
            },
            {
            todoItemId: 2,
            name: 'a done item',
            priority: 1,
            completed: true
            }
        ];

var newObj =  {
            todoItemId: 0,
            name: "item to be posted",
            priority: 0,
            completed: true
        };

chai.use(chaiHttp);

const app = express();

app.use(bodyParser.json());                                  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));          // for parsing application/x-www-form-urlencoded


app.get('/', function (req1, res1){

    res1.writeHead(200,{'Content-Type': 'application/json'});
    res1.json();

});


app.get('/api/ToDoItems', function(req2, res2, next) {
    
    res2.json(toDoData); 
    // console.log(toDoData.concat(newObj));
    next();

});


app.get('/api/ToDoItems/:todoItemId', function (req5, res5, next) {
    
    var check = req5.params.todoItemId;
    var checkNumber = Number(check);
    let newDataObj = _.find(toDoData, {todoItemId: checkNumber});

    res5.status(200);
    res5.json(newDataObj);
    next();

});


app.post('/api/ToDoItems', function (req3, res3, next) {  
    // var newDataObj = req3.body;
    // newDataObj.todoItemId = Number();
    // newDataObj.name = '';
    // newDataObj.priority = Number();
    // newDataObj.completed = Boolean();
    toDoData.push(newObj);
    res3.status(201).json(newObj);
    next();

});


app.delete('/api/ToDoItems/:todoItemId', function (req4, res4) {

    var check = req4.params.todoItemId;
    var checkNumber = Number(check);
    let objToDelete = _.findIndex(toDoData, {todoItemId: checkNumber});

    if(!toDoData[objToDelete]) {
         res4.send();
    }
    else {
        var deleteItem = toDoData[objToDelete];
        toDoData.splice(deleteItem, 1);
    };

    res4.status(200);
    res4.json(deleteItem);

});


module.exports = app;
