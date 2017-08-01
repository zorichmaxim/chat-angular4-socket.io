const
    express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://zorich_maxim:maxim1101993@ds115573.mlab.com:15573/users-messgaes-db";

let port = process.env.PORT || 4200;

const authenticationFunc = (user) => {
    let userNames = [];
    MongoClient.connect(url, (err, db) => {
        db.collection("users").find().toArray((err, results) => {
            for (let item of results) {
                userNames.push(item.name);
            }
            let result = {
                results,
                user,
            };
            userNames.indexOf(user) === -1 ? io.emit('authentication done', result) : io.emit('name is busy');
        });
    });
};

const addUserData = (userData) => {
    MongoClient.connect(url, (err, db) => {
        db.collection("users").insertOne(userData, (err, results) => {
            db.close();
        });
    });
};

app.get('*', (req, res, next) => {
    res.sendfile(`${__dirname}/src/index.html`);
});

app.use(express.static(path.join(`${__dirname}/src`)));

io.on('connection', socket => {
    socket.on('authentication', user => {
        authenticationFunc(user);
    });

    socket.on('chat msg from client', (userData) => {
        io.emit('chat message from io', userData);
        addUserData(userData);
    })
});

http.listen(port, () => console.log('listen port 4200'));
