var express = require('express');
const mongoose = require('mongoose');
var app = express();

const uri = "mongodb+srv://test:test@cluster0.3g6wp.azure.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB Connected…");
    })
    .catch(err => console.log(err));

// Define schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    name: String,
    date: Date
});

// Compile model from schema
var SomeModel = mongoose.model('TestModel', SomeModelSchema);

// Create an instance of model SomeModel
var awesome_instance = new SomeModel({ name: 'awesome' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
    if (err) return handleError(err);
    // saved!
});


app.get('/', function (req, res) {
    var query = SomeModel
        .findOne({ name: 'awesome' });

    query.exec(function (err, value) {
        if (err) return handleError(err);
        console.log("Value: ", value);
        res.send(value.name);
    })
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});