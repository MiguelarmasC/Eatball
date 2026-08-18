// tablero
let tablero = document.querySelector('.game_container');

// puntacion
let puntos = 0
let score = document.getElementById('sc').textContent = ` ${puntos}`;

// Salto aleatorio de eat
/*
function saltoEat(){
    if(Math.abs(movVertical - saltoVertical) && Math.abs(movHorizontal - saltoHorizontal) ){
        saltoVertical = Math.floor(Math.random() * 935)
        eat.style.top = saltoVertical + 'px';
        saltoHorizontal = Math.floor(Math.random() * 1090)
        eat.style.left= saltoHorizontal + 'px';
        puntos += 1;
    }
    document.getElementById('sc').textContent = ` ${puntos}`;
} */

let eat = document.querySelector('#eat');
// posición inical X y Y de eat
let saltoVertical = 5; 
let saltoHorizontal = 5; 
let eatSize = 12;

// variables de apollo.
let anchoMaxEat = tablero.clientWidth - eatSize;
let altoMaxEat = tablero.clientHeight - eatSize;
let puntoColision = 14;


function saltoEat(){
    if ((Math.abs(movVertical - saltoVertical) < puntoColision) && ( Math.abs(movHorizontal - saltoHorizontal) < puntoColision)){
        saltoVertical = Math.floor(Math.random() * altoMaxEat)
        eat.style.top = saltoVertical + 'px';
        saltoHorizontal = Math.floor(Math.random() * anchoMaxEat)
        eat.style.left= saltoHorizontal + 'px';
        puntos += 1;
        document.getElementById('sc').textContent = ` ${puntos}`;
    }
}

const salto = new CustomEvent("saltoAleatorio")
document.addEventListener('saltoAleatorio', (e)=>{saltoEat()})


// movimientos de la bola
let bola = document.querySelector('#ball');
// posición inical X y Y de la bola.
let movVertical = (tablero.clientHeight / 2) - 15;  // 475
let movHorizontal = (tablero.clientWidth / 2) - 15;  //540
let bolaSize = 35;

// variables de apoyo.
let limiteAnchoMax = tablero.clientWidth - bolaSize;
let limiteAltoMax = tablero.clientHeight - bolaSize;
let limiteMin = 5;

document.addEventListener('keydown', (e)=>{moverBola(e.key)})
function moverBola(tecla){
    if (tecla === 'ArrowUp' && movVertical > limiteMin){ 
        movVertical = movVertical - 5;
        bola.style.top = movVertical + 'px';
    }
    if (tecla === 'ArrowDown' && movVertical < limiteAltoMax){ 
        movVertical = movVertical + 5;
        bola.style.top = movVertical + 'px';
    }
    if (tecla === 'ArrowLeft' && movHorizontal > limiteMin){ 
        movHorizontal = movHorizontal - 5;     
        bola.style.left = movHorizontal + 'px';
    }
    if (tecla === 'ArrowRight' && movHorizontal < limiteAnchoMax){ 
        movHorizontal = movHorizontal + 5;
        bola.style.left = movHorizontal + 'px';
    }
    document.dispatchEvent(salto);
}

// Ajuste de valores limites segun viewport.
// valores iniciales.
let altoVentana = document.documentElement.clientHeight;
let anchoVentana = document.documentElement.clientWidth;

window.addEventListener('resize',(e)=>{detectarAjusteViewport()})

function detectarAjusteViewport(){
    if ((altoVentana != document.documentElement.clientHeight) || (anchoVentana != document.documentElement.clientWidth)){
        document.dispatchEvent(ajusteViewport);
    } 
}

function viewportAjuste(){
    altoVentana = document.documentElement.clientHeight;
    limiteAltoMax = tablero.clientHeight - bolaSize;
    anchoVentana = document.documentElement.clientWidth;
    limiteAnchoMax = tablero.clientWidth - bolaSize;
    if(movHorizontal > limiteAnchoMax){
        movHorizontal = limiteAnchoMax;
        bola.style.left = movHorizontal + 'px';
    }
    if(movVertical > limiteAltoMax){
        movVertical = limiteAltoMax;
        bola.style.top = movVertical + 'px';
    }
    saltoEat()
}

const ajusteViewport = new CustomEvent("ajusteViewport")
document.addEventListener('ajusteViewport', (e)=>{viewportAjuste()})
/*
function viewportAjuste(){
    if (altoVentana != document.documentElement.clientHeight){
        altoVentana = document.documentElement.clientHeight;
        limiteAltoMax = tablero.clientHeight - bolaSize;
    }
    if (anchoVentana != document.documentElement.clientWidth){
        anchoVentana = document.documentElement.clientWidth;
        limiteAnchoMax = tablero.clientWidth - bolaSize;
    }
    document.dispatchEvent(ajusteViewport);
}*/

// movimiento de la bola en pantallas tactiles.
/*
let movIniVertical = 0;
let movIniHorizontal = 0;
let movActVertical = 0;
let movActHorizontal = 0;

document.addEventListener('touchstart', (e)=>{
	movIniVertical = e.touches[0].clientY;
	movIniHorizontal = e.touches[0].clientX;
})

document.addEventListener('touchmove', (e)=>{
	e.preventDefault();
    movActVertical = e.changedTouches[0].clientY;
	movActHorizontal = e.changedTouches[0].clientX;
    moverBolaTactil()
    movIniVertical = movActVertical;
	movIniHorizontal = movActHorizontal;
},{passive: false})

function moverBolaTactil(){
    if ((movActVertical - movIniVertical > 0) && (movActVertical - movIniVertical > limiteMin)){ 
        movVertical = movVertical + 5;
        bola.style.top = movVertical + 'px';
    }
    if ((movActVertical - movIniVertical < 0) && (movActVertical - movIniVertical < limiteAltoMax)){ 
        movVertical = movVertical - 5; 
        bola.style.top = movVertical + 'px';
    }
    if ((movActHorizontal - movIniHorizontal > 0) && (movActHorizontal - movIniHorizontal > limiteMin)){ 
        movHorizontal = movHorizontal + 5;     
        bola.style.left = movHorizontal + 'px';
    }
    if ((movActHorizontal - movIniHorizontal < 0) && (movActHorizontal - movIniHorizontal > limiteAnchoMax)){ 
        movHorizontal = movHorizontal - 5;  
        bola.style.left = movHorizontal + 'px';
    }
    document.dispatchEvent(salto);
}
function moverBolaTactil(){
    if (movActVertical - movIniVertical > 0){  
        movVertical = movVertical + 5;
	    if (movVertical > limiteMin){
        	bola.style.top = movVertical + 'px';
	    }
    }
    if (movActVertical - movIniVertical < 0){ 
        movVertical = movVertical - 5;
	    if (movVertical < limiteAltoMax){ 
        	bola.style.top = movVertical + 'px';
	    }
    }
    if (movActHorizontal - movIniHorizontal > 0){ 
        movHorizontal = movHorizontal + 5;
	    if (movHorizontal > limiteMin){     
        	bola.style.left = movHorizontal + 'px';
	    }
    }
    if (movActHorizontal - movIniHorizontal < 0){ 
        movHorizontal = movHorizontal - 5;
	    if (movHorizontal > limiteAnchoMax){  
        	bola.style.left = movHorizontal + 'px';
	    }
    }
    document.dispatchEvent(salto);
}
*/
// controles tactiles 
let controls = document.getElementsByClassName('btn-arrows');

document.addEventListener('touchstar', (e)=>{moverBolaclick(e.target.id)})
function moverBolaclick(tecla){
    for (let control of controls){
        if (tecla === 'up' && movVertical > limiteMin){ 
            movVertical = movVertical - 5;
            bola.style.top = movVertical + 'px';
        }
        if (tecla === 'down' && movVertical < limiteAltoMax){ 
            movVertical = movVertical + 5;
            bola.style.top = movVertical + 'px';
        }
        if (tecla === 'left' && movHorizontal > limiteMin){ 
            movHorizontal = movHorizontal - 5;     
            bola.style.left = movHorizontal + 'px';
        }
        if (tecla === 'right' && movHorizontal < limiteAnchoMax){ 
            movHorizontal = movHorizontal + 5;
            bola.style.left = movHorizontal + 'px';
        }
    }    
    document.dispatchEvent(salto);
}

detectarAjusteViewport()
viewportAjuste()
moverBola()
moverBolaclick()
saltoEat()
