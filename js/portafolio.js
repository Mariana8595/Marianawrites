const translations = {
  es: {
      // NAV BAR
      inicio: 'Inicio',
      sobre_mi: 'Sobre mí',
      expertise: 'Expertise',
      mi_portafolio: 'Mi portafolio',
      contacto: 'Contacto',
      // Dropdown portafolio
      estudio_caso: 'Estudio de caso',
      historia_meso: 'Historia de Mesoamérica'
  },
  en: {
      // NAV BAR
      inicio: 'Home',
      sobre_mi: 'About',
      expertise: 'Expertise',
      mi_portafolio: 'My Portfolio',
      contacto: 'Contact',
      // Dropdown portafolio
      estudio_caso: 'Case Study',
      historia_meso: 'History of Mesoamerica'
  }
};

const resumenes_traducidos = {
  es: {
    "estudio_de_caso.pdf": {
      titulo: "Estudio de caso",
      resumen: "En esta análisis crítico de la app del Museo Nacional de Antropología, identifico fallas clave en la navegación, la curaduría digital y la estructura del contenido que afectan la experiencia de los usuarios. A través de un proceso de evaluación contextual, propongo mejoras orientadas a la experiencia real de las personas que, desde su teléfono, buscan entender el pasado sin perderse en el presente."
    },
    "historia_de_meso.pdf": {
      titulo: "Historia de Mesoamérica",
      resumen: "Este estudio ofrezco un análisis sobre la intersección entre economía y política en las sociedades mesoamericanas, explorando cómo el comercio, la tributación y los sistemas de intercambio contribuyeron a consolidar estructuras de poder complejas y dinámicas sociales avanzadas."
    },
    "words_that_work.pdf": {
      titulo: "Words That Work",
      resumen: "En este texto exploro cómo el lenguaje breve –como botones, tooltips y mensajes– influye directamente en la experiencia del usuario. A través de ejemplos, checklist y buenas prácticas, explico cómo tomar decisiones lingüísticas justificadas desde la usabilidad, la empatía y la precisión funcional."
    }
  },
  en: {
      "estudio_de_caso.pdf": {
          titulo: "Case Study",
          resumen: "In this critical analysis of the National Museum of Anthropology's app, I identify key failures in navigation, digital curation, and content structure that affect the user experience. Through a contextual evaluation process, I propose improvements aimed at the real experience of people who, from their phone, seek to understand the past without getting lost in the present."
      },
      "historia_de_meso.pdf": {
          titulo: "History of Mesoamerica",
          resumen: "In this study, I offer an analysis of the intersection between economy and politics in Mesoamerican societies, exploring how trade, taxation, and exchange systems contributed to consolidating complex power structures and advanced social dynamics."
      },
      "words_that_work.pdf": {
          titulo: "Words That Work",
          resumen: "In this text, I explore how brief language—such as buttons, tooltips, and messages—directly influences the user experience. Through examples, checklists, and best practices, I explain how to make justified linguistic decisions from the perspective of usability, empathy, and functional precision."
      }
  }
};

// --- Lógica para el cambio de idioma ---
const currentLang = localStorage.getItem('lang') || 'es';
const langEsButton = document.getElementById('lang-es');
const langEnButton = document.getElementById('lang-en');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  
  // Cambia el texto de todos los elementos con la marca `data-translate`
  document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang][key]) {
          element.innerHTML = translations[lang][key];
      }
  });

  if (langEsButton && langEnButton) {
      if (lang === 'es') {
          langEsButton.classList.add('active-lang');
          langEnButton.classList.remove('active-lang');
      } else {
          langEnButton.classList.add('active-lang');
          langEsButton.classList.remove('active-lang');
      }
  }
}

// Escuchar el clic de los botones de idioma
if (langEsButton && langEnButton) {
  langEsButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentLang !== 'es') {
          localStorage.setItem('lang', 'es');
          location.reload(); 
      }
  });

  langEnButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentLang !== 'en') {
          localStorage.setItem('lang', 'en');
          location.reload();
      }
  });
}

// Cuando la página carga por primera vez, aplica el idioma guardado
setLanguage(currentLang);

// --- CÓDIGO DEL VISOR DE PDF (actualizado) ---
const params = new URLSearchParams(window.location.search);
const archivo = params.get("archivo");

if (archivo && resumenes_traducidos[currentLang] && resumenes_traducidos[currentLang][archivo]) {
const ruta = `pdfs/${archivo}`;
document.getElementById("visor").src = ruta;
document.getElementById("descargar").href = ruta;

// Utiliza el diccionario de traducciones
document.getElementById("titulo-pdf").textContent = resumenes_traducidos[currentLang][archivo].titulo;
document.getElementById("resumen").textContent = resumenes_traducidos[currentLang][archivo].resumen;
} else {
// Manejo de errores bilingüe
const notFoundMessage = currentLang === 'es' ? "<h2 style='text-align: center; padding: 2rem;'>Archivo no encontrado</h2>" : "<h2 style='text-align: center; padding: 2rem;'>File not found</h2>";
document.body.innerHTML = notFoundMessage;
}