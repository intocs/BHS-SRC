//importing modules and setting port
var express = require("express");
var app = express();

const PORT = 8000;
//we should move this to a different frontend file so we avoid having backend and frontend in the same file
//replace with a reference to a file called "routes" and pass in our app
//then we can use: require('/routes')(app);
app.get('/', (req, res) => {
    res.sendFile("index.html", {
        root: "./frontend"
    });
});
//starts the application
app.listen(PORT, () => {
    console.log(`Listening to requests on port ${ PORT }`);
});
