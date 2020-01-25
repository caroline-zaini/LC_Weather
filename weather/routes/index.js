var express = require('express');
var router = express.Router();

// Initialisation du module pour l'API dans le projet :
var request = require('sync-request');

// récupération model cities :
var cityModel = require('../models/cities');



/**** GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


////////////////////////////// PAGE WEATHER //////////////////////////////////////

/**** GET weather page. */
router.get('/weather', async function(req, res, next){
  // Sécurité :Pour que l'user n'accède pas à la page user par l'URL :
  if(req.session.user == null) {
    res.redirect('/');
  } else {
    var cityList = await cityModel.find();
    res.render('weather', {cityList})
  }

});

/**** Add a city. */
router.post('/add-city', async function(req, res, next){
  // interroge l'API. Met la clé de l'api en paramètre : &appid=e556362e1dafdd86ff1ea56d8eacedb2 :
  var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`) 
  var dataAPI = JSON.parse(data.body)

  // trouve un élément qui a comme name, le nom de la ville que je te donne :
  var alreadyExist = await cityModel.findOne({
    name: req.body.newcity.toLowerCase()
  });

  if(alreadyExist == null && dataAPI.name){
    // 01_BDD. On déclare le nouvel objet qu'on veut sauvegarder en BDD :
    var newCity = new cityModel({
      name: req.body.newcity,
      desc:  dataAPI.weather[0].description, // l'indice 0 est notre objet car il est dans un tableau,
      img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
      lon: dataAPI.coord.lon,
      lat: dataAPI.coord.lat,
    })

    await newCity.save();
  }
  // 02_BDD. On l'enregistre en BDD :
  cityList = await cityModel.find();
  

  res.render('weather', {cityList})
})

/****  delete a city. */
router.get('/delete-city', async function(req, res, next){
  // avant de faire avec la BDD : splice par rapport à une position, supprimer un élément : cityList.splice(req.query.position, 1); 
  
  await cityModel.deleteOne({
    _id: req.query.id
  })

  var cityList = await cityModel.find();

  res.render('weather', {cityList})
})

/* update cities */
router.get('/update-cities', async function(req, res, next){
  var cityList = await cityModel.find();

  for(var i = 0; i< cityList.length; i++){
    var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`) 
    var dataAPI = JSON.parse(data.body)

    // mettre à jour en fonction des données météréologique qui change:
    await cityModel.updateOne({
      _id: cityList[i].id
    }, {
      name: cityList[i].name,
      desc:  dataAPI.weather[0].description,
      img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
      lon: dataAPI.coord.lon,
      lat: dataAPI.coord.lat,
    })
  }

  var cityList = await cityModel.find();
  // N.B: On peut modifier les donner directement dans MongoDB et ça va changer au niveau navigateur
  res.render('weather', {cityList})
})

module.exports = router;
