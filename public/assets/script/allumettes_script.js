var jeu = new CL_jeu();
var nbAllumettes = Math.floor(Math.random() * 20) + 7;

jeu.nbAllumettesRestant = nbAllumettes;

var container = document.getElementById("container-allumettes");
var widthContainer = nbAllumettes*15;
var margeLeft = (700-widthContainer)/2;
container.style.left = margeLeft + "px";

var min = 1;
var max = 3;

var j = nbAllumettes-1;
var score = 0;



afficheAllumettes(nbAllumettes);


//==============Objet jeu======================//
/*
permet de stocker le nombre d'alumettes encore en jeu
permet se savoir lorsque le jeu se termine
*/
 function CL_jeu() {
    return {etat:"initial",tour:"joueur", nbAllumettesRestant: 0};
 }

//==============AFFICHAGE======================//

function afficheAllumettes(pNum) {
    for (i = 0; i < pNum; i++) {
        var myAllumettes = new Image;
        myAllumettes.src = "/assets/img/allumette.png";
        myAllumettes.id = 'allu'+ '_' + i;
        container.appendChild (myAllumettes);
    }
}

//==============JOUER======================//

function jouer() {

        // Fin de partie
        if(jeu.nbAllumettesRestant == 0){
            var gagnant = ((jeu.tour == "robot") ? "joueur :)" : "robot :(");
            alert('Fin de partie. Le gagnant est le ' + gagnant) ;
            // score = ((jeu.tour == "robot") ? "100" : "0");
            // go(score);
            // return 0;

            location.href =  '/fr/game/two';
        }

        if (jeu.tour == "joueur") {
            console.log("à votre tour !");

            //affiche le nombre de bouttons en fonction du nombre d'alumettes encore en jeu
            if (jeu.nbAllumettesRestant < 3 ){
                activ(jeu.nbAllumettesRestant);
            }else{
                activ(3);
            }
        }else{
            console.log("au tour du robot !");
            setTimeout(jouer_robot, 2000);
        }

        //console.log("Nombre alumettes choisies: " + nbAllumettes);
        //console.log("Nombre alumettes restants: " + jeu.nbAllumettesRestant);

}

function jouer_robot() {
    robot(min,max);
}

//==============TEMPS ATTENTE======================//

function disabled() {
    btOne.style.cursor = "default";
    btOne.style.disabled=true;
    btOne.style.display = "none";

    btTwo.style.cursor = "default";
    btTwo.style.disabled=true;
    btTwo.style.display = "none";

    btThree.style.cursor = "default";
    btThree.style.disabled=true;
    btThree.style.display = "none";
}

function activ(nbBouttonAfficher) {

    var bouttons = ["btOne", "btTwo", "btThree"];

    bouttons.forEach(function(boutton, index, array) {
        //permet de n'afficher que le nombre de bouttons en lien avec le nombre d'allumettre encore en jeu
        if(index < nbBouttonAfficher ){
            eval(boutton).style.cursor = "grab";
            eval(boutton).style.disabled=false;
            eval(boutton).style.display = "block";
        }
    });
}





//==============ROBOT======================//
function robot(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    var nbAlumettesRobot = Math.floor(Math.random() * (max - min)) + min;

    console.log("allumette robot : " +nbAlumettesRobot);
    console.log("numéro allumette :" + j);

    // permet au robot de retirer toutes les allumettes si jeu.nbAllumettesRestant <=3
    // et donc de gagner
    // lui donne un peu d'intelligence :)
    if( jeu.nbAllumettesRestant <= max){
        var nbAlumettesRobot = Math.floor(Math.random() * (max - min)) + min;
        nbAlumettesRobot = jeu.nbAllumettesRestant;
    }

    for (i = 0; i < nbAlumettesRobot; i++) {
        var numAllu = document.querySelector("#allu_" + j);
        numAllu.classList.add('verticalTranslateT');
        numAllu.style.opacity = '0';
        j --;

        jeu.nbAllumettesRestant--;
    }

    jeu.tour = "joueur";
    setTimeout(jouer, 2000);
}


//==============CLIC Joueur======================//

btOne.onclick = function () {
    supprimerAllumette(1);
}

btTwo.onclick = function () {
    supprimerAllumette(2);
}

btThree.onclick = function () {
    supprimerAllumette(3);
}

function supprimerAllumette(nb){

    disabled();

    for (i = 0; i < nb; i++) {
        var numAllu = document.querySelector("#allu_" + j);
        numAllu.classList.add('verticalTranslateB');
        numAllu.style.opacity = '0';
        j --;

        jeu.nbAllumettesRestant--;
    }

    jeu.tour = "robot";
    jouer();
}