// filepath: c:\Users\PICHAU\Documents\Projetos\ProjetosGit\TestCafe\src\pages\scripts.js

// Funções de autenticação simulada
function login(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

function usuarioAutenticado() {
    return !!localStorage.getItem('usuarioLogado');
}

function getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado'));
}

// Proteger páginas restritas
const paginaProtegida = ['dashboard.html', 'profile.html'];
const paginaAtual = window.location.pathname.split('/').pop();
if (paginaProtegida.includes(paginaAtual) && !usuarioAutenticado()) {
    window.location.href = 'index.html';
}

// Lógica de login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const erro = document.getElementById("erro");
        if (login(email, senha)) {
            window.location.href = "dashboard.html";
        } else {
            erro.textContent = "E-mail ou senha incorretos.";
        }
    });
}

// Lógica de logout
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
}

// Função para validar e-mail
function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Lógica de registro
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        const erro = document.getElementById("erro");

        erro.textContent = "";

        if (!emailValido(email)) {
            mostrarBanner('E-mail inválido.', 'erro');
            return;
        }
        if (senha !== confirmarSenha) {
            erro.textContent = "As senhas não coincidem.";
            mostrarBanner('As senhas não coincidem.', 'erro');
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.some(u => u.email === email)) {
            erro.textContent = "E-mail já cadastrado.";
            mostrarBanner('E-mail já cadastrado.', 'erro');
            return;
        }

        usuarios.push({ nome, email, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        mostrarBanner('Registro realizado com sucesso!', 'sucesso');
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    });
}

const profileForm = document.getElementById("profileForm");
if (profileForm) {
    // Preencher campos com dados do usuário logado
    const usuario = getUsuarioLogado();
    if (usuario) {
        document.getElementById("nome").value = usuario.nome;
        document.getElementById("email").value = usuario.email;
        document.getElementById("telefone").value = usuario.telefone || '';
        document.getElementById("nascimento").value = usuario.nascimento || '';
        if (usuario.foto) {
            const preview = document.getElementById('foto-preview');
            preview.src = usuario.foto;
            preview.style.display = 'block';
        }
    }

    // Preview da foto
    const fotoInput = document.getElementById('foto');
    if (fotoInput) {
        fotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const preview = document.getElementById('foto-preview');
                    preview.src = ev.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        if (!nome || !email) {
            mostrarBanner('Preencha todos os campos obrigatórios.', 'erro');
            return;
        }
        const senha = document.getElementById("senha").value;
        const telefone = document.getElementById("telefone").value;
        const nascimento = document.getElementById("nascimento").value;
        const erro = document.getElementById("erro");
        let foto = usuario.foto || '';
        if (fotoInput && fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                foto = ev.target.result;
                salvarPerfil();
            };
            reader.readAsDataURL(fotoInput.files[0]);
            return;
        }
        salvarPerfil();
        function salvarPerfil() {
            erro.textContent = "";
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            if (usuarios.some(u => u.email === email && u.email !== usuario.email)) {
                erro.textContent = "E-mail já cadastrado por outro usuário.";
                return;
            }
            usuarios = usuarios.map(u => {
                if (u.email === usuario.email) {
                    return {
                        nome, email, senha: senha ? senha : u.senha, telefone, nascimento, foto
                    };
                }
                return u;
            });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioLogado', JSON.stringify({ nome, email, senha: senha ? senha : usuario.senha, telefone, nascimento, foto }));
            mostrarBanner('Perfil atualizado com sucesso!', 'sucesso');
            document.getElementById("senha").value = "";
        }
    });
}

const botao = document.getElementById('algumId');
if (botao) {
    botao.addEventListener('click', function() {
        // sua lógica aqui
    });
}

// Preencher informações do usuário no dashboard
if (paginaAtual === 'dashboard.html' && usuarioAutenticado()) {
    const usuario = getUsuarioLogado();
    if (usuario) {
        const nomeEl = document.getElementById('user-nome');
        const emailEl = document.getElementById('user-email');
        if (nomeEl) nomeEl.textContent = `Usuário: ${usuario.nome}`;
        if (emailEl) emailEl.textContent = `E-mail: ${usuario.email}`;
    }
}

// Mural de avisos no dashboard
if (paginaAtual === 'dashboard.html' && usuarioAutenticado()) {
    const usuario = getUsuarioLogado();
    const muralForm = document.getElementById('muralForm');
    const listaMensagens = document.getElementById('lista-mensagens');

    function carregarMensagens() {
        const mensagens = JSON.parse(localStorage.getItem('muralMensagens')) || [];
        const minhasMensagens = mensagens.filter(m => m.email === usuario.email);
        listaMensagens.innerHTML = '';
        if (minhasMensagens.length === 0) {
            listaMensagens.innerHTML = '<li>Nenhum aviso postado ainda.</li>';
        } else {
            minhasMensagens.forEach((msg, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${msg.texto}</span> <button class='deletar-msg' data-idx='${idx}'>Deletar</button>`;
                listaMensagens.appendChild(li);
            });
        }
    }

    if (muralForm) {
        muralForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const texto = document.getElementById('mensagemMural').value.trim();
            if (!texto) return;
            let mensagens = JSON.parse(localStorage.getItem('muralMensagens')) || [];
            mensagens.push({ email: usuario.email, texto });
            localStorage.setItem('muralMensagens', JSON.stringify(mensagens));
            document.getElementById('mensagemMural').value = '';
            carregarMensagens();
        });
    }

    listaMensagens.addEventListener('click', function(e) {
        if (e.target.classList.contains('deletar-msg')) {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            let mensagens = JSON.parse(localStorage.getItem('muralMensagens')) || [];
            // Filtra só as mensagens do usuário logado
            const minhasMensagens = mensagens.filter(m => m.email === usuario.email);
            const msgParaDeletar = minhasMensagens[idx];
            // Remove a mensagem do array geral
            mensagens = mensagens.filter(m => !(m.email === usuario.email && m.texto === msgParaDeletar.texto));
            localStorage.setItem('muralMensagens', JSON.stringify(mensagens));
            carregarMensagens();
        }
    });

    carregarMensagens();
}

// Banner de feedback visual
function mostrarBanner(msg, tipo) {
    let banner = document.getElementById('banner-feedback');
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'banner-feedback';
        banner.style.position = 'fixed';
        banner.style.top = '10px';
        banner.style.left = '50%';
        banner.style.transform = 'translateX(-50%)';
        banner.style.padding = '10px 20px';
        banner.style.borderRadius = '5px';
        banner.style.zIndex = '9999';
        banner.style.fontWeight = 'bold';
        document.body.appendChild(banner);
    }
    banner.textContent = msg;
    banner.style.background = tipo === 'erro' ? '#ffb3b3' : '#b3ffb3';
    banner.style.color = '#222';
    banner.style.display = 'block';
    setTimeout(() => { banner.style.display = 'none'; }, 2500);
}

// Função para aplicar tema salvo
function aplicarTemaSalvo() {
    const tema = localStorage.getItem('tema_sistema') || 'claro';
    if (tema === 'escuro') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Aplicar tema ao carregar qualquer página
aplicarTemaSalvo();

// Configurações do usuário
if (paginaAtual === 'settings.html' && usuarioAutenticado()) {
    const usuario = getUsuarioLogado();
    const form = document.getElementById('settingsForm');
    if (form) {
        // Carregar preferências salvas
        const prefs = JSON.parse(localStorage.getItem('preferencias_' + usuario.email)) || {};
        form.tema.value = prefs.tema || (localStorage.getItem('tema_sistema') || 'claro');
        form.notificacoes.checked = !!prefs.notificacoes;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const tema = form.tema.value;
            const notificacoes = form.notificacoes.checked;
            localStorage.setItem('preferencias_' + usuario.email, JSON.stringify({ tema, notificacoes }));
            localStorage.setItem('tema_sistema', tema); // Salva tema global
            aplicarTemaSalvo();
            mostrarBanner('Preferências salvas!', 'sucesso');
        });
    }
}

// Formulário de contato
if (paginaAtual === 'contact.html') {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('contato-email').value;
            if (!emailValido(email)) {
                mostrarBanner('E-mail inválido.', 'erro');
                return;
            }
            mostrarBanner('Mensagem enviada com sucesso!', 'sucesso');
            form.reset();
        });
    }
}