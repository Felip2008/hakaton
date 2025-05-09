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
const LOCAL_STORAGE_THEME_KEY = 'modoEscuroAtivado';


function aplicarTema(isDarkMode) {
  const box1 = document.querySelector('.box1');
  const box2 = document.querySelector('.box2');
  const textos = document.querySelectorAll('.texto');
  const navbar = document.querySelector('.navbar');

  if (box1 && box2 && textos) {
      if (isDarkMode) {
          box1.style.backgroundColor = novasCores.box1;
          box2.style.backgroundColor = novasCores.box2;
          textos.forEach(texto => {
              texto.style.color = novasCores.text;
          });
          if (navbar) {
              navbar.setAttribute('data-bs-theme', 'dark');
          }
      } else {
          box1.style.backgroundColor = coresIniciais.box1;
          box2.style.backgroundColor = coresIniciais.box2;
          textos.forEach(texto => {

              texto.style.color = initialTextColors[texto] || coresIniciais.text;
          });
          if (navbar) {
              navbar.setAttribute('data-bs-theme', 'light');
          }
      }
  }
}

function mudaracor() {
  const chaveSeletora = document.getElementById('switch-shadow');
  if (chaveSeletora) {
      const isDarkMode = chaveSeletora.checked;

      aplicarTema(isDarkMode);

      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDarkMode);
  }
}

function saveImageData(localStorageKey, index, dataUrl) {
  const savedImages = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  savedImages[index] = dataUrl;
  localStorage.setItem(localStorageKey, JSON.stringify(savedImages));
}

function loadAndApplyImages(selector, localStorageKey) {
  const savedImages = JSON.parse(localStorage.getItem(localStorageKey));
  if (savedImages) {
      const imagens = document.querySelectorAll(selector);
      imagens.forEach((img, index) => {
          if (savedImages[index]) {
              img.src = savedImages[index];
          }
      });
  }
}

function setupImageListeners(selector, localStorageKey) {
   const imagens = document.querySelectorAll(selector);
   imagens.forEach((img, index) => {
       img.addEventListener('click', () => {
           const input = document.createElement('input');
           input.type = 'file';
           input.accept = 'image/*';
           input.addEventListener('change', (event) => {
               const file = event.target.files[0];
               if (file) {
                   const reader = new FileReader();
                   reader.onload = function (e) {
                       const dataUrl = e.target.result;
                       img.src = dataUrl;

                       saveImageData(localStorageKey, index, dataUrl);

                   };
                   reader.readAsDataURL(file);
               }
           });
           input.click();
       });
   });
}


const LOCAL_STORAGE_PROJECT_NAMES_KEY = 'projectNames';

function saveProjectName(index, name) {
  const savedNames = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_NAMES_KEY)) || {};
  savedNames[index] = name;
  localStorage.setItem(LOCAL_STORAGE_PROJECT_NAMES_KEY, JSON.stringify(savedNames));
}

function loadAndApplyProjectNames() {
  const savedNames = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_NAMES_KEY));
  if (savedNames) {
      const projectNames = document.querySelectorAll('#projeto_nome');
      projectNames.forEach((nameElement, index) => {
          if (savedNames[index]) {
              nameElement.textContent = savedNames[index];
          }
      });
  }
}

const LOCAL_STORAGE_PROJECT_TEXTS_KEY = 'projectTexts';

function saveProjectText(index, text) {
  const savedTexts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_TEXTS_KEY)) || {};
  savedTexts[index] = text;
  localStorage.setItem(LOCAL_STORAGE_PROJECT_TEXTS_KEY, JSON.stringify(savedTexts));
}

function loadAndApplyProjectTexts() {
  const savedTexts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_TEXTS_KEY));
  if (savedTexts) {
      const projectTexts = document.querySelectorAll('#project_text');
      projectTexts.forEach((textElement, index) => {
          if (savedTexts[index]) {
              textElement.value = savedTexts[index];
          }
      });
  }
}

const LOCAL_STORAGE_BIO_KEY = 'bioData';

function saveBioData() {
  const bioData = {
      nome: document.getElementById('nome_bio')?.innerText || '',
      genero: document.getElementById('genero_bio')?.innerText || '',
      idade: document.getElementById('idade_bio')?.innerText || '',
      estado_civil: document.getElementById('estadocivil_bio')?.innerText || '',
      carreira: document.getElementById('carreira_bio')?.innerText || '',
      formacao: document.getElementById('formacao_bio')?.innerText || ''
  };
  localStorage.setItem(LOCAL_STORAGE_BIO_KEY, JSON.stringify(bioData));
   alert('Alterações da Bio salvas!');
}

function loadAndApplyBioData() {
  const savedBioData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BIO_KEY));
  if (savedBioData) {
      if(document.getElementById('nome_bio')) document.getElementById('nome_bio').innerText = savedBioData.nome;
      if(document.getElementById('genero_bio')) document.getElementById('genero_bio').innerText = savedBioData.genero;
      if(document.getElementById('idade_bio')) document.getElementById('idade_bio').innerText = savedBioData.idade;
      if(document.getElementById('estadocivil_bio')) document.getElementById('estadocivil_bio').innerText = savedBioData.estado_civil;
      if(document.getElementById('carreira_bio')) document.getElementById('carreira_bio').innerText = savedBioData.carreira;
      if(document.getElementById('formacao_bio')) document.getElementById('formacao_bio').innerText = savedBioData.formacao;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const chaveSeletora = document.getElementById('switch-shadow');
  const textos = document.querySelectorAll('.texto');

   if (Object.keys(initialTextColors).length === 0) {
      textos.forEach(texto => {
          initialTextColors[texto] = window.getComputedStyle(texto).color;
      });
  }

  const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  if (savedTheme !== null) {
      const isDarkModeSaved = savedTheme === 'true';

      if(chaveSeletora) chaveSeletora.checked = isDarkModeSaved;
      aplicarTema(isDarkModeSaved);
  } else {
       aplicarTema(false);
  }

  if (chaveSeletora) {
      chaveSeletora.addEventListener('change', mudaracor);
  }

  const ftPerfilDiv = document.getElementById('ft_perfil');
  const fileInput = document.getElementById('fileInput');

  const fotoPerfilSalva = localStorage.getItem('foto_perfil_base64');
  if (fotoPerfilSalva && ftPerfilDiv) {
      ftPerfilDiv.style.backgroundImage = `url(${fotoPerfilSalva})`;
  }

  if (ftPerfilDiv && fileInput) {
      ftPerfilDiv.addEventListener('click', () => {
          fileInput.click();
      });
  }

  if (fileInput) {
      fileInput.addEventListener('change', (event) => {
          const file = event.target.files[0];

          if (file) {
              const reader = new FileReader();

              reader.onload = (e) => {
                  const dataUrl = e.target.result;

                  if (ftPerfilDiv) {
                      ftPerfilDiv.style.backgroundImage = `url(${dataUrl})`;
                  }
                  try {
                      localStorage.setItem('foto_perfil_base64', dataUrl);
                      console.log('Foto de perfil salva no localStorage.');
                  } catch (e) {
                      console.error('Erro ao salvar a foto de perfil no localStorage:', e);
                      alert('Não foi possível salvar a foto de perfil. O tamanho pode ser muito grande.');
                  }
              };
              reader.readAsDataURL(file);
          }
      });
  }

  const LOCAL_STORAGE_HIGHLIGHT_IMAGES_KEY = 'highlightImagesData';
  loadAndApplyImages('.img_destaque', LOCAL_STORAGE_HIGHLIGHT_IMAGES_KEY);
  setupImageListeners('.img_destaque', LOCAL_STORAGE_HIGHLIGHT_IMAGES_KEY);

  const LOCAL_STORAGE_HIGHLIGHT_IMAGES_P_KEY = 'highlightImagesPData';
  loadAndApplyImages('.img_destaque_p', LOCAL_STORAGE_HIGHLIGHT_IMAGES_P_KEY);
  setupImageListeners('.img_destaque_p', LOCAL_STORAGE_HIGHLIGHT_IMAGES_P_KEY);

  const LOCAL_STORAGE_HIGHLIGHT_IMAGES_C_KEY = 'highlightImagesCData';
  loadAndApplyImages('.img_destaque_c', LOCAL_STORAGE_HIGHLIGHT_IMAGES_C_KEY);
  setupImageListeners('.img_destaque_c', LOCAL_STORAGE_HIGHLIGHT_IMAGES_C_KEY);


   loadAndApplyBioData();

   const editarBioBtn = document.getElementById('editarBioBtn');
   const salvarBioBtn = document.getElementById('salvarBioBtn');
   const elementosEditaveisBio = [
       document.getElementById('nome_bio'),
       document.getElementById('genero_bio'),
       document.getElementById('idade_bio'),
       document.getElementById('estadocivil_bio'),
       document.getElementById('carreira_bio'),
       document.getElementById('formacao_bio')
   ].filter(el => el !== null);


   if(editarBioBtn && salvarBioBtn && elementosEditaveisBio.length > 0) {
       editarBioBtn.addEventListener('click', () => {
            elementosEditaveisBio.forEach(elemento => {
                 elemento.contentEditable = true;
                 elemento.style.border = '1px solid #ccc';
                 elemento.style.padding = '5px';
             });
            editarBioBtn.style.display = 'none';
            salvarBioBtn.style.display = 'inline-block';
       });

       salvarBioBtn.addEventListener('click', () => {
            saveBioData();

            elementosEditaveisBio.forEach(elemento => {
                 elemento.contentEditable = false;
                 elemento.style.border = 'none';
                 elemento.style.padding = '0';
             });
            salvarBioBtn.style.display = 'none';
            editarBioBtn.style.display = 'inline-block';
       });
   }



  loadAndApplyProjectNames();

  const projectNames = document.querySelectorAll('#projeto_nome');
  projectNames.forEach((projectNameElement, index) => {
      projectNameElement.addEventListener('click', () => {
          projectNameElement.contentEditable = true;
          projectNameElement.focus();
          const range = document.createRange();
          range.selectNodeContents(projectNameElement);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      });

      projectNameElement.addEventListener('blur', () => {
          projectNameElement.contentEditable = false;
          const currentName = projectNameElement.textContent;
          console.log(`Project name updated to: ${currentName}`);
          saveProjectName(index, currentName);
      });

      projectNameElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
               event.preventDefault();
               projectNameElement.contentEditable = false;
               const currentName = projectNameElement.textContent;
               console.log(`Project name updated to: ${currentName}`);
               saveProjectName(index, currentName);
          }
      });
  });


   loadAndApplyProjectTexts();

   const projectTexts = document.querySelectorAll('#project_text');
   projectTexts.forEach((projectTextElement, index) => {
       projectTextElement.addEventListener('input', () => {
           const currentText = projectTextElement.value;
           saveProjectText(index, currentText);
       });

       projectTextElement.addEventListener('blur', () => {
           const currentText = projectTextElement.value;
            saveProjectText(index, currentText);
       });
   });


   const dropdown = document.querySelector('.dropdown');
   const dropdownToggle = document.querySelector('.dropdown-toggle');
   const dropdownMenu = document.querySelector('.dropdown-menu');
   const dropdownItems = document.querySelectorAll('.dropdown-item');

   if (dropdownToggle) {
     dropdownToggle.addEventListener('click', () => {
       if(dropdown) dropdown.classList.toggle('open');
     });

     if(dropdownItems) {
         dropdownItems.forEach(item => {
           item.addEventListener('click', () => {
             if(dropdownToggle) dropdownToggle.textContent = item.textContent;
             if(dropdown) dropdown.classList.remove('open');
           });
         });
     }

     document.addEventListener('click', (event) => {
       if (dropdown && !dropdown.contains(event.target)) {
         dropdown.classList.remove('open');
       }
     });
   }

});