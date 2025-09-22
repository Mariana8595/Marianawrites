const translations = {
  es: {
      // NAV BAR
      inicio: 'Inicio',
      sobre_mi: 'Sobre mí',
      expertise: 'Expertise',
      mi_portafolio: 'Mi portafolio',
      contacto: 'Contacto',
      // SECCIÓN INICIO
      saludo: 'Hola, soy Mariana',
      presentacion_titulo: 'Profesional apasionada<br/>por transformar ideas<br/>complejas en historias<br/>claras y accesibles',
      presentacion_parrafo: 'Mi formación en humanidades y mi creciente interés por la investigación en UX me han llevado a desarrollar contenido que combina análisis riguroso con empatía hacia los usuarios.',
      boton_contacto: 'Conversemos sobre tus ideas',
      // SECCIÓN SOBRE MÍ
      sobre_mi_titulo: 'Sobre mí',
      sobre_mi_parrafo1: 'Soy una profesional con experiencia en investigación y creación de contenido escrito. Actualmente estudio Ingeniería en Desarrollo de Software, donde estoy ampliando mis habilidades hacia el desarrollo tecnológico con enfoque en inteligencia artificial, SaaS y lingüística aplicada. Me interesa colaborar en proyectos que valoren la claridad, el análisis riguroso y la empatía con los usuarios. Creo en la comunicación como puente entre personas y tecnología, y estoy construyendo un perfil que combine pensamiento crítico, curiosidad y aprendizaje constante.',
      sobre_mi_parrafo2: 'Si compartes el interés por la comunicación clara, la tecnología y la empatía con las personas usuarias, estaré encantada de colaborar contigo. Puedes escribirme o visitar mi portafolio para conocer más.',
      // SECCIÓN EXPERTISE
      expertise_titulo: 'Mi Expertise',
      escribir_titulo: 'Escribir',
      escribir_parrafo: 'Redacto textos claros, creativos y relevantes, ajustados a las necesidades del público y los objetivos del proyecto, ya sea en formato técnico, narrativo o reflexivo.',
      investigar_titulo: 'Investigar',
      investigar_parrafo: 'Llevo a cabo investigaciones rigurosas para comprender a fondo los temas, reunir datos relevantes y descubrir perspectivas que enriquecen el contenido con precisión y profundidad.',
      crear_titulo: 'Crear',
      crear_parrafo: 'Transformo ideas complejas en mensajes accesibles y comprensibles, equilibrando exactitud técnica con fluidez para una lectura agradable.',
      comunicar_titulo: 'Comunicar',
      comunicar_parrafo: 'Me enfoco en conectar con el lector mediante un estilo directo y envolvente, adaptando el tono y el formato para que la información resulte interesante y significativa.',
      // SECCIÓN CONTACTO
      contacto_titulo: 'Contacto',
      contacto_parrafo: '¿Tienes un proyecto en mente o alguna duda? Envíame un mensaje y te responderé lo antes posible.',
      label_nombre: 'Tu nombre completo',
      placeholder_nombre: 'John Doe',
      label_email: 'Correo electrónico',
      placeholder_email: 'tucorreo@ejemplo.com',
      label_mensaje: 'Mensaje',
      placeholder_mensaje: '¿En qué puedo ayudarte?',
      boton_enviar: 'Enviar mensaje',
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
      // SECCIÓN INICIO
      saludo: 'Hello, I\'m Mariana',
      presentacion_titulo: 'A passionate professional<br/>who transforms complex<br/>ideas into clear and<br/>accessible stories',
      presentacion_parrafo: 'My background in humanities and growing interest in UX research have led me to develop content that combines rigorous analysis with empathy for users.',
      boton_contacto: 'Let\'s talk about your ideas',
      // SECCIÓN SOBRE MÍ
      sobre_mi_titulo: 'About me',
      sobre_mi_parrafo1: 'I am a professional with experience in research and written content creation. I am currently studying Software Development Engineering, where I am expanding my skills in technological development with a focus on artificial intelligence, SaaS, and applied linguistics. I am interested in collaborating on projects that value clarity, rigorous analysis, and empathy with users. I believe in communication as a bridge between people and technology, and I am building a profile that combines critical thinking, curiosity, and constant learning.',
      sobre_mi_parrafo2: 'If you share an interest in clear communication, technology, and empathy with users, I would be delighted to collaborate with you. You can write to me or visit my portfolio to learn more.',
      // SECCIÓN EXPERTISE
      expertise_titulo: 'My Expertise',
      escribir_titulo: 'Writing',
      escribir_parrafo: 'I write clear, creative, and relevant texts, tailored to the needs of the audience and project goals, whether in a technical, narrative, or reflective format.',
      investigar_titulo: 'Research',
      investigar_parrafo: 'I conduct rigorous research to thoroughly understand topics, gather relevant data, and discover perspectives that enrich content with precision and depth.',
      crear_titulo: 'Creation',
      crear_parrafo: 'I transform complex ideas into accessible and understandable messages, balancing technical accuracy with fluency for a pleasant reading experience.',
      comunicar_titulo: 'Communication',
      comunicar_parrafo: 'I focus on connecting with the reader through a direct and engaging style, adapting the tone and format to make the information interesting and meaningful.',
      // SECCIÓN CONTACTO
      contacto_titulo: 'Contact',
      contacto_parrafo: 'Do you have a project in mind or any questions? Send me a message and I will reply as soon as possible.',
      label_nombre: 'Your full name',
      placeholder_nombre: 'John Doe',
      label_email: 'Email address',
      placeholder_email: 'youremail@example.com',
      label_mensaje: 'Message',
      placeholder_mensaje: 'How can I help you?',
      boton_enviar: 'Send message',
      // Dropdown portafolio
      estudio_caso: 'Case Study',
      historia_meso: 'History of Mesoamerica'
  }
};

// --- Lógica para el cambio de idioma ---
let currentLang = localStorage.getItem('lang') || 'es';
const langEsButton = document.getElementById('lang-es');
const langEnButton = document.getElementById('lang-en');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  
  document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang][key]) {
          element.innerHTML = translations[lang][key];
      }
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      if (translations[lang][key]) {
          element.placeholder = translations[lang][key];
      }
  });

  if (langEsButton && langEnButton) { // Solo si existen los botones de bandera
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

setLanguage(currentLang);

// --- CÓDIGO DE ANIMACIONES ---
const animElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('fade-in-visible');
  }
});
}, { threshold: 0.3 });

animElements.forEach(el => observer.observe(el));

// --- CÓDIGO DE EMAILJS ---
(function () {
emailjs.init({ publicKey: "SvKgDzMm89Q8tMCPG" });
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
event.preventDefault();

const parms = {
  from_name: document.getElementById("nombre").value,
  email_id: document.getElementById("email").value,
  message: document.getElementById("mensaje").value,
};

emailjs.send("service_6kogqnj", "template_ioyg4kp", parms)
  .then(() => {
    const alertMessage = currentLang === 'es' ? "✅ ¡Tu mensaje fue enviado exitosamente!" : "✅ Your message was sent successfully!";
    alert(alertMessage);
    document.getElementById("contact-form").reset();
  })
  .catch((error) => {
    console.error("Error al enviar:", error);
    const alertMessage = currentLang === 'es' ? "❌ Ocurrió un error al enviar el mensaje. Verifica la consola." : "❌ An error occurred while sending the message. Check the console.";
    alert(alertMessage);
  });
});