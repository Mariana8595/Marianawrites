function enviar() {
    const input = document.getElementById("userInput");
    const texto = input.value.trim().toLowerCase();
    if (!texto) return;

    mostrarMensaje(input.value, "user"); // ← Mostramos tal cual lo escribió
    input.value = "";

    const respuesta = obtenerRespuesta(texto);
    setTimeout(() => mostrarMensaje(respuesta, "bot"), 200);
}

function mostrarMensaje(texto, tipo) {
    const div = document.createElement("div");
    div.classList.add("msg", tipo);

    // Usamos innerHTML para permitir enlaces y formatos
    div.innerHTML = texto;

    document.getElementById("messages").appendChild(div);

    const cont = document.getElementById("messages");
    cont.scrollTop = cont.scrollHeight;
}

function obtenerRespuesta(texto) {

    // --- SALUDOS ---
    const saludos = ["hola", "buenas", "qué tal", "que tal", "ola", "hi"];
    if (saludos.some(s => texto.includes(s))) {
        return "¡Hola! ¿En qué puedo ayudarte respecto al museo?";
    }

    // --- DESPEDIDAS ---
    const despedidas = ["adiós", "adios", "bye", "hasta luego", "nos vemos", "me voy"];
    if (despedidas.some(d => texto.includes(d))) {
        return "¡Hasta luego! Gracias por visitar Tlalli.";
    }

    // --- RESUMEN GENERAL DE SALAS ---
    if (texto.includes("salas") || texto.includes("resumen") || texto.includes("recorrido")) {
        return "El museo cuenta con salas permanentes dedicadas a la historia y diversidad cultural de México, incluyendo: Introducción a la Antropología, Poblamiento de América, Culturas del Norte, Mayas, Mexica, Oaxaca y más. Si quieres info de una sala específica, dime cuál.";
    }

    // --- EXPOSICIONES TEMPORALES ---
    if (texto.includes("exposición temporal") || texto.includes("expo temporal") || texto.includes("temporales")) {
        return `Puedes consultar las exposiciones temporales activas aquí:<br>
        <a href="https://www.mna.mx/exposiciones.html" target="_blank">Ver exposiciones</a>`;
    }

    // --- HORARIOS / COSTOS ---
    if (texto.includes("horario") || texto.includes("cost") || texto.includes("precio") || texto.includes("entrada")) {
        return "El museo abre de martes a domingo, de 9:00 a 18:00 h. La entrada general cuesta $95 MXN. Domingos gratis para residentes en México.";
    }

    // --- CÓMO LLEGAR ---
    if (texto.includes("cómo llegar") || texto.includes("como llegar") || texto.includes("ubicación") || texto.includes("direccion")) {
        return "Se ubica en Av. Paseo de la Reforma y Gandhi, Bosque de Chapultepec. Metro: Auditorio o Chapultepec. Metrobús: Gandhi.";
    }

    // --- SALAS ESPECÍFICAS ---
    if (texto.includes("sala mexica")) {
        return "La Sala Mexica alberga piezas emblemáticas como la Piedra del Sol y la Coatlicue, explicando la cosmovisión y estructura social del México-Tenochtitlan.";
    }

    if (texto.includes("sala maya")) {
        return "La Sala Maya presenta estelas, esculturas y objetos de Palenque, Bonampak y Yaxchilán. Destaca su calendario, escritura y arquitectura.";
    }

    // --- ACCESIBILIDAD ---
    if (texto.includes("accesibilidad") || texto.includes("discapacidad") || texto.includes("silla de ruedas") || texto.includes("rampa") || texto.includes("elevador")) {
        return "El museo ofrece préstamo de sillas de ruedas, rampas, elevadores y apoyo del personal en caso de requerir asistencia.";
    }

    // --- ESTACIONAMIENTO ---
    if (texto.includes("estacionamiento") || texto.includes("auto") || texto.includes("carro") || texto.includes("vehículo") || texto.includes("vehiculo")) {
        return "El estacionamiento funciona en el mismo horario del museo (9:00–18:00 h). Actualmente no tiene costo.";
    }

    // --- GUARDARROPA ---
    if (texto.includes("guardarropa") || texto.includes("locker") || texto.includes("casillero")) {
        return "El museo cuenta con guardarropa gratuito de 9:00 a 17:00 h y lockers disponibles por una cuota mínima.";
    }

    // --- TIENDA ---
    if (texto.includes("tienda") || texto.includes("souvenir") || texto.includes("regalo") || texto.includes("recuerdo")) {
        return "La tienda opera de martes a domingo, 10:00 a 18:00 h. Ofrece artesanías, réplicas y publicaciones.";
    }

    // --- CAFETERÍA ---
    if (texto.includes("cafetería") || texto.includes("cafeteria") || texto.includes("comida") || texto.includes("restaurante")) {
        return "La cafetería ofrece alimentos ligeros, bebidas y snacks todos los días que abre el museo.";
    }

    // --- BAÑOS ---
    if (texto.includes("baño") || texto.includes("baños") || texto.includes("sanitario") || texto.includes("wc")) {
        return "Hay sanitarios en el vestíbulo principal y en zonas cercanas a distintas salas.";
    }

    // --- VISITAS GUIADAS ---
    if (texto.includes("visita guiada") || texto.includes("guía") || texto.includes("guia") || texto.includes("tour")) {
        return "El museo ofrece visitas guiadas gratuitas según disponibilidad. Puedes solicitar información en el módulo de atención.";
    }

    // --- RESPUESTA POR DEFECTO ---
    return "No estoy segura de eso, pero puedo ayudarte con información del museo, sus servicios, salas o cómo llegar. Pregúntame lo que quieras 😊";
}

// --- ACTIVAR ENTER PARA ENVIAR ---
document.getElementById("userInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        enviar();
    }
});
 