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
  function escolherImagem() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  
    fileInput.onchange = function () {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const ftPerfil = document.getElementById('ft_perfil');
          ftPerfil.style.backgroundImage = `url('${e.target.result}')`;
          ftPerfil.style.backgroundSize = 'cover';
          ftPerfil.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
      }
      fileInput.value = '';
    };
  }

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

    //habilitar edição de bio//
    function enableBioEdit() {
      bioIdade.contentEditable = true;
      bioCarreira.contentEditable = true;
      bioFormacao.contentEditable = true;
      nome.contentEditable=true;

      generoContainer.innerHTML = `
        <select id="genero_select" name="genero" class="year-select">
          <option value="" disabled ${currentGenero === 'Gênero' ? 'selected' : ''}>Gênero</option>
          <option value="Masculino" ${currentGenero === 'Masculino' ? 'selected' : ''}>Masculino</option>
          <option value="Feminino" ${currentGenero === 'Feminino' ? 'selected' : ''}>Feminino</option>
        </select>
      `;

      estadoCivilContainer.innerHTML = `
        <select id="estadocivil_select" name="estado_civil" class="year-select">
          <option value="" disabled ${currentEstadoCivil === 'Est. Cívil' ? 'selected' : ''}>Est. Cívil</option>
          <option value="Solteiro" ${currentEstadoCivil === 'Solteiro' ? 'selected' : ''}>Solteiro</option>
          <option value="Casado" ${currentEstadoCivil === 'Casado' ? 'selected' : ''}>Casado</option>
        </select>
      `;

      editarBioBtn.style.display = 'none';
      salvarBioBtn.style.display = 'inline-block';
    }

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
const projectNames = document.querySelectorAll('.projeto_nome');

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