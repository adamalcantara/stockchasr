import seeder from "mongoose-seed"

const db = "mongodb://localhost/mern_authenticate_me"

seeder.connect(db, function() {
    seeder.loadModels( [
        "./comments.js"
    ]);
    seeder.clearModels( ['comment']);
    seeder.populateModels(data, function (err, done) {
        if (err) {
            return console.log('seed err', err)
        }
        if (done) {
            return console.log('seed done', done);
        }
        seeder.disconnect()
    })
});

const data = [
    {
        "username": 'Timmy',
        "title": "This is test comment 1",
        "comments": "Wow this stock is terrible lolz",
    },
    {
        "username": 'John',
        "title": "This is test comment 2",
        "comments": "Sounds good Dan",
    },
];