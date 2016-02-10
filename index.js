var express = require("express");
const PORT = 8000;

var app = express();

app.get('/', (req, res) => {
    res.sendFile("index.html", {
        root: "./frontend"
    });
});

app.listen(PORT, () => {
    console.log(`Listening to requests on port ${ PORT }`);
});
