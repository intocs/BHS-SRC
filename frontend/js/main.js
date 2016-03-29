// main.js - include all necessary JS files and

// Don't give a direct copy so that the app need not include any files which are not relevant.
window.JS = {
  PUBLIC: (() => require("./public.js")),
  PRIVATE: (() => require("./private.js"))
};
