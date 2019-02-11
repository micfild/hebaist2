const NUM_CARTE = 8;
var container = document.getElementById("canvas-size");

//Constructeur
var Tile = function(id, x, y, face) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.face = face;
    this.width = 10;
    this.visible = false;
    this.img = new Image();
};


var jeu = {
    carte_retournee: [],
    carte_retournee_total: [],
    nb_paire_trouve: 0
};

//Affichage face invisible
Tile.prototype.draw = function () {
    var oImg = document.createElement("img");

    //créer l'élement image
    oImg.setAttribute('src', "/assets/img/face_cachee.jpg");
    oImg.setAttribute('id', 'tile_' + this.id);
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('height', '70px');
    oImg.setAttribute('width', '70px');

    //ajoute l'elment image a la page
    //ou pourra l'ajouter dans un div
    document.body.appendChild(oImg);
    document.body.appendChild(oImg);
    container.appendChild(oImg);

    //positionne l'image
    var left = this.x + "px";
    var top = this.y + "px";

    oImg.style.left = left;
    oImg.style.top = top;
    oImg.style.position = 'absolute';
    oImg.style.zIndex = '20';


    //enregistre cette fonction (affichage du coté face de la Tile) au clic sur la face cachée de chaque image
    var x =  this.listener.bind(this);
    oImg.addEventListener('click', x, false);

};


Tile.prototype.listener = function(){
    this.drawFaceUp();
}

//Affichage face cachée
Tile.prototype.drawFaceDown = function () {

    var img = document.getElementById('tile_' + this.id);

    img.src="/assets/img/face_cachee.jpg";
    this.visible = false;

};


// Affichage face visible
Tile.prototype.drawFaceUp = function() {

    // si 2 cartes on été retournées, on ne tient plus compte des clics
    if(jeu.carte_retournee.length >= 2){
        return 0;
    }


    //garde en mémoire la carte retournée
    jeu.carte_retournee.push(this);


    // retourne la carte
    var img = document.getElementById('tile_' + this.id);

    img.src=this.face;
    this.visible = true;


    //lorsque 2 cartes sont retournée, on réalise les tests
    // - identique ?
    // - fin de partie ?
    

    if(jeu.carte_retournee.length == 2){

        //test si les deux images sont identiques
        //sinon on les retourne

        if(cartes_identiques()){
            alert("cartes_identiques");

            // permet de ne pas tenir compte des click pour les tile déja retournés
            jeu.carte_retournee.forEach(function(element) {
                jeu.carte_retournee_total.push(element);;
            });

            //on remet a vide les cartes retournées pendant ce coup
            // on incrémente le nombre de paires déja trouvées
            jeu.carte_retournee = [];
            jeu.nb_paire_trouve++;

            if( jeu.nb_paire_trouve == (NUM_CARTE / 2) ){
                alert("fin de partie");
            }

        }else{
            setTimeout(reset,1000);
        }
    }


};

/*
===================================================

===================================================
*/

function reset(){

    //On remet toutes les cartes face cachée
    jeu.carte_retournee.forEach(function(element) {
        element.drawFaceDown();
    });

    jeu.carte_retournee = [];
}

function cartes_identiques(){

    var carte_1 = jeu.carte_retournee[0];
    var carte_2 = jeu.carte_retournee[1];

    if( carte_1.id != carte_2.id && carte_1.face == carte_2.face){


        // les cartes ne peuvent plus être cliquées
        // on supprime l'evenement https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b

        var oImg = document.getElementById('tile_' + carte_1.id);
        var x = carte_1.listener.bind(carte_1);
        oImg.removeEventListener('click', x, false);

        return true;
    }

    return false;
}


/*
===================================================
Initialisation
===================================================
*/

// Fait un tableau avec 2 cartes de chaque, et mélange
var selected = [];
for (var i = 1; i <= NUM_CARTE; i++) {
    // Pousse 2 copies dans le tableau selected
    for (var j = 1; j <= 2; j++) {
        selected.push("/assets/img/mini" + i + ".jpg");
    }
}

// Paires d'images mélangées aléatoirement
selected.sort(function() {
    return 0.5 - Math.random();
});



// creation des cases
var tiles = [];
const NUM_COLS = NUM_CARTE / 2;
const NUM_ROWS = NUM_CARTE / 2;

for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        tiles.push(new Tile(i + '-' + j, i * 78 + 10, j * 78 + 40, selected.pop()));
    }
}

// dessin des images
for (var i = 0; i < tiles.length; i++) {
    tiles[i].draw();
}


/*
===================================================

===================================================
*/


// pour éviter les drag and drop intempestif lorsque clique sur les images
document.addEventListener("dragstart", function() {
    return false;
});