//Using Express to host localhost server
const { json } = require('express');
const express = require('express'); 
const app = express(); 


//importing Express to enable reading body data from the request
app.use(express.json());        
app.use(express.urlencoded());  


//using port 3000 to listen to requests on 
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


// GET request for the home page
// curl http://localhost:3000/
app.get('/', (req, res) => { 
  res.send("Song API - Home - successful GET request");
});


//array to input some songs
let songs = [ 
  { id: 123, title: 'Photograph', artist: 'Ed Sheeran' }, 
  { id: 234, title: 'Yellow', artist: 'Coldplay' }, 
  { id: 345, title: 'Kesariya', artist: 'Arijit Singh' }
]; 


// GET request to get the songs from array to the /songs endpoint
app.get('/songs', (req,res) => {
  res.json(songs);
});


// GET a song of a specified ID
app.get('/songs/:id', function(req, res) {
  console.log("Song ID " + req.params.id + " requested");
  var ID = req.params.id;
  var flag = false;

  songs.forEach((song, index, array) => {
      if (song.id == ID) {
          res.send(songs[index]);
          flag = true;
      }
  });

  if (flag == false) {
      res.send("ERROR!! Song not found for ID " + ID);
  }
});


// POST a new song
app.post('/songs', (req, res) => {

  if (req.body === undefined) {
    // Invalid JSON in request body
    console.log("ERROR!! Request body is undefined");
    res.status(400).send("ERROR!! Request body is undefined");
  } 
  else {
    // Add the received song in the JSON array
    const newSong = req.body; 
    songs.push(newSong); 
    res.status(201).json(newSong); 
  }
  
}); 


// UPDATE a song using an existing ID
app.put('/songs/:id', (req, res) => { 

  // Read the song ID from url parameter id in the request
  const songId = parseInt(req.params.id); 
  console.log("Updating song with ID: " + req.params.id);

  // Retrieve the PUT data
  const updatedSong = req.body; 

  // Update a song if the inputted ID exists
  songs = songs.map(song => song.id === songId ? updatedSong : song); 
  res.status(200).json(updatedSong); 
}); 


// Delete a song  using an existing ID
app.delete('/songs/:id', (req, res) => { 

  // Read the song ID from url parameter id in the request
  const songId = parseInt(req.params.id);
  console.log("Deleting song with ID: " + req.params.id);

  // Delete/remove the song if the inputted ID exists)
  songs = songs.filter(song => song.id !== songId); 

  //204 response code indicates that there is no response body
  res.status(204).send(); 
}); 