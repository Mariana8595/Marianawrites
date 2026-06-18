// Variable global para mantener la memoria del último tema hablado
let contextoConversacion = "";

function enviar() {
    const input = document.getElementById("userInput");
    const texto = input.value.trim().toLowerCase();
    if (!texto) return;

    mostrarMensaje(input.value, "user");
    input.value = "";

    const respuesta = obtenerRespuesta(texto);
    setTimeout(() => mostrarMensaje(respuesta, "bot"), 200);
}

// --- CONTENEDOR PARA LOS AVATARES Y MENSAJES ---
function mostrarMensaje(texto, tipo) {
    const contenedorMensaje = document.createElement("div");
    contenedorMensaje.classList.add("message-row");

    const divBurbuja = document.createElement("div");
    divBurbuja.classList.add("msg", tipo);
    divBurbuja.innerHTML = texto;

    contenedorMensaje.appendChild(divBurbuja);
    document.getElementById("messages").appendChild(contenedorMensaje);

    const cont = document.getElementById("messages");
    cont.scrollTop = cont.scrollHeight;
}

function obtenerRespuesta(texto) {
    // --- VARIANTES DE AFIRMACIÓN, NEGACIÓN Y ASENTIMIENTO ---
    const diceSi = texto === "sí" || texto === "si" || texto.includes("claro") || texto.includes("por favor") || texto === "va" || texto === "aceptar";
    const diceNo = texto === "no" || texto.includes("nel") || texto.includes("ahorita no") || texto === "nop";
    const diceOk = texto === "ok" || texto === "okay" || texto === "bueno" || texto === "gracias" || texto === "perfecto" || texto === "entendido" || texto === "va";
    const diceSalir = texto === "salir" || texto === "regresar" || texto === "inicio" || texto === "menú" || texto === "menu";

    // --- VARIABLES DE INTENCIONES GENERALES ---
    const quiereMasInfo = texto.includes("saber más") || texto.includes("mas de la pieza") || texto.includes("cuéntame más") || texto.includes("más información") || texto.includes("mas informacion") || texto.includes("info") || texto.includes("qué más") || texto.includes("que mas") || texto === "más" || texto === "mas";
    const quiereSaberComoLlegar = texto.includes("cómo llegar") || texto.includes("como llegar") || texto.includes("donde esta") || texto.includes("dónde está") || texto.includes("ubicación") || texto.includes("ubicacion");
    const esPrimeraVez = texto.includes("primera vez") || texto.includes("no conozco") || texto.includes("primer vez");

    // 1. SALUDOS (Corregido para romper el bucle infinito)
    const saludos = [
        "hola", "buenas", "qué tal", "que tal", "ola", "oli", "hi",
        "que onda", "qué onda", "holi", "holi crayoli",
        "hello", "hello!", "bonjour", "bonjour!", "que pedo", "qué pedo"
    ];

    if (saludos.some(s => texto === s || texto.startsWith(s + " ") || texto.endsWith(" " + s) || texto.includes(" " + s + " "))) {
        return "¡Hola de nuevo! Platícame, ¿en qué te puedo ayudar hoy respecto a tu visita al museo? 😊";
    }

    // 2. DESPEDIDAS DIRECTAS
    const despedidas = ["adiós", "adios", "bye", "hasta luego", "nos vemos", "me voy"];
    if (despedidas.some(d => texto.includes(d))) {
        contextoConversacion = "";
        return "¡Hasta pronto!<br>Que la palabra y el canto te guíen en tu camino.";
    }

    // 3. COMANDO DE SALIDA O REGRESO AL MENÚ
    if (diceSalir) {
        contextoConversacion = "";
        return "Hemos regresado al inicio.<br>¿Te gustaría buscar otra sala, revisar los horarios o prefieres planear un recorrido?";
    }

    // 4. MANEJO DE CONTEXTO: ONBOARDING (PRIMERA VEZ)
    if (esPrimeraVez) {
        contextoConversacion = "tiempo_recorrido";
        return "¿Cuánto tiempo tienes para recorrer el museo?<br>1. Una hora<br>2. Dos horas<br>3. Más tiempo";
    }

    if (contextoConversacion === "tiempo_recorrido") {
        if (texto.includes("una") || texto.includes("1") || texto.includes("poco")) {
            contextoConversacion = "fin_recorrido";
            return "Te recomiendo comenzar por las salas más representativas. Desde la entrada principal, avanza hacia el patio central, donde está el paraguas. Rodea por la derecha para ir a la Sala 2: Poblamiento de América.<br>¿Te gustaría saber algo más o prefieres iniciar tu visita?";
        }
        if (texto.includes("dos") || texto.includes("2") || texto.includes("algo")) {
            contextoConversacion = "fin_recorrido";
            return "Con dos horas puedes visitar la Sala Poblamiento de América y la Sala Mexica con calma. Avanza por el patio central derecho para iniciar tu recorrido.<br>¿Te puedo ayudar con alguna otra duda logística?";
        }
        if (texto.includes("más") || texto.includes("mas") || texto.includes("3") || texto.includes("mucho")) {
            contextoConversacion = "fin_recorrido";
            return "¡Excelente! Puedes recorrer la planta baja completa y subir a la planta alta para conocer las salas etnográficas. Comienza tu viaje ingresando a la Sala 1.<br>¿Te gustaría revisar el horario de la tienda o la cafetería antes de empezar?";
        }
    }

    if (contextoConversacion === "fin_recorrido") {
        if (diceOk || diceSi) {
            contextoConversacion = "";
            return "¡Excelente! Que disfrutes mucho el recorrido.<br>Si necesitas ubicar un servicio o pieza durante tu visita, aquí estaré. 😊";
        }
        if (diceNo) {
            contextoConversacion = "";
            return "¡Perfecto! Te dejo explorar las salas.<br>¡Buen viaje por la historia de México!";
        }
    }

    // 5. MANEJO DE CONTEXTO: PIEDRA DEL SOL
    if (quiereMasInfo && contextoConversacion === "piedra_del_sol") {
        contextoConversacion = "piedra_del_sol_extendido";
        return "La Piedra del Sol es un monolito olivino de más de 24 toneladas. Representa la concepción del tiempo y las eras de los mexicas.<br>¿Te gustaría profundizar más en su simbología?";
    }

    if (contextoConversacion === "piedra_del_sol_extendido") {
        if (diceSi || quiereMasInfo) {
            contextoConversacion = "";
            return `Para explorar los detalles de sus relieves, ingresa a <a href="https://mna.inah.gob.mx/" target="_blank">mna.inah.gob.mx</a>, revisa la sección "Colecciones" y haz clic en la "Sala Mexica".<br>¿Te puedo ayudar con alguna otra duda?`;
        }
        if (diceNo || diceOk) {
            contextoConversacion = "";
            return "¡Entendido! Podemos revisar otra cosa.<br>¿Te gustaría conocer los horarios, cómo llegar o prefieres buscar otra sala?";
        }
    }

    if (quiereSaberComoLlegar && (contextoConversacion === "piedra_del_sol" || contextoConversacion === "piedra_del_sol_extendido")) {
        contextoConversacion = "";
        return "La Sala Mexica se ubica en la planta baja, al fondo del patio central, justo detrás del paraguas. No tiene pierde.<br>¿Quieres consultar algo más?";
    }

    // 6. EXPOSICIONES TEMPORALES
    if (texto.includes("exposición") || texto.includes("expo") || texto.includes("temporales")) {
        contextoConversacion = "exposiciones";
        return `Actualmente la sección de exposiciones temporales está en actualización en la app.<br>Puedes consultar las muestras activas aquí: <a href="https://www.mna.mx/exposiciones.html" target="_blank">Ver exposiciones</a>`;
    }

    // 7. RESUMEN GENERAL DE SALAS
    if (texto.includes("salas") || texto.includes("resumen") || texto.includes("recorrido")) {
        return "Te recomiendo comenzar por las salas más representativas.<br>¿Quieres que te guíe a la Sala 2: Poblamiento de América?";
    }

    // 8. HORARIOS Y COSTOS
    if (texto.includes("horario") || texto.includes("abierto") || texto.includes("cierra")) {
        return "El MNA abre de martes a domingo, de 9:00 a 18:00 hrs.<br>Considera que el museo permanece cerrado los lunes.";
    }

    if (texto.includes("costo") || texto.includes("precio") || texto.includes("entrada") || texto.includes("boleto")) {
        return "La entrada general cuesta $95 MXN.<br>Los domingos la entrada es gratuita para residentes en México.";
    }

    // 9. CÓMO LLEGAR (General)
    if (texto.includes("cómo llegar") || texto.includes("como llegar") || texto.includes("ubicación") || texto.includes("direccion") || texto.includes("metro")) {
        return "Se ubica en Av. Paseo de la Reforma y Gandhi.<br>Puedes llegar por Metro (Auditorio o Chapultepec) o Metrobús (Gandhi).";
    }

    // 10. SALAS ESPECÍFICAS
    if (texto.includes("mexica") || texto.includes("piedra del sol") || texto.includes("sol")) {
        contextoConversacion = "piedra_del_sol";
        return "La Sala Mexica alberga piezas emblemáticas como la Piedra del Sol.<br>¿Te gustaría saber cómo llegar a esta sala o prefieres conocer más de la pieza?";
    }

    // 11. ACCESIBILIDAD
    if (texto.includes("accesibilidad") || texto.includes("discapacidad") || texto.includes("silla") || texto.includes("rampa") || texto.includes("elevador")) {
        return "Ofrecemos préstamo de sillas de ruedas, rampas y elevadores.<br>Puedes solicitar apoyo directo al personal del vestíbulo.";
    }

    // 12. ESTACIONAMIENTO
    if (texto.includes("estacionamiento") || texto.includes("auto") || texto.includes("carro") || texto.includes("vehículo") || texto.includes("vehiculo")) {
        return "El estacionamiento funciona de 9:00 a 18:00 h.<br>Actualmente este servicio no tiene costo para los visitantes.";
    }

    // 13. GUARDARROPA
    if (texto.includes("guardarropa") || texto.includes("locker") || texto.includes("casillero") || texto.includes("mochila")) {
        return "Contamos con guardarropa gratuito de 9:00 a 17:00 h.<br>Es obligatorio dejar mochilas pesadas antes de entrar.";
    }

    // 14. TIENDA
    if (texto.includes("tienda") || texto.includes("souvenir") || texto.includes("regalo") || texto.includes("recuerdo")) {
        return "La tienda opera de martes a domingo, de 10:00 a 18:00 h.<br>Encontrarás artesanías, réplicas oficiales y publicaciones.";
    }

    // 15. CAFETERÍA
    if (texto.includes("cafetería") || texto.includes("cafeteria") || texto.includes("comida") || texto.includes("restaurante") || texto.includes("cafe")) {
        return "La cafetería ofrece alimentos ligeros, bebidas y snacks.<br>Está abierta en el mismo horario de servicio del museo.";
    }

    // 16. BAÑOS
    if (texto.includes("baño") || texto.includes("baños") || texto.includes("sanitario") || texto.includes("wc")) {
        return "Hay sanitarios disponibles en el vestíbulo principal.<br>También encontrarás módulos de baños junto a las salas.";
    }

    // 17. VISITAS GUIADAS
    if (texto.includes("visita guiada") || texto.includes("guía") || texto.includes("guia") || texto.includes("tour")) {
        return "El museo ofrece visitas guiadas gratuitas según disponibilidad.<br>Puedes registrarte en el módulo de atención del vestíbulo.";
    }

    // --- RESPUESTA POR DEFECTO ---
    return "No estoy segura de eso, pero puedo ayudarte con información del museo, sus servicios, salas o cómo llegar. Pregúntame lo que quieras 😊";
}

// --- ACTIVAR ENTER E INTRO MÓVIL PARA ENVIAR ---
document.getElementById("userInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        enviar();
    }
});

// --- FUNCIÓN PARA DESVANECER LA PANTALLA DE INICIO ---
function iniciarChat() {
    const pantallaBienvenida = document.getElementById("chat-welcome");
    if (pantallaBienvenida) {
        pantallaBienvenida.classList.add("fade-out");
    }
}

// --- MENSAJE DE BIENVENIDA AUTOMÁTICO AL CARGAR LA PÁGINA ---
window.addEventListener("DOMContentLoaded", () => {
    contextoConversacion = "";

    // CORREGIDO: Género unificado a "personalizada" y espacio añadido para legibilidad
    const saludoInicial = "¡Hola, soy Tlaia! Tu guía personalizada.<br><br>¿Es tu primera vez en el MNA o buscas alguna sala o servicio específico? 😊";

    setTimeout(() => {
        mostrarMensaje(saludoInicial, "bot");
    }, 300);
});