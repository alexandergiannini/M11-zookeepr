const express = require('express'); ///requiring express which we just downloaded.

const { animals } = require('./data/animals'); //'./data/animals'

const PORT = process.env.PORT || 3001; //We're going to tell our app to use that port, if it has been set, and if not, default to port 80.

const app = express(); //instiating server (Step 1 of setting up server)

///function filters out the search query SPECIFICALLY and is used later in app.get
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

  app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  })


//app.get('/api/animals', (req, res) => { //added a route here that the Frontend can request data from
  //  let results = animals;
   // console.log(req.query) //accessing query property on req object
   // res.json(results);
  
  
    // res.json(animals); //response is sending "Hello!" --> user can see this on the local host web page when running correctly; /// response is now sending back a JSON of "animals"
  //});     

//Step 2 of setting up server -> telling server to listen for requests
app.listen(3001, () => {
    //console.log(`API server now on port 3001!`);
    console.log(`API server now on port ${PORT}!`); //referenced in the PORT variable described above
  });

//npm start to "listen to the request for above^"

//Ctrl+c to stop previous server from running

//hi