const
    express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://zorich_maxim:maxim1101993@ds115573.mlab.com:15573/users-messgaes-db",
    hardCodePassword = 55555,
    port = process.env.PORT || 4200;

const loadFullData = (user, adminStatus) => {
    let urlAccess = adminStatus ? 'admin': 'chat';
    MongoClient.connect(url, (err, db) => {
        db.collection("users").find().toArray((err, results) => {
            let result = {
                results,
                user,
                urlAccess,
            };
            io.emit('authentication done', result);
        });
    });
};
const authenticationFunc = (user, password) => {
    let adminStatus = false;
    if (user === 'Admin') {
        adminStatus = true;
        +password === hardCodePassword ? loadFullData(user, adminStatus) : io.emit('name is busy');
    } else {
        MongoClient.connect(url, (err, db) => {
            adminStatus = false;
            db.collection("users").find({name: user}).toArray((err, results) => {
                results.length === 0 ? loadFullData(user, adminStatus) : io.emit('name is busy');
            });
        });
    }
};
const addUserData = userData => {
    MongoClient.connect(url, (err, db) => {
        db.collection("users").insertOne(userData, (err, results) => {
            db.close();
        });
    });
};

app.get('*', (req, res, next) => {
    res.sendfile(`${__dirname}/src/index.html`);
});

app.use(express.static(path.join(`${__dirname}/node_modules`)));
app.use(express.static(path.join(`${__dirname}/src/app.js`)));
app.use(express.static(path.join(`${__dirname}/src/`)));

io.on('connection', socket => {
    socket.on('authentication', ([user, password = res]) => {
        authenticationFunc(user, password);
    });

    socket.on('chat msg from client', userData => {
        io.emit('chat message from io', userData);
        addUserData(userData);
    })
});

http.listen(port, () => console.log('listen port 4200'));
