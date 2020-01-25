var express = require('express');
var router = express.Router();

// récupération model users :
var userModel = require('../models/users');

/* GET login home page */
router.get('/', function(req, res, next) {
  res.send('login');
});

////////////////////////////// SIGNIN SIGN UP //////////////////////////////////////

/* sign-up. */
router.post('/sign-up', async function(req, res, next) {

  var users = await userModel.findOne({email: req.body.email})
  console.log("########## users : " + users)

  if(!users) {
    console.log("####### n'éxite pas")
    var newUserSAVE = new userModel ({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUserSAVE.save();

    // créer un nouvel objet user en session qui aura name et id comme propriété :
    req.session.user = {name: newUserSAVE.username, id: newUserSAVE._id};
    console.log("##########" + req.session.user.name)
    res.redirect('/weather');

  } else {
    res.redirect('/');
  };
});

/* sign-in. */
router.post('/sign-in', async function(req, res, next) {

  // Récupère au moins 1 document dont l'email et le password ont ces valeurs :
  // N.B : Attention le find() renvoie un tableau vide s'il ne trouve rien
  var userAlreadySign = await userModel.findOne(
    { 
    email: req.body.email,
    password: req.body.password,
    }
  );

  console.log("#########" + userAlreadySign.email)

  // Si tu trouves le user dans la BDD:
  if(userAlreadySign != null) {
    req.session.user = {name: userAlreadySign.username, id: userAlreadySign._id};
    console.log("######### req.session.user.name : " + req.session.user.name)
    res.redirect('/weather');
  } else {
    res.render('login'); 
  };
});


router.get('/logout', function(req, res, next) {
  req.session.user = null;
  console.log("####### req.session.user: " + req.session.user)
  res.redirect('/');
});



module.exports = router;
