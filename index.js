var express = require('express');
var bodyParser = require("body-parser");
const { verifyAdmin } = require('./utils/StudentsAuth');
var app = express();
const PORT = process.env.PORT || 5050
var startPage = "index.html";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const {viewResources, viewResourceById } = require('./utils/StudentsUtil');
app.get('/view-resources', viewResources)
app.get('/view-resources/:id', viewResourceById)
const {filterResources} = require('./utils/SamuelYeoUtil');
app.get('/filter-resources', filterResources);


const {addResource} = require('./utils/JoenChowUtil');
app.post('/add-resource', verifyAdmin, addResource);

const {editResource} = require('./utils/KaydenTanUtil');
app.put('/edit-resource/:id', verifyAdmin, editResource);

const {deleteResource} = require('./utils/SamuelYeoUtil');
app.delete('/delete-resource/:id', verifyAdmin, deleteResource);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})
server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
});
module.exports = { app, server }