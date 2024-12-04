
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
//JSON.parce é o inverso do stringfy()

let tarefaSelecionada = null;
let liTarefaSelecionada = null;


function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));//JSON.stringify() converte os valores para uma string JSON
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');
 
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick =() =>{
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        console.log('A nova descrição é: ', novaDescricao);
        if( novaDescricao == null || novaDescricao.length < 0 || novaDescricao == ""){
            const precisaDeDescricao = prompt("Você precisa digitar uma nova descição!");
            paragrafo.textContent = precisaDeDescricao;//Atualização da camada visual
            tarefa.descricao = precisaDeDescricao;//Atualização da referencia da tarefa, camada de dados
            atualizarTarefas();//Atualização da LocalStorage
        }else{
            paragrafo.textContent = novaDescricao;//Atualização da camada visual
            tarefa.descricao = novaDescricao;//Atualização da referencia da tarefa, camada de dados
            atualizarTarefas();//Atualização da LocalStorage
        }        
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
                /*classList remove a classe, o css, se eu não colocar o claslist e for direto pro remove ele remove todo o elemento*/
            })

        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = "";
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
        }
        tarefaSelecionada = tarefa;
        liTarefaSelecionada = li;
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        
        li.classList.add('app__section-task-list-item-active');
    }
    return li
}

//checar essa função, ela não esta atribuindo hidden  ao textarea
const limparFormulario = () =>{
    textarea.value = "";
    btnAdicionarTarefa.classList.toggle('hiden');
} 
btnCancelarTarefa.addEventListener('click', limparFormulario);


btnAdicionarTarefa.addEventListener('click', () => {
    //o form por vem com a classe hidden e eu quero remover ela 
    formAdicionarTarefa.classList.toggle('hidden');
    //toggle serve para se a classe existir ela for removida e não ela é adcionada
})

formAdicionarTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    //objeto tarefa que pega o valor do textarea
    const tarefa = {
            descricao: textarea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    //colocar um item dentro dolocalStorge, que item? tarefas. 1° parametro, chave, 2°: valor
    atualizarTarefas();
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

document.addEventListener('FocoFinalizado', ()=> {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    }
})
