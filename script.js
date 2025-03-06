document.addEventListener("DOMContentLoaded", () => {
    carregarTarefas();
});

// Lista de tarefas local (simulação)
let tarefas = [];

// Função para carregar tarefas da API e exibir na tela
async function carregarTarefas() {
    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        tarefas = await resposta.json();
        exibirTarefas();
    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
    }
}

// Exibe as tarefas na tela
function exibirTarefas() {
    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar

    tarefas.forEach((tarefa) => {
        const item = document.createElement("div");
        item.classList.add("tarefa");
        item.id = `tarefa-${tarefa.id}`;
        item.innerHTML = `
            <span>${tarefa.title} (Usuário: ${tarefa.userId})</span>
            <button onclick="editarTarefa(${tarefa.id})">✏️ Editar</button>
            <button onclick="excluirTarefa(${tarefa.id})">🗑️ Excluir</button>
        `;
        lista.appendChild(item);
    });
}

// Função para excluir uma tarefa
function excluirTarefa(id) {
    const confirmar = confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirmar) return;

    // Remove do array local
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);

    // Remove da interface sem precisar recarregar a página
    document.getElementById(`tarefa-${id}`).remove();

    alert("Tarefa excluída com sucesso!");
}

// Função para editar uma tarefa
function editarTarefa(id) {
    const novaDescricao = prompt("Edite a descrição da tarefa:");
    if (!novaDescricao) return;

    // Atualiza no array local
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) {
        tarefa.title = novaDescricao;
    }

    // Atualiza a interface
    exibirTarefas();
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const titulo = document.getElementById("nova-tarefa").value;
    const userId = document.getElementById("usuario-id").value;

    if (!titulo || !userId) {
        alert("Preencha todos os campos!");
        return;
    }

    const novaTarefa = {
        id: tarefas.length + 1, // Simulação de ID único
        title: titulo,
        userId: parseInt(userId),
    };

    tarefas.push(novaTarefa);
    exibirTarefas();
    document.getElementById("nova-tarefa").value = "";
    document.getElementById("usuario-id").value = "";
}

// Função para buscar tarefas por usuário
function buscarPorUsuario() {
    const userId = document.getElementById("busca-usuario-id").value;
    if (!userId) {
        alert("Digite um ID de usuário!");
        return;
    }

    const tarefasFiltradas = tarefas.filter((tarefa) => tarefa.userId == userId);

    const lista = document.getElementById("lista-busca");
    lista.innerHTML = ""; // Limpa antes de mostrar os resultados

    if (tarefasFiltradas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa encontrada para este usuário.</p>";
        return;
    }

    tarefasFiltradas.forEach((tarefa) => {
        const item = document.createElement("div");
        item.innerText = tarefa.title;
        lista.appendChild(item);
    });
}