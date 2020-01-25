// Récupère les infos de connexion à la BDD:
var mongoose = require('./bdd');

// Création des shémas, infos qu’on veut enregistrer dans notre BDD:
var citySchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
    lon: Number,
    lat: Number,
});

// citiesModel est le modèle associé au schéma citiesSchema: (cities est la table, l'info qui est dans notre BDD)
var cityModel = mongoose.model('cities', citySchema)


module.exports = cityModel;