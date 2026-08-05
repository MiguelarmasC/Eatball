
// puntacion
let puntos = 0
let score = document.getElementById('sc').textContent = ` ${puntos}`;

// Salto aleatorio de eat
let eat = document.querySelector('#eat');
let saltoVertical = 0;
let saltoHorizontal = 5;

// left max 1090 min 2, top max 935 min 0
function saltoEat(){
    if(Math.abs(movVertical - saltoVertical) < 41 && Math.abs(movHorizontal - saltoHorizontal) < 40){
        saltoVertical = Math.floor(Math.random() * 935)
        eat.style.top = saltoVertical + 'px';
        saltoHorizontal = Math.floor(Math.random() * 1090)
        eat.style.left= saltoHorizontal + 'px';
        puntos += 1;
    }
    document.getElementById('sc').textContent = ` ${puntos}`;
}

const salto = new CustomEvent("saltoAleatorio")
document.addEventListener('saltoAleatorio', (e)=>{saltoEat()})


// movimientos de la bola
let bola = document.querySelector('#ball');
let movVertical = 430;
let movHorizontal = 550;

function moverBola(){
    document.addEventListener('keydown', (e)=>{
        if (e.key === 'ArrowUp' && movVertical > 2){
            movVertical = movVertical - 5;
            document.dispatchEvent(salto);
            bola.style.top = movVertical + 'px';
        }
        if (e.key === 'ArrowDown' && movVertical < 948){
            movVertical = movVertical + 5;
            document.dispatchEvent(salto);
            bola.style.top = movVertical + 'px';
        }
        if (e.key === 'ArrowLeft' && movHorizontal > 2){
            movHorizontal = movHorizontal - 5;
            document.dispatchEvent(salto);
            bola.style.left = movHorizontal + 'px';
        }
        if (e.key === 'ArrowRight' && movHorizontal < 1054){
            movHorizontal = movHorizontal + 5;
            document.dispatchEvent(salto);
            bola.style.left = movHorizontal + 'px';
        }
    })
    document.dispatchEvent(salto);
}

moverBola()
saltoEat()
