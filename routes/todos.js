var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://dpk45:iitjee2012@ds161209.mlab.com:61209/meantodos45', ['todos']);


//Get Todos
router.get('/todos', function (req, res, next) {
    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(todos);
        }
    });
});


//Get SingleTodo
router.get('/todo/:id', function (req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(todo);
        }
    });
});

//Save Todo
router.post('/todo', function (req, res, next) {
    var todo = req.body;
    console.log(todo);
    if (!todo.text || todo.isCompleted) {
        res.status("400");
        res.json({ "error": "invalid data" })
    }
    else {
        db.todos.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        })
    }
});


//Update Todo
router.put('/todo/:id', function (req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }

    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(404);

        res.json({ "error": "invalid data" });
    }

    else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function (err, result) {

            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        });
    }

});


//Delete Todo
router.delete('/todo/:id', function (req, res, next) {
    db.todos.remove({ _id: mongojs.ObjectId(req.params.id) }, '', function (err, result) {

        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
});





module.exports = router;