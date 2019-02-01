var $avatar = document.querySelector("#avatar-img")
var $next = document.querySelector('button#next.bt-arrow');
var $previous = document.querySelector('button#previous.bt-arrow');
var cpt = 0;




var images = new Array();
images[0] = "assets/img/avatar1.png";
images[1] = "assets/img/avatar2.png";
images[2] = "assets/img/avatar3.png";
images[3] = "assets/img/avatar4.png";
images[4] = "assets/img/avatar5.png";



$previous.style.cursor = "default";
$previous.style.display = "none";




$next.onclick = function () {
	$previous.style.cursor = "grab";
	$previous.style.display = "block";
	suivant();
	
};

$previous.onclick = function () {
	precedent();
}



function changeimages() {
	$avatar.src = images[cpt];
}

function precedent() {
	cpt--;
	if (cpt === 0) {
		$previous.style.cursor = "default";
		$previous.style.display = "none";
		}else if(cpt >= images.length-2){
			$next.style.cursor = "grab";
			$next.style.display = "block";		 
		}
	changeimages();
}

function suivant() {
	cpt++;
	if (cpt >= images.length-1) {
		$next.style.cursor = "default";
		$next.style.display = "none";
	
	};
	changeimages();
}