// main.js - main JS file for the client-side

// The code in this file is written in JSX, an extension of JavaScript that allows for embedded XML. For your own
//  peace of mind, you might want to download the appropriate syntax-highlighting tools for your IDE of choice.

// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");

// An example function to illustrate how the Jasmine testing framework works
function exampleFunction(bar) {
    return bar + " says hello";
}

window.addEventListener("load", function() {
    // Run this code when the window initially loads

    // Render <h1>Hello, world</h1> in the div tag with id='example'
    ReactDOM.render(
        <h1>Hello, world</h1>,
        $('div#example')[0]
    );
});

// module.exports is a variable which designates which object(s) will be available when require()
//  is called on this file from another one.
// This specific export is in place in order to test the Jasmine testing framework.
module.exports = exampleFunction;
