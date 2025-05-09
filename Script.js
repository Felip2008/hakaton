// Script.js - Código Completo com Persistência no LocalStorage

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
const LOCAL_STORAGE_THEME_KEY = 'modoEscuroAtivado'; // Key for localStorage

// Function to apply the theme (light or dark)
function aplicarTema(isDarkMode) {
  const box1 = document.querySelector('.box1');
  const box2 = document.querySelector('.box2');
  const textos = document.querySelectorAll('.texto');
  const navbar = document.querySelector('.navbar');

  if (box1 && box2 && textos) { // Check if elements exist
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
               // Restaura a cor inicial salva ou usa a cor inicial padrão do texto
              texto.style.color = initialTextColors[texto] || coresIniciais.text;
          });
          if (navbar) {
              navbar.setAttribute('data-bs-theme', 'light'); // Or whatever your initial theme was
          }
      }
  }
}

// Function triggered by the switch
function mudaracor() {
  const chaveSeletora = document.getElementById('switch-shadow');
  if (chaveSeletora) {
      const isDarkMode = chaveSeletora.checked;

      // Apply the theme based on the switch state
      aplicarTema(isDarkMode);

      // --- Save the preference to localStorage ---
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDarkMode);
  }
}

// --- Persistent Highlight Images ---
const LOCAL_STORAGE_HIGHLIGHT_IMAGES_KEY = 'highlightImagesData'; // Key for localStorage

// Function to save highlight image data to localStorage
function saveHighlightImageData(index, dataUrl) {
  const savedImages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HIGHLIGHT_IMAGES_KEY)) || {};
  savedImages[index] = dataUrl;
  localStorage.setItem(LOCAL_STORAGE_HIGHLIGHT_IMAGES_KEY, JSON.stringify(savedImages));
}

// Function to load and apply highlight image data from localStorage
function loadAndApplyHighlightImages() {
  const savedImages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HIGHLIGHT_IMAGES_KEY));
  if (savedImages) {
      const imagens = document.querySelectorAll('.img_destaque');
      imagens.forEach((img, index) => {
          if (savedImages[index]) {
              img.src = savedImages[index];
          }
      });
  }
}


// --- Persistent Project Names ---
const LOCAL_STORAGE_PROJECT_NAMES_KEY = 'projectNames'; // Key for localStorage

// Function to save project name data to localStorage
function saveProjectName(index, name) {
  const savedNames = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_NAMES_KEY)) || {};
  savedNames[index] = name;
  localStorage.setItem(LOCAL_STORAGE_PROJECT_NAMES_KEY, JSON.stringify(savedNames));
}

// Function to load and apply project name data from localStorage
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

// --- Persistent Project Texts ---
const LOCAL_STORAGE_PROJECT_TEXTS_KEY = 'projectTexts'; // Key for localStorage

// Function to save project text data to localStorage
function saveProjectText(index, text) {
  const savedTexts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_TEXTS_KEY)) || {};
  savedTexts[index] = text;
  localStorage.setItem(LOCAL_STORAGE_PROJECT_TEXTS_KEY, JSON.stringify(savedTexts));
}

// Function to load and apply project text data from localStorage
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


// --- Persistent Bio Data ---
const LOCAL_STORAGE_BIO_KEY = 'bioData'; // Key for localStorage

// Function to save bio data to localStorage
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

// Function to load and apply bio data from localStorage
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


// --- Executar ao carregar a página (DOMContentLoaded é preferível a window.onload) ---
document.addEventListener('DOMContentLoaded', () => {

  // --- Modo Escuro: Carregar preferência salva e adicionar listener ---
  const chaveSeletora = document.getElementById('switch-shadow');
  const textos = document.querySelectorAll('.texto');

  // Salvar as cores iniciais do texto na primeira carga
   if (Object.keys(initialTextColors).length === 0) {
      textos.forEach(texto => {
          initialTextColors[texto] = window.getComputedStyle(texto).color;
      });
  }

  const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  if (savedTheme !== null) { // Se houver uma preferência salva
      const isDarkModeSaved = savedTheme === 'true'; // localStorage armazena como string

      // Define o estado do switch e aplica o tema salvo
      if(chaveSeletora) chaveSeletora.checked = isDarkModeSaved;
      aplicarTema(isDarkModeSaved);
  } else {
       // Apply default theme (light) if no preference is saved
       aplicarTema(false);
       // O switch já deve estar no estado inicial (desmarcado) por padrão no HTML
  }

  // Add the event listener for the switch
  if (chaveSeletora) {
      chaveSeletora.addEventListener('change', mudaracor);
  }


  // --- Foto de Perfil: Carregar salva e adicionar listeners ---
  const ftPerfilDiv = document.getElementById('ft_perfil');
  const fileInput = document.getElementById('fileInput');

  // Carregar a foto de perfil salva ao carregar a página
  const fotoPerfilSalva = localStorage.getItem('foto_perfil_base64');
  if (fotoPerfilSalva && ftPerfilDiv) {
      ftPerfilDiv.style.backgroundImage = `url(${fotoPerfilSalva})`;
  }

  // Adicionar o listener de evento para o clique na div da foto de perfil
  if (ftPerfilDiv && fileInput) {
      ftPerfilDiv.addEventListener('click', () => {
          fileInput.click();
      });
  }

  // Adicionar o listener de evento para quando um arquivo for selecionado para a foto de perfil
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

                  // Salvar a Data URL no localStorage
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


  // --- Imagens de Destaque: Carregar salvas e adicionar listeners ---
  loadAndApplyHighlightImages(); // Load saved images on page load

  const imagensDestaque = document.querySelectorAll('.img_destaque');
  imagensDestaque.forEach((img, index) => {
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
                      img.src = dataUrl; // Update the image source

                      // --- Save the Data URL and image index to localStorage ---
                      saveHighlightImageData(index, dataUrl);

                  };
                  reader.readAsDataURL(file);
              }
          });
          input.click();
      });
  });


  // --- Bio Data: Carregar salva e adicionar listeners ---
   loadAndApplyBioData(); // Carrega os dados da bio salvos ao carregar a página

   const editarBioBtn = document.getElementById('editarBioBtn');
   const salvarBioBtn = document.getElementById('salvarBioBtn');
   const elementosEditaveisBio = document.querySelectorAll('.texto'); // Seleciona elementos da bio (ajustar se a classe 'texto' for mais ampla)


   if(editarBioBtn && salvarBioBtn && elementosEditaveisBio.length > 0) {
       editarBioBtn.addEventListener('click', () => {
            elementosEditaveisBio.forEach(elemento => {
                // Considerar apenas elementos da bio para edição
                 if (elemento.id.includes('_bio')) {
                     elemento.contentEditable = true;
                     // Adicionar borda para indicar que é editável (opcional)
                     elemento.style.border = '1px solid #ccc';
                     elemento.style.padding = '5px'; // Adicionar padding para a borda não grudar no texto
                 }
            });
            editarBioBtn.style.display = 'none';
            salvarBioBtn.style.display = 'inline-block';
       });

       salvarBioBtn.addEventListener('click', () => {
            saveBioData(); // Salvar dados da bio

            elementosEditaveisBio.forEach(elemento => {
                 if (elemento.id.includes('_bio')) {
                     elemento.contentEditable = false;
                     // Remover borda (opcional)
                     elemento.style.border = 'none';
                     elemento.style.padding = '0'; // Remover padding
                 }
            });
            salvarBioBtn.style.display = 'none';
            editarBioBtn.style.display = 'inline-block';
       });
   }


  // --- Project Names: Carregar salvos e adicionar listeners ---
  loadAndApplyProjectNames(); // Load saved project names

  const projectNames = document.querySelectorAll('#projeto_nome'); // Select all elements with id 'projeto_nome'
  projectNames.forEach((projectNameElement, index) => {
      projectNameElement.addEventListener('click', () => {
          projectNameElement.contentEditable = true;
          projectNameElement.focus();
           // Optional: Select all text when focusing
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

          // Save the updated name to localStorage
          saveProjectName(index, currentName);
      });

       // Optional: Save on Enter key as well
      projectNameElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
               event.preventDefault(); // Prevent newline
               projectNameElement.contentEditable = false;
               const currentName = projectNameElement.textContent;
               console.log(`Project name updated to: ${currentName}`);

               // Save the updated name to localStorage
               saveProjectName(index, currentName);
          }
      });
  });


  // --- Project Texts: Carregar salvos e adicionar listeners ---
   loadAndApplyProjectTexts(); // Load saved project texts

   const projectTexts = document.querySelectorAll('#project_text'); // Select all elements with id 'project_text'
   projectTexts.forEach((projectTextElement, index) => {
       // Use 'input' event for textareas to save as the user types
       projectTextElement.addEventListener('input', () => {
           const currentText = projectTextElement.value;
           // Save the updated text to localStorage on input
           saveProjectText(index, currentText);
       });

       // Optional: Save on blur as a fallback
       projectTextElement.addEventListener('blur', () => {
           const currentText = projectTextElement.value;
            saveProjectText(index, currentText);
       });
   });


  // --- Outras lógicas (como o dropdown) ---
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

// Removida a seção window.onload duplicada e com listeners no lugar errado.
// Toda a lógica de inicialização e listeners deve estar dentro do DOMContentLoaded.