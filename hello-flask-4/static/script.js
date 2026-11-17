const botao = document.getElementById("botao4");
const nomeCampo = document.getElementById("nome");
const idadeCampo = document.getElementById("idade");
const mensagem = document.getElementById("mensagem");
//const historico = document.getElementById("#lista tbody");   // NOVO
const historico = document.querySelector("#lista tbody");

// NOVO: busca no servidor o que está no banco e mostra na tela
async function carregarLista() {
    const resposta = await fetch("/api/select-hello");
    const consultas = await resposta.json();

   /* lista.innerHTML = "";
    consultas.forEach(function (c) {
        const li = document.createElement("li");
        li.textContent = c.nome + " (" + c.idade + " anos)" + " - " + c.situacao;
        lista.appendChild(li);
    });
*/

    historico.innerHTML = "";

    consultas.forEach(function (c) {
        const tr = document.createElement("tr");
 
        const tdNome = document.createElement("td");
        tdNome.textContent = c.nome;
    
        const tdIdade = document.createElement("td");
        tdIdade.textContent = c.idade + " anos";
    
        const tdSituacao = document.createElement("td");
        tdSituacao.textContent = c.situacao;
    
        tr.appendChild(tdNome);
        tr.appendChild(tdIdade);
        tr.appendChild(tdSituacao);
    
        historico.appendChild(tr);
    });

}

botao.addEventListener("click", async function () {
    const nome = nomeCampo.value.trim();
    const idade = idadeCampo.value.trim();
    
	const resposta = await fetch("/api/save-hello", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  nome: nome,
                                idade: idade
        })
    });

	const dados = await resposta.json();

	mensagem.textContent = "> " + 
                           dados.situacao +
                           " (tempo restante: " + dados.tempo_restante + " anos)";

    carregarLista();   // NOVO: atualiza a lista após gravar
});

carregarLista();   // NOVO: mostra o que já estava salvo ao abrir a página



