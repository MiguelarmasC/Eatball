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
        bola.style.left = movVertical + 'px';
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

detectarAjusteViewport()
viewportAjuste()
moverBola()
saltoEat()
