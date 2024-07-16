
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');

const titulo = document.querySelector('.app__title');
const imagem = document.querySelector('.app__image');
const timer = document.querySelector('.app__card-timer');
const btComecar = document.querySelector('.app__card-primary-button');

let timerFoco = 1500;
let timerCurto = 300;
let timerLongo = 900;

btFoco.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'foco');
    titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>`

    imagem.setAttribute('src', '/imagens/foco.png');
});
btCurto.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
    titulo.innerHTML = `<h1 class="app__title">
                Outro texto,<br>
                <strong class="app__title-strong">Outro texto.</strong>
            </h1>`
            imagem.setAttribute('src', '/imagens/descanso-curto.png');
});
btLongo.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'descanso-longo');
    titulo.innerHTML = `<h1 class="app__title">
    Outro texto texto,<br>
    <strong class="app__title-strong">Outro texto textyo.</strong>
</h1>`
imagem.setAttribute('src', '/imagens/descanso-longo.png');
});







