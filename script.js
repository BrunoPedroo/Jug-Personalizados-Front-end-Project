const lupa = document.getElementById("lupa");
const barraPesquisa = document.getElementById("barraPesquisa");

// Animação da busca (lupa)
lupa.addEventListener("click", () => {
  barraPesquisa.classList.toggle("ativo");
  barraPesquisa.focus();
});

// REVEAL AO SCROLL (estilo Apple)
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

// Chamar ao carregar e ao rolar
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

//Codígo que faz os botoes funcioanarem
const btnEntrar = document.getElementById('btnEntrar');
const loginModal = document.getElementById('loginModal');
const fecharModal = document.getElementById('fecharModal');

btnEntrar.addEventListener('click', () => {
  loginModal.classList.toggle('ativo');
});

fecharModal.addEventListener('click', () => {
  loginModal.classList.remove('ativo');
});

// Opcional: fechar clicando fora do modal
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove('ativo');
  }
});


// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll(".menu-lista a");

menuLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault(); // evita comportamento padrão

    const targetId = this.getAttribute("href").substring(1); // pega o id sem #
    const targetEl = document.getElementById(targetId);

    const menuHeight = document.querySelector(".menu").offsetHeight; // altura do menu

    // Calcula a posição final da rolagem
    const offsetPosition = targetEl.offsetTop - menuHeight - 20; // 20px de folga

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

