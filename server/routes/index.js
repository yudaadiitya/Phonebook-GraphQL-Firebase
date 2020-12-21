var express = require('express');
var router = express.Router();
const firebase = require('firebase')

//========== LOAD DATA
router.get('/', function (req, res, next) {
  const userReference = firebase.database().ref("/Phonebooks/");
  //Attach an asynchronous callback to read the data
  userReference.on("value", function (snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
    userReference.off("value");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    res.send("The read failed: " + errorObject.code);
  });
});

//========== ADD DATA
router.post('/', function (req, res) {
  const id = Date.now();
  const { name, phone } = req.body;

  const referencePath = '/Phonebooks/' + id + '/';
  const userReference = firebase.database().ref(referencePath);
  userReference.set({ name, phone }, function (error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.send("Data saved successfully.");
    }
  });
});

//========== EDIT DATA
router.put('/:id', function (req, res) {
  var id = req.params.id;
  const { name, phone } = req.body;

  var referencePath = '/Phonebooks/' + id + '/';
  var userReference = firebase.database().ref(referencePath);
  userReference.update({ name, phone }, function (error) {
    console.log(name, phone)
    if (error) {
      res.send("Data could not be updated." + error);
    } else {
      res.send("Data updated successfully.");
    }
  });
});

//========== DELETE DATA
router.delete('/:id', function (req, res) {
  var id = req.params.id;
  var referencePath = '/Phonebooks/' + id + '/';
  var userReference = firebase.database().ref(referencePath);
  userReference.remove((error) => {
    if (error) {
      res.send("Data could not be deleted." + error);
    } else {
      res.send("Data deleted successfully.");
    }
  })
});

module.exports = router;
