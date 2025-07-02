// filepath: c:\Users\PICHAU\Documents\Projetos\ProjetosGit\TestCafe\src\pages\scripts.js
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const erro = document.getElementById("erro");

        if (email === "teste@exemplo.com" && senha === "123456") {
            window.location.href = "success.html";
        } else {
            erro.textContent = "E-mail ou senha incorretos.";
        }
    });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        const erro = document.getElementById("erro");

        if (senha !== confirmarSenha) {
            erro.textContent = "As senhas não coincidem.";
        } else {
            // Simulação de registro bem-sucedido
            alert("Registro realizado com sucesso!");
            window.location.href = "index.html"; // Redireciona para a página de login
        }
    });
}

const profileForm = document.getElementById("profileForm");
if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const erro = document.getElementById("erro");

        // Simulação de atualização de perfil
        alert("Perfil atualizado com sucesso!");
        // Aqui você pode adicionar lógica para enviar os dados para o servidor
    });
}

const botao = document.getElementById('algumId');
if (botao) {
    botao.addEventListener('click', function() {
        // sua lógica aqui
    });
}