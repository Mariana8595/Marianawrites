# Portafolio Profesional & Asistente Conversacional Tlaia

Espacio destinado al desarrollo y optimización del portafolio profesional de Mariana Vázquez, enfocado en el diseño de experiencias de contenido, usabilidad y desarrollo front-end responsivo. Este repositorio incluye casos de estudio técnicos y la demo interactiva del asistente de navegación de museos.

---

## 🚀 Características del Proyecto

* **Localización e Idioma (Bilingüe):** Implementación de un sistema de traducción dinámica en JavaScript que conmuta de forma fluida el idioma de la interfaz mediante diccionarios locales, preservando la sesión del usuario a través de almacenamiento local.
* **Componente de Tráfico Dinámico:** Contador analítico semanal basado en el almacenamiento de sesión para registrar accesos únicos y mitigar la sobrecarga de consultas en el entorno de desarrollo.
* **Demo Interactiva (Tlaia Chatbot):** Módulo conversacional aislado en un entorno seguro para simular la asistencia logística y de accesibilidad en entornos culturales (MNA).
* **Diseño Fluido y Responsivo:** Interfaces modulares basadas en Bootstrap y personalizadas mediante CSS nativo para garantizar legibilidad en dispositivos móviles.

---

## 🛠️ Stack Tecnológico

* **Lenguajes:** HTML5, CSS3, JavaScript (ES6+).
* **Frameworks y Librerías:** Bootstrap, Font Awesome, EmailJS (Integración de mensajería).
* **Entorno de Desarrollo:** Visual Studio Code, Live Server, Git/GitHub.

---

## 📂 Arquitectura de la Información

La estructura de archivos se diseñó de manera modular para separar la lógica de presentación de los flujos de interacción conversacional y de traducción:

* `/` (Raíz): Contiene los archivos de estructura estructural (`index.html`, `portafolio.html`, `tlaia.html`), hojas de estilo y activos visuales.
* `/js`: Directorio destinado a la lógica global del sitio.
  * `js/portafolio.js`: Centraliza el diccionario bilingüe y el cómputo del contador dentro de una función autoejecutable para evitar la polución del espacio global.
* `script.js`: Manejo exclusivo de animaciones e interacciones de la interfaz principal.
* `tlalli.js`: Lógica funcional de respuestas, flujos y estados del chatbot.

---

## 🔧 Instalación y Ejecución Local

Para visualizar y realizar pruebas locales sobre este repositorio:

1. Clona este proyecto de forma local:
   ```bash
   git clone [https://github.com/Mariana8595/Portfolio_3.git](https://github.com/Mariana8595/Portfolio_3.git)
