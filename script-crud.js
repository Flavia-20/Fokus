// encontrar o botão adicionar tarefa
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
//JSON.parce é o inverso do stringfy()

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

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

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
    localStorage.setItem('tarefas', JSON.stringify(tarefas));//JSON.stringify() converte os valores para uma string JSON
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});