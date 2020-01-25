//Paramétrage de la Map :
var mymap = L.map('worldmap',                   
            {
              center: [48.866667, 2.333333], 
              zoom: 5                    
            }
           );

// Précise de service de cartographie : 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);
           
// Accèder aux infos :
var cities = document.getElementsByClassName('list-group-item');

//  Paramétrage du marqueur customisé :
var customIcon = L.icon({
    iconUrl: '/images/marqueur.png',
    shadowUrl: '/images/marqueur-shadow.png',
    iconSize:     [50, 50], 
    shadowSize:   [30, 30], 
    iconAnchor:   [22, 60],
    shadowAnchor: [10, 40],  
    popupAnchor:  [-3, -76]
});

for(var i=0; i<cities.length; i++) {
var lat = cities[i].dataset.lat; // Récupère l'info
var lon = cities[i].dataset.lon; 
var name = cities[i].dataset.name;

// L.marker([lat, lon]).addTo(mymap).bindPopup(name);
// Création du marqueur :
L.marker([lat, lon], {icon: customIcon}).addTo(mymap).bindPopup(name);
};



// iconAnchor = position des images par rapport à la position marqueur en pixel
// on applique les paramétrages via la variable customIcon 

