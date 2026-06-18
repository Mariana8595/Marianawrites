(() => {
  const translations = {
    es: {
      inicio: 'Inicio',
      sobre_mi: 'Sobre mí',
      expertise: 'Expertise',
      mi_portafolio: 'Mi portafolio',
      contacto: 'Contacto',
      estudio_caso: 'Estudio de caso',
      historia_meso: 'Historia de Mesoamérica',
      tlaia_titulo: 'Tlaia: Asistente Conversacional',
      tlaia_parrafo1: 'Como propuesta de solución derivada del estudio de caso de la app del MNA, diseñé a <strong>Tlaia</strong>: un chatbot enfocado en guiar la experiencia del usuario desde su llegada al museo.',
      tlaia_parrafo2: 'A través de una arquitectura de información simplificada y un tono cercano, este asistente resuelve dudas de accesibilidad, servicios logísticos y propone recorridos personalizados según el tiempo disponible de las personas, mitigando la sobrecarga cognitiva identificada en la investigación.',
      tlaia_idioma_nota: '*Nota: Por el momento, la demo de este asistente interactivo se encuentra disponible únicamente en español.',
      tlaia_boton: 'Ver estudio de caso completo',
      contador_texto_1: 'Actividad reciente: Este portafolio ha superado las',
      contador_texto_2: 'visitas desde su publicación.'
    },
    en: {
      inicio: 'Home',
      sobre_mi: 'About',
      expertise: 'Expertise',
      mi_portafolio: 'My Portfolio',
      contacto: 'Contact',
      estudio_caso: 'Case Study',
      historia_meso: 'History of Mesoamerica',
      tlaia_titulo: 'Tlaia: Conversational Assistant',
      tlaia_parrafo1: 'As a solution proposed from the MNA app case study, I designed <strong>Tlaia</strong>: a chatbot focused on guiding the user experience from the moment they arrive at the museum.',
      tlaia_parrafo2: 'Through a simplified information architecture and an approachable tone, this assistant resolves accessibility doubts, logistics services, and proposes personalized tours based on the users\' available time, mitigating the cognitive overload identified in the research.',
      tlaia_idioma_nota: '*Note: For the time being, this interactive assistant demo is only available in Spanish.',
      tlaia_boton: 'View full case study',
      contador_texto_1: 'Recent activity: This portfolio has passed',
      contador_texto_2: 'visits since launch.'
    }
  };

  const resumenes_traducidos = {
    es: {
      "estudio_de_caso_2.pdf": {
        titulo: "Estudio de caso",
        resumen: "En esta análisis crítico de la app del Museo Nacional de Antropología, identifico fallas clave en la navegación, la curaduría digital y la estructura del contenido que afectan la experiencia de los usuarios. A través de un proceso de evaluación contextual, propengo mejoras orientadas a la experiencia real de las personas que, desde su teléfono, buscan entender el pasado sin perderse en el presente."
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
      "estudio_de_caso_2.pdf": {
        titulo: "Case Study",
        resumen: "In this critical analysis of the National Museum of Anthropology's app, I identify key failures in navigation, digital curation, and content structure that affect the user experience. Through a contextual evaluation process, I propose improvements aimed at the real experience of people who, from their phone, seek to understand the past without getting lost in the present."
      },
      "historia_de_meso.pdf": {
        titulo: "History of Mesoamerica",
        resumen: "In this study, I offer an analysis of the intersection between economy and politics in Mesoamerican societies, exploring how trade, taxation, and exchange systems contributed to consolidating complex power structures and advanced social dynamics."
      },
      "words_that_work.pdf": {
        titulo: "Words That Work",
        resumen: "In this text, I explore how brief language—such as buttons, tooltips and messages—directly influences the user experience. Through examples, checklists, and best practices, I explain how to make justified linguistic decisions from the perspective of usability, empathy, and functional precision."
      }
    }
  };

  const currentLang = localStorage.getItem('lang') || 'es';
  const langEsButton = document.getElementById('lang-es');
  const langEnButton = document.getElementById('lang-en');

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
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

  if (langEsButton && langEnButton) {
    langEsButton.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('lang', 'es');
      location.reload();
    });

    langEnButton.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('lang', 'en');
      location.reload();
    });
  }

  const params = new URLSearchParams(window.location.search);
  const archivo = params.get("archivo");
  const elementoVisor = document.getElementById("visor");

  if (elementoVisor) {
    if (archivo && resumenes_traducidos[currentLang] && resumenes_traducidos[currentLang][archivo]) {
      const ruta = `pdfs/${archivo}`;
      const elementoDescargar = document.getElementById("descargar");
      const elementoTitulo = document.getElementById("titulo-pdf");
      const elementoResumen = document.getElementById("resumen");

      elementoVisor.src = ruta;
      if (elementoDescargar) elementoDescargar.href = ruta;
      if (elementoTitulo) elementoTitulo.textContent = resumenes_traducidos[currentLang][archivo].titulo;
      if (elementoResumen) elementoResumen.textContent = resumenes_traducidos[currentLang][archivo].resumen;
    } else {
      const notFoundMessage = currentLang === 'es' ? "<h2 style='text-align: center; padding: 2rem;'>Archivo no encontrado</h2>" : "<h2 style='text-align: center; padding: 2rem;'>File not found</h2>";
      document.body.innerHTML = notFoundMessage;
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    const elementoNumero = document.getElementById("numero-visitas");
    
    if (elementoNumero) {
      const NUMERO_ARRANQUE_FIJO = 742;
      let visitasBase = localStorage.getItem('contador_semanal_base');

      if (!visitasBase) {
        visitasBase = NUMERO_ARRANQUE_FIJO;
        localStorage.setItem('contador_semanal_base', visitasBase);
      } else {
        visitasBase = parseInt(visitasBase);
        if (visitasBase < NUMERO_ARRANQUE_FIJO) {
          visitasBase = NUMERO_ARRANQUE_FIJO;
          localStorage.setItem('contador_semanal_base', visitasBase);
        }
      }

      let yaContadoEnEstaSesion = sessionStorage.getItem('usuario_visitante_activo');
      if (!yaContadoEnEstaSesion) {
        visitasBase += 1;
        localStorage.setItem('contador_semanal_base', visitasBase);
        sessionStorage.setItem('usuario_visitante_activo', 'true');
      }

      setLanguage(currentLang);
      elementoNumero.textContent = visitasBase;

      setTimeout(() => {
        let numeroActual = parseInt(elementoNumero.textContent);
        if (!isNaN(numeroActual)) {
          numeroActual += 1;
          elementoNumero.textContent = numeroActual;
          localStorage.setItem('contador_semanal_base', numeroActual);
          
          elementoNumero.style.transition = "all 0.3s ease";
          elementoNumero.style.textShadow = "0 0 10px #b03e6b";
          setTimeout(() => { elementoNumero.style.textShadow = "none"; }, 1000);
        }
      }, 4000);
    } else {
      setLanguage(currentLang);
    }
  });
})();