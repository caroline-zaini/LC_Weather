// 01. installation de mongoose : sudo npm install mongoose --save
// 02. initialisation du module mongoose dans le projet :
var mongoose = require('mongoose');


// Options de connexions, paramétrage du délais de connexion: 
var options = {
    connectTimeoutMS: 5000,         // si au bout de 5000ms pas de retour
    useUnifiedTopology : true,      // utiliser les nelle fonctionnalités
    useNewUrlParser: true,          // utiliser les nelle fonctionnalités
}


 /* 04. Connexion à la BDD MongoDB:  
  - fournir l'URL
  - si il y a une erreur on print l'erreur */
mongoose.connect('mongodb+srv://caroline:tititoto@cluster0-ufvkw.mongodb.net/weather?retryWrites=true&w=majority',
    options,
    function(error){
    if (error) {
        console.log(error);
    } else {
        console.log("connection ok");
    }
   }
);

module.exports = mongoose