var express = require("express");
const PORT = 8000;

var app = express();

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Listening to requests on port ${ PORT }`);
});
