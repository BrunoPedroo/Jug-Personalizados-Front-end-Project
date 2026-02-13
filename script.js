document.title = "Jugê Personalizados | Artesanais";

//banco de dados no JS para não usar o Back End apenas para portifolio 
const usuaiosFake = [
  {email: "juliana@gmail.com", senha: "juju123"},
  {email: "bruno@hotmail.com", senha: "bruno123"}
]

let carrinho = [];

function salvarCarrinho(){
  if (carrinho.length>0){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  } else {
      localStorage.removeItem("carrinho");
    }
  }

function carregarCarrinho() {
  const dados = localStorage.getItem("carrinho");

  if (dados) {
    carrinho = JSON.parse(dados);

    carrinho = carrinho.map(item => ({
      ...item,
      quantidade: item.quantidade || 1
    }));

    atualizarCarrinho();
  }
}

function finalizarCompra() {
  const usuario = localStorage.getItem("usuario");
  
  if (!usuarioLogado()) {
    alert("faça login para finalizar a compra");
    loginModal.classList.add("ativo");
    return;
  }

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio 😕");
    return;
  }

  const confirmar = confirm("Deseja finalizar sua compra?");

  if (!confirmar) return;

  alert("Pagamento aprovado! 🎉 Obrigado pela compra.");

  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
  modalCarrinho.classList.remove("ativo");
}

function adicionarAoCarrinho(nome, preco){
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      nome,
      preco,
      quantidade: 1
    });
  }
  atualizarCarrinho();
}

/*BUSCA (LUPA) */

const lupa = document.getElementById("lupa");
const barraPesquisa = document.getElementById("barraPesquisa");
const secoes = document.querySelectorAll("section[data-produto]");

lupa.addEventListener("click", () => {
  barraPesquisa.classList.toggle("ativo");
  barraPesquisa.focus();
});

barraPesquisa.addEventListener("keyup", () => {
  const valor = barraPesquisa.value.toLowerCase().trim();

  secoes.forEach(secao => secao.classList.remove("destaque"));

  if (valor === "") return;

  secoes.forEach(secao => {
    if (secao.dataset.produto.includes(valor)) {
      secao.classList.add("destaque");
      secao.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

//CARRINHO

const botoesCarrinho = document.querySelectorAll(".btn-carrinho");
const btnCarrinho = document.getElementById("btnCarrinho");
const modalCarrinho = document.getElementById("modalCarrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const contadorCarrinho = document.getElementById("contadorCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const btnFinalizar = document.getElementById("btnFinalizar");
const loginErro = document.getElementById("loginErro")

// Atualiza carrinho na tela
function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome}<br>
      R$ ${item.preco.toFixed(2)} x ${item.quantidade}<br>
      <button onclick="diminuir(${index})"><i class="fa-solid fa-minus"></i></button>
      <button onclick="aumentar(${index})"><i class="fa-solid fa-plus"></i></button>
      <button onclick="remove(${index})"><i class="fa-solid fa-trash"></i>
    `;
    listaCarrinho.appendChild(li);
  });

  contadorCarrinho.textContent = carrinho.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  const totalItensEl = document.getElementById("totalItens");
  const totalFinalEl = document.getElementById("totalfinal");

  if (totalItensEl) totalItensEl.textContent = contadorCarrinho.textContent;
  if (totalFinalEl) totalFinalEl.textContent = total.toFixed(2);

  if (btnFinalizar) btnFinalizar.disabled = carrinho.length === 0;

  const msgVazio = document.getElementById("msgVazio");
  if (msgVazio) {
    msgVazio.style.display = carrinho.length === 0 ? "block" : "none";
  }

  salvarCarrinho();
} 

function aumentar(index){
  carrinho[index].quantidade +=1;
  atualizarCarrinho();
}

function diminuir(index){
  if (carrinho[index].quantidade > 1){
    carrinho[index].quantidade-=1;
  } else {
    carrinho.splice(index,1);
  }
  atualizarCarrinho();
}

function remove(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

btnFinalizar.addEventListener("click", finalizarCompra);

// Adicionar item
botoesCarrinho.forEach(botao => {
  botao.addEventListener("click", () => {
    const nome = botao.dataset.nome;
    const preco = Number(botao.dataset.preco);
  
    adicionarAoCarrinho(nome, preco);

      });

  });

// Abrir / fechar modal do carrinho
btnCarrinho.addEventListener("click", () => {
  modalCarrinho.classList.toggle("ativo");
});

fecharCarrinho.addEventListener("click", () => {
  modalCarrinho.classList.remove("ativo");
});


// MODAL LOGIN

const btnEntrar = document.getElementById("btnEntrar");
const loginModal = document.getElementById("loginModal");
const fecharModal = document.getElementById("fecharModal");
const emailLogin = document.getElementById("emailLogin");
const loginSenha = document.getElementById("loginSenha")
const btnLoginConfirmar = document.getElementById("btnLoginConfirmar");

btnEntrar.addEventListener("click", () => {
  loginModal.classList.toggle("ativo");
});

fecharModal.addEventListener("click", () => {
  loginModal.classList.remove("ativo");
});

// Fecha clicando fora
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("ativo");
  }
});

//travar a compra sem logar

function usuarioLogado() {
  return localStorage.getItem("usuario") !==null;
}

if(btnFinalizar)
  btnFinalizar.disabled = !usuarioLogado();

//Login fake

function fazerLogin () {
  const email = emailLogin.value.trim();
  const senha = loginSenha.value.trim();

  loginErro.style.display="none";
  loginErro.textContent="";

  if (!email || !senha) {
    loginErro.textContent = "Preencher e-mail e senha";
    loginErro.display = "block";
    return;
  }

  const usuarisEncontrado = usuaiosFake.find(
    u=> u.email === email && u.senha === senha
  );

  if(!usuarisEncontrado){
    loginErro.textContent = "Email ou senha incorretos";
    loginErro.style.display = "block";
    return;
  }

  const nome = email.split("@")[0];

  const usuario = {
    email,
    nome
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));
  atualizarAreaLogin();
  loginModal.classList.remove("ativo"); 
}

if (btnLoginConfirmar)  
  btnLoginConfirmar.addEventListener("click", (e) => {
    e.preventDefault();
  fazerLogin();
});

function logout () {
  localStorage.removeItem("usuario");
  atualizarAreaLogin();
}

function atualizarAreaLogin() {
  const dados = localStorage.getItem("usuario");

  if (!dados) {
    btnEntrar.textContent = "Entrar";
    btnEntrar.onclick = () => loginModal.classList.add("ativo");
    return;
  }

  const usuario = JSON.parse(dados);

  btnEntrar.textContent = `Olá, ${usuario.nome.toUpperCase()}`;
  btnEntrar.onclick = logout;
}



//ANIMAÇÃO REVEAL AO SCROLL

const reveals = document.querySelectorAll(".reveal");

function revelarAoScroll() {
  const alturaJanela = window.innerHeight;
  const pontoAtivacao = 100;

  reveals.forEach(elemento => {
    const topoElemento = elemento.getBoundingClientRect().top;

    if (topoElemento < alturaJanela - pontoAtivacao) {
      elemento.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revelarAoScroll);
window.addEventListener("load", revelarAoScroll);

/*SCROLL SUAVE DO MENU*/

const menuLinks = document.querySelectorAll(".menu-lista a");
const menu = document.querySelector(".menu");

menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("href").replace("#", "");
    const destino = document.getElementById(id);

    const offset = destino.offsetTop - menu.offsetHeight - 20;

    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  });
});

carregarCarrinho();
atualizarAreaLogin();