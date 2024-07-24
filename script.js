
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');
const imagem = document.querySelector('.app__image');

const timer = document.querySelector('#timer');
/*let timerFoco = 1500;
let timerCurto = 300;
let timerLongo = 900;*/

const botoes = document.querySelectorAll(".app__card-button");//pegando todos os botões com essa classe
const musicaFocoImput = document.querySelector('#alternar-musica');

const beep = new Audio("./sons/beep.mp3");
const pause = new Audio("./sons/pause.mp3");
const play = new Audio("./sons/play.wav");
const musica = new Audio('/sons/luna-rise-part-one.mp3');

musica.loop = true;
musicaFocoImput.addEventListener('change', ()=> {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

const btComecar = document.querySelector('.app__card-primary-button');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null


btFoco.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500;
    AlterarContexto('foco');
    btFoco.classList.add("active");
});
btCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    AlterarContexto('descanso-curto');
    btCurto.classList.add("active");
});
btLongo.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900;
    AlterarContexto('descanso-longo');
    btLongo.classList.add("active");
});
function AlterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');  
        //Assim remove dinamicamente a classe de cada botão     
    });
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `<h1 class="app__title">
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>`
            
            break;
        case "descanso-curto":
            titulo.innerHTML = `<h1 class="app__title">
            Que tal dar uma respirada,<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            </h1>` 
            
            break;
        case "descanso-longo":
            titulo.innerHTML = `<h1 class="app__title">
            Hora de voltar a superficie,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        //alert('Tempo finalizado!')
        beep.play();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}
btComecar.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    btComecar.innerHTML=`<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
        <span>Pausar</span>`;
    if(intervaloId){
        pause.play();
        btComecar.innerHTML=`<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
        <span>Começar</span>`;
        zerar();
        return
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()//pra que o relógio fique aparecendo na tela