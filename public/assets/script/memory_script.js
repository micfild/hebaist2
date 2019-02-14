function jeuxMemory(){

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
        this.click_listener = null; // servira à retenir l'evenement lié au click sur l'image et doc a pouvoir le retirer
    };



    var jeu = {
        carte_retournee: [],
        carte_retournee_total: [],
        nb_paire_trouve: 0,
        date_debut_du_jeu: null,
    };

    //Affichage face invisible
    Tile.prototype.draw = function () {
        var oImg = document.createElement("img");

        //créé l'élément image
        oImg.setAttribute('src', "/assets/img/face_cachee.jpg");
        oImg.setAttribute('id', 'tile_' + this.id);
        oImg.setAttribute('alt', 'na');
        oImg.setAttribute('height', '70px');
        oImg.setAttribute('width', '70px');

        //ajoute l'élément image à la page
        container.appendChild(oImg);

        //positionne l'image
        var left = this.x + "px";
        var top = this.y + "px";

        oImg.style.left = left;
        oImg.style.top = top;
        oImg.style.position = 'absolute';
        oImg.style.zIndex = '20';

        //enregistre la fonction
        // (affichage du coté face de la carte)
        var x =  this.listenerDrawFaceUp.bind(this);
        this.click_listener = x;
        oImg.addEventListener('click', x, false);
    };


    Tile.prototype.listenerDrawFaceUp = function(){
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

        // Si 2 cartes ont été retournées,
        // on ne tient plus compte des clics sur les autres cartes
        // le temps des vérifications
        if(jeu.carte_retournee.length >= 2){
            return 0;
        }

        // Garde en mémoire la carte retournée
        jeu.carte_retournee.push(this);

        // Retourne la carte
        var img = document.getElementById('tile_' + this.id);

        img.src=this.face;
        this.visible = true;

        //...
        verificationsPartieEnCours();
    };


    /*
    ===================================================

    ===================================================
    */

    function reset(){

        //les 2 cartes retournées vont etre remise face cachée
        jeu.carte_retournee.forEach(function(element) {
            element.drawFaceDown();
        });

        jeu.carte_retournee = [];
    }

    function cartes_identiques(){

        var carte_1 = jeu.carte_retournee[0];
        var carte_2 = jeu.carte_retournee[1];

        if( carte_1.id != carte_2.id && carte_1.face == carte_2.face){

            // Les cartes ne devant plus être cliquables
            // on supprime l'évènement click qui lui est lié
            // https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b

            var oImg = document.getElementById('tile_' + carte_1.id);
            oImg.removeEventListener('click', carte_1.click_listener, false);

            var oImg = document.getElementById('tile_' + carte_2.id);
            oImg.removeEventListener('click', carte_2.click_listener, false);

            return true;
        }

        return false;
    }

    function verificationsPartieEnCours(){

        //lorsque 2 cartes sont retournées, on réalise les tests
        //identique/fin de partie

        if(jeu.carte_retournee.length == 2){

            //test si les deux images sont identiques, meme source
            //sinon on les retourne face cachée

            if(cartes_identiques()){
                // Vide le tableau des cartes retournées
                // Incrémente le nombre de paires déja trouvées
                jeu.carte_retournee = [];
                jeu.nb_paire_trouve++;

                // si fin de partie
                if( finDePartie() ){
                    // la durée de la partie/jeu à durée combien de temps ?
                    var duree_partie =  new Date() - jeu.date_debut_du_jeu;
                    duree_partie = Math.round(duree_partie / 1000)  + " secondes";

                    setTimeout(function(){alert("Fin de partie !!! \nVous avez mis : "  + duree_partie );},500);
                }

            }else{
                setTimeout(reset,1000);
            }
        }
    }

    function finDePartie(){
        if( jeu.nb_paire_trouve == NUM_CARTE ){
            return true;
        }

        return false;
    }


    /*
    ===================================================
    Initialisation
    ===================================================
    */

    function initialisation(){
        // Fait un tableau avec 2 cartes de chaque, et les mélange
        var selected = [];
        for (var i = 1; i <= NUM_CARTE; i++) {
            // Pousse 2 copies dans le tableau selected
            for (var j = 1; j <= 2; j++) {
                selected.push("/assets/img/mini" + i + ".jpg");
            }
        }

        // Images mélangées aléatoirement
        selected.sort(function() {
            return 0.5 - Math.random();
        });


        // Création des cases
        var tiles = [];
        const NUM_COLS = NUM_CARTE / 2;
        const NUM_ROWS = NUM_CARTE / 2;

        for (var i = 0; i < NUM_COLS; i++) {
            for (var j = 0; j < NUM_ROWS; j++) {
                tiles.push(new Tile(i + '-' + j, i * 78 + 10, j * 78 + 40, selected.pop()));
            }
        }

        // vide le contenu du container qui va contenir les cartes
        container.innerHTML = '';

        // dessin des images
        for (var i = 0; i < tiles.length; i++) {
            tiles[i].draw();
        }

        // (ré)initilise l'objet jeu
        jeu.carte_retournee = [];
        jeu.carte_retournee_total = [];
        jeu.nb_paire_trouve = 0;
        jeu.date_debut_du_jeu = new Date();

    }

    // Initialise le plateau de cartes
    initialisation();

    /*
    ===================================================

    ===================================================
    */


    // pour éviter les drag and drop intempestifs lorsque clique sur les images
    document.addEventListener("dragstart", function() {
        return false;
    });
}


jeuxMemory();