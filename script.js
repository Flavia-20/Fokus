
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');

const titulo = document.querySelector('.app__title');
const imagem = document.querySelector('.app__image');
const timer = document.querySelector('.app__card-timer');
const btComecar = document.querySelector('.app__card-primary-button');

const botoes = document.querySelectorAll(".app__card-button");//pegando todos os botões com essa classe

let timerFoco = 1500;
let timerCurto = 300;
let timerLongo = 900;

btFoco.addEventListener('click', () =>{
    AlterarContexto('foco');
    btFoco.classList.add("active");
});
btCurto.addEventListener('click', () => {
    AlterarContexto('descanso-curto');
    btCurto.classList.add("active");
});
btLongo.addEventListener('click', () =>{
    AlterarContexto('descanso-longo');
    btLongo.classList.add("active");
});


function AlterarContexto(contexto) {
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




