BHS-SRC
=======

The BHS Science Resource Center project!

How to Start Developing
-----------------------

1. Read up on the Git versioning system (at least a little)
2. Get some sort of software to help you with Git ( either Atlassian SourceTree or the GitHub Client are recommended).

   Or, if you're feeling particularly awesome, you can always use the command line. Your call.
3. Clone into this repository, and navigate to it's location in Terminal.
4. Checkout the "Develop" branch (you can do this within Terminal by typing ``` git checkout Develop ```)
5. Type ``` npm run init ``` in Terminal to load all the things.

To update your copy of the code at any time, *pull* the code from this repository (you can do this within Terminal by typing ``` git pull ```).

We are using the "Develop" branch to write the majority of our code, and merging that code in to master when larger goals are achieved. *Avoid pulling and pushing to the "master" branch!* It will make at least one person unhappy.

You should now have a fully functioning working copy of the code. Comments should be in each major file detailing how they work and their purpose. If you have any questions, Slack is your friend.

** If you are missing some package dependencies for whatever reason, ```npm install``` will solve your problems! **

NPM Run Scripts:
----------------

| Command    | Description |
|------------|-------------|
| ``` npm run init ``` | Initializes the repository for further use. |
| ``` npm run front-build ``` | Compiles and bundles JS code. |
| ``` npm run front-build-daemon ``` | Starts daemon to automatically bundle code whenever a relevant file is modified |
| ``` npm run front-build-test ``` | Compiles and bundles JS code for testing. |

Installing MongoDB:
-------------------

Follow [the instructions here](https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-os-x/ "MongoDB Installation Tutorial") to install MongoDB to on your computer. (N.B. don't install with homebrew -- it will probably make you sad. This technique will also work for Linux I believe.)
