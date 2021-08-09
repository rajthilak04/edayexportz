const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID  = require('mongodb').ObjectID;

// Connection
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/glenpark', (err, db) => {
        if(err) return console.log(err)
        closure(db);
    }) 
};

// Error Handling
const sendError = (err, res) => {
    response.statue = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response Handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/tariff', (req, res) => {
    connection((db) => {
        db.collection('tariff')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
}); // Test DB Rajthilak

module.exports =  router;