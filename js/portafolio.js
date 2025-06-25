const params = new URLSearchParams(window.location.search);
const archivo = params.get("archivo");

const resumenes = {
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
};

if (archivo && resumenes[archivo]) {
  const ruta = `pdfs/${archivo}`;
  document.getElementById("visor").src = ruta;
  document.getElementById("descargar").href = ruta;
  document.getElementById("titulo-pdf").textContent = resumenes[archivo].titulo;
  document.getElementById("resumen").textContent = resumenes[archivo].resumen;
} else {
  document.body.innerHTML = "<h2 style='text-align: center; padding: 2rem;'>Archivo no encontrado</h2>";
}
