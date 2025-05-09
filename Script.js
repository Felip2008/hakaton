//modo escuro//
let coresIniciais = {
    box1: '#777777',
    box2: '#ffffff',
    text: '#000000'
  };
  let novasCores = {
    box1: '#0f0f0f',
    box2: '#252525',
    text: '#ffffff'
  };
  
  let initialTextColors = {};

  function mudaracor() {
    const box1 = document.querySelector('.box1');
    const box2 = document.querySelector('.box2');
    const textos = document.querySelectorAll('.texto');
    const chaveSeletora = document.getElementById('switch-shadow');

    if (!coresIniciais.box1) {
      coresIniciais.box1 = box1.style.backgroundColor;
      coresIniciais.box2 = box2.style.backgroundColor;

      textos.forEach(texto => {
        initialTextColors[texto] = window.getComputedStyle(texto).color;
      });
    }

    if (chaveSeletora.checked) {
      box1.style.backgroundColor = novasCores.box1;
      box2.style.backgroundColor = novasCores.box2;
      textos.forEach(texto => {
        texto.style.color = novasCores.text;
      });
    } else {
      box1.style.backgroundColor = coresIniciais.box1;
      box2.style.backgroundColor = coresIniciais.box2;
      textos.forEach(texto => {
        texto.style.color = initialTextColors[texto] || coresIniciais.text;
      });
    }
  }

  //escolher foto de perfil//
  document.addEventListener('DOMContentLoaded', () => {
    const ftPerfilDiv = document.getElementById('ft_perfil');
    const fileInput = document.getElementById('fileInput');
    // ... outros elementos e listeners de evento ...

    // --- Carregar a foto de perfil salva ao carregar a página ---
    const fotoPerfilSalva = localStorage.getItem('foto_perfil_base64');
    if (fotoPerfilSalva) {
        ftPerfilDiv.style.backgroundImage = `url(${fotoPerfilSalva})`;
    }

    // --- Adicionar o listener de evento para o clique na div da foto de perfil ---
    ftPerfilDiv.addEventListener('click', () => {
        fileInput.click(); // Simula o clique no input de arquivo escondido
    });

    // --- Adicionar o listener de evento para quando um arquivo for selecionado ---
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Pega o primeiro arquivo selecionado

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const dataUrl = e.target.result; // A Data URL (Base64) da imagem

                // Define a imagem de fundo da div
                ftPerfilDiv.style.backgroundImage = `url(${dataUrl})`;

                // --- Salvar a Data URL no localStorage ---
                try {
                    localStorage.setItem('foto_perfil_base64', dataUrl);
                    console.log('Foto de perfil salva no localStorage.');
                } catch (e) {
                    console.error('Erro ao salvar a foto de perfil no localStorage:', e);
                    alert('Não foi possível salvar a foto de perfil. O tamanho pode ser muito grande.');
                }
            };

            // Lê o arquivo como uma Data URL
            reader.readAsDataURL(file);
        }
    });

    // ... o restante do seu código (edição da bio, etc.) ...

    // Exemplo de como adaptar a lógica de carregar/salvar bio para outros campos
    function carregarDadosSalvos() {
        const nomeSalvo = localStorage.getItem('nome_usuario');
        if (nomeSalvo) {
            document.getElementById('nome_bio').innerText = nomeSalvo;
        }

        const generoSalvo = localStorage.getItem('genero_usuario');
        if (generoSalvo) {
             document.getElementById('genero_bio').innerText = generoSalvo;
        }
        // Continue para idade, estado civil, carreira, formacao...
        const idadeSalva = localStorage.getItem('idade_usuario');
        if (idadeSalva) {
            document.getElementById('idade_bio').innerText = idadeSalva;
        }
         const estadoCivilSalvo = localStorage.getItem('estadocivil_usuario');
        if (estadoCivilSalvo) {
            document.getElementById('estadocivil_bio').innerText = estadoCivilSalvo;
        }
         const carreiraSalva = localStorage.getItem('carreira_usuario');
        if (carreiraSalva) {
            document.getElementById('carreira_bio').innerText = carreiraSalva;
        }
        const formacaoSalva = localStorage.getItem('formacao_usuario');
        if (formacaoSalva) {
            document.getElementById('formacao_bio').innerText = formacaoSalva;
        }
    }

    function salvarDados() {
        const nomeAtual = document.getElementById('nome_bio').innerText;
        localStorage.setItem('nome_usuario', nomeAtual);

        const generoAtual = document.getElementById('genero_bio').innerText;
        localStorage.setItem('genero_usuario', generoAtual);

        // Continue para idade, estado civil, carreira, formacao...
         const idadeAtual = document.getElementById('idade_bio').innerText;
        localStorage.setItem('idade_usuario', idadeAtual);
         const estadoCivilAtual = document.getElementById('estadocivil_bio').innerText;
        localStorage.setItem('estadocivil_usuario', estadoCivilAtual);
         const carreiraAtual = document.getElementById('carreira_bio').innerText;
        localStorage.setItem('carreira_usuario', carreiraAtual);
        const formacaoAtual = document.getElementById('formacao_bio').innerText;
        localStorage.setItem('formacao_usuario', formacaoAtual);


        alert('Alterações salvas!');
    }

    // Associa as funções aos botões, garantindo que carregam dados salvos na inicialização
     const editarBioBtn = document.getElementById('editarBioBtn');
     const salvarBioBtn = document.getElementById('salvarBioBtn');
     const elementosEditaveis = document.querySelectorAll('.texto'); // Seleciona todos os elementos com a classe 'texto' que são editáveis

     carregarDadosSalvos(); // Carrega os dados salvos ao carregar a página

     editarBioBtn.addEventListener('click', () => {
         elementosEditaveis.forEach(elemento => {
             elemento.contentEditable = true;
             elemento.style.border = '1px solid #ccc';
         });
         editarBioBtn.style.display = 'none';
         salvarBioBtn.style.display = 'inline-block';
     });

     salvarBioBtn.addEventListener('click', () => {
         salvarDados();

         elementosEditaveis.forEach(elemento => {
             elemento.contentEditable = false;
             elemento.style.border = 'none';
         });
         salvarBioBtn.style.display = 'none';
         editarBioBtn.style.display = 'inline-block';
     });
});

//movimento do interruptor do modo escuro//
  window.onload = function () {
    const switchShadow = document.getElementById('switch-shadow');
    if (switchShadow) {
      switchShadow.addEventListener('change', mudaracor);
    }

    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', () => {
        dropdown.classList.toggle('open');
      });

      dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
          dropdownToggle.textContent = item.textContent;
          dropdown.classList.remove('open');
        });
      });

      document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
          dropdown.classList.remove('open');
        }
      });
    }

    //editar bio//
    const editarBioBtn = document.getElementById('editarBioBtn');
    const salvarBioBtn = document.getElementById('salvarBioBtn');
    const bioIdade = document.getElementById('idade_bio');
    const bioVida = document.getElementById('vida_bio');
    const bioCarreira = document.getElementById('carreira_bio');
    const bioFormacao = document.getElementById('formacao_bio');
    const generoContainer = document.getElementById('bio_genero_container');
    const estadoCivilContainer = document.getElementById('bio_estadocivil_container');
    const nome = document.getElementById('bio_nome_container');

    let currentGenero = "Gênero";
    let currentEstadoCivil = "Est. Cívil";
    
    //desabilitar edição de bio//
    function disableBioEdit() {
      bioIdade.contentEditable = false;
      bioCarreira.contentEditable = false;
      bioFormacao.contentEditable = false;
      nome.contentEditable = false;

      const generoSelect = document.getElementById('genero_select');
      const estadoCivilSelect = document.getElementById('estadocivil_select');

      if (generoSelect) {
        currentGenero = generoSelect.value || "Gênero";
        generoContainer.innerHTML = `<p id="genero_bio" class="texto" data-bio-type="genero">${generoSelect.options[generoSelect.selectedIndex]?.text || "Gênero"}</p>`;
      }

      if (estadoCivilSelect) {
        currentEstadoCivil = estadoCivilSelect.value || "Est. Cívil";
        estadoCivilContainer.innerHTML = `<p id="estadocivil_bio" class="texto" data-bio-type="estado_civil">${estadoCivilSelect.options[estadoCivilSelect.selectedIndex]?.text || "Est. Cívil"}</p>`;
      }

      editarBioBtn.style.display = 'inline-block';
      salvarBioBtn.style.display = 'none';

      console.log('Bio Salva!');
      console.log('Idade:', bioIdade.textContent);
      console.log('Carreira:', bioCarreira.textContent);
      console.log('Formação:', bioFormacao.textContent);
      console.log('Gênero:', currentGenero);
      console.log('Estado Civil:', currentEstadoCivil);
      console.log(nome.textContent)
    }

    editarBioBtn.addEventListener('click', enableBioEdit);
    salvarBioBtn.addEventListener('click', disableBioEdit);

    //alterar imagem destaque//
    const imagens = document.querySelectorAll('.img_destaque');
    imagens.forEach((img) => {
      img.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              img.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        });
        input.click();
      });
    });
  };

  document.addEventListener("DOMContentLoaded", function() {
    // Selecione o elemento <p> pelo id
    const projetoBio = document.getElementById("projeto_bio");

    // Adiciona um evento de clique para tornar o conteúdo editável
    projetoBio.addEventListener("click", function() {
        // Cria um campo de input para o usuário editar o texto
        let currentText = projetoBio.innerText;
        projetoBio.innerHTML = `<input type="text" value="${currentText}" id="editProjeto">`;

        // Quando o campo de texto perder o foco (blur), o texto é salvo
        const inputField = document.getElementById("editProjeto");
        inputField.addEventListener("blur", function() {
            projetoBio.innerHTML = inputField.value;
        });

        // Também podemos adicionar um evento de "enter" para salvar ao pressionar Enter
        inputField.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                projetoBio.innerHTML = inputField.value;
            }
        });
    });
});

//mudar o nome dos projetos//
const projectNames = document.querySelectorAll('#projeto_nome');

projectNames.forEach(projectName => {
projectName.addEventListener('click', () => {
projectName.contentEditable = true;
projectName.focus();
 });
projectName.addEventListener('blur', () => {
projectName.contentEditable = false;
console.log(`Project name updated to: ${projectName.textContent}`);
});
});