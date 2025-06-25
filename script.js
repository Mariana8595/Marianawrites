// Animaciones con IntersectionObserver
const animElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, {
  threshold: 0.3
});

animElements.forEach(el => observer.observe(el));

// EmailJS: inicialización
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
      alert("✅ ¡Tu mensaje fue enviado exitosamente!");
      document.getElementById("contact-form").reset();
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      alert("❌ Ocurrió un error al enviar el mensaje. Verifica la consola.");
    });
});



