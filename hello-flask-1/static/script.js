const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem() {
    mensagem.textContent = "Ola Zorante Flask 1.";
}

botao.addEventListener("click", mostrarMensagem);