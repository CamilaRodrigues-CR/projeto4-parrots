
let numeroDeCartas;
let primeiraCarta, segundaCarta;

let jogadas = 0;
let acertos = 0;

const baralho = [];

const cartas =[
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot",
];


//perguntar numero de cartas
function perguntarCartas() {
    numeroDeCartas = Number(prompt('Com quantas cartas quer jogar?')); 

    while(cartasInvalidas()) {
        numeroDeCartas = Number(prompt('Com quantas cartas quer jogar?'));
    }
    // iniciar o jogo
    iniciarOJogo();

}
perguntarCartas();

// criar uma função para os numeros de cartas 
    /*colocar a condição de cartas invalidos
        %2 !== 0 ; <4 ; >14 ; */
function cartasInvalidas() {
    if ( numeroDeCartas %2 !==0 || numeroDeCartas < 4 || numeroDeCartas >14) {
        return true;
        } else {
        return false;
        }
}

/*na função de iniciar o jogo: 
    criar o baralho
        preciso criar uma array com as cartas
        usar o push em dobro (ou verificar a possibilidade de usar o operador * )
*/
function iniciarOJogo() {
    for (let i=0 ; i < (numeroDeCartas/2); i++){
        let carta = cartas[i];
        baralho.push(carta);
        baralho.push(carta);  
    }
 //embaralhar:
    baralho.sort(comparador); // Após esta linha, a minhaArray (baralho) estará embaralhada

//destribuir as cartas:
    destribuirCartas();

}

// na hora de destribuir as cartas, tem que implementar a lista pelo java e adicionar no container.
function destribuirCartas() {
    const container = document.querySelector('.container'); 
    let cartaTemplate = "";
    for(let i = 0; i < baralho.length; i++){
        cartaTemplate +=
        `
            <li class="card" onclick="virar(this)" data-test="card" >
                <div class="back-face face" data-test="face-down-image">
                    <img src="imagens/back.png">
                 </div>
            
                <div class="front-face face" data-test="face-up-image">
                    <img src='imagens/${baralho[i]}.gif'>
                </div>
                
            </li>
    `;
    }
    container.innerHTML = cartaTemplate;
}

function comparador() { 
	return Math.random() - 0.5; 
}



function virar(carta){
    if ( carta.classList.contains('virada')){
        return;
    }

    if ( primeiraCarta !== undefined && segundaCarta !== undefined ){
        return;
    }

    carta.classList.add('virada');
        jogadas++;

        if ( primeiraCarta === undefined ){
            primeiraCarta = carta;
        }else{
            if ( segundaCarta === undefined){
                segundaCarta = carta;   

                console.log(typeof(primeiraCarta));
                console.log(typeof(segundaCarta.innerHTML));
                } 
                if ( primeiraCarta.innerHTML === segundaCarta.innerHTML){
                    reiniciarCartas();
                    acertos += 2;

                    finalizarJogo();
                }else{
                    setTimeout(desvirar, 1000);                  

                }
        }

}

function desvirar(){
    primeiraCarta.classList.remove('virada');
    segundaCarta.classList.remove('virada');

    reiniciarCartas();
}

function reiniciarCartas(){
    primeiraCarta = undefined;
    segundaCarta = undefined;
}


function finalizarJogo(){
    if (acertos === baralho.length){;

        alert(`Você ganhou em ${jogadas} jogadas!`);
        
    }
}




