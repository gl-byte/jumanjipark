// Encuentra el formulario «Prepara tu consulta» para controlar lo que ocurre al enviarlo.
const formulario = document.getElementById("formulario");
// Encuentra la lista «Servicio de interés» para leer o cambiar la opción elegida.
const solicitud = document.getElementById("solicitud");
// Encuentra la lista «Tipo de evento» para sugerir el evento que corresponde al servicio.
const tipoEvento = document.getElementById("evento");
// Empieza la lista de juegos, eventos, paquetes y combinaciones; cada uno tiene un nombre y una página para
// revisarlo.
const servicios = {
  // Reconoce la consulta que reúne los juegos elegidos en Mi combo.
  "combo-personalizado": {
    // Usa este nombre para el resumen y el mensaje de WhatsApp.
    "label": "Mi combo personalizado",
    // Permite volver a revisar y editar todos los juegos elegidos.
    "url": "combo.html#mi-combo"
  // Termina los datos de la consulta del combo.
  },
  // Empieza la información de «Cotización personalizada»; «cotizacion-general» permite reconocer esta elección al
  // abrir Contacto.
  "cotizacion-general": {
    // Guarda «Cotización personalizada» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Cotización personalizada",
    // Guarda el enlace para revisar «Cotización personalizada» en la página Alquiler, en la explicación para
    // cotizar.
    "url": "alquiler.html#cotizacion"
  // Termina la información de «Cotización personalizada».
  },
  // Empieza la información de «Inflables»; «juego-inflables» permite reconocer esta elección al abrir Contacto.
  "juego-inflables": {
    // Guarda «Inflables» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Inflables",
    // Guarda el enlace para revisar «Inflables» en la página Juegos, en «inflables».
    "url": "juegos.html#inflables"
  // Termina la información de «Inflables».
  },
  // Empieza la información de «Toro mecánico»; «juego-toro-mecanico» permite reconocer esta elección al abrir
  // Contacto.
  "juego-toro-mecanico": {
    // Guarda «Toro mecánico» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Toro mecánico",
    // Guarda el enlace para revisar «Toro mecánico» en la página Juegos, en «toro mecanico».
    "url": "juegos.html#toro-mecanico"
  // Termina la información de «Toro mecánico».
  },
  // Empieza la información de «Carruseles»; «juego-carruseles» permite reconocer esta elección al abrir Contacto.
  "juego-carruseles": {
    // Guarda «Carruseles» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Carruseles",
    // Guarda el enlace para revisar «Carruseles» en la página Juegos, en «carruseles».
    "url": "juegos.html#carruseles"
  // Termina la información de «Carruseles».
  },
  // Empieza la información de «Camas elásticas»; «juego-camas-elasticas» permite reconocer esta elección al abrir
  // Contacto.
  "juego-camas-elasticas": {
    // Guarda «Camas elásticas» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Camas elásticas",
    // Guarda el enlace para revisar «Camas elásticas» en la página Juegos, en «camas elasticas».
    "url": "juegos.html#camas-elasticas"
  // Termina la información de «Camas elásticas».
  },
  // Empieza la información de «Futbolines»; «juego-futbolines» permite reconocer esta elección al abrir Contacto.
  "juego-futbolines": {
    // Guarda «Futbolines» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Futbolines",
    // Guarda el enlace para revisar «Futbolines» en la página Juegos, en «futbolines».
    "url": "juegos.html#futbolines"
  // Termina la información de «Futbolines».
  },
  // Empieza la información de «Carritos»; «juego-carritos» permite reconocer esta elección al abrir Contacto.
  "juego-carritos": {
    // Guarda «Carritos» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Carritos",
    // Guarda el enlace para revisar «Carritos» en la página Juegos, en «carritos».
    "url": "juegos.html#carritos"
  // Termina la información de «Carritos».
  },
  // Empieza la información de «Otros juegos»; «juego-otros-juegos» permite reconocer esta elección al abrir
  // Contacto.
  "juego-otros-juegos": {
    // Guarda «Otros juegos» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Otros juegos",
    // Guarda el enlace para revisar «Otros juegos» en la página Juegos, en «otros juegos».
    "url": "juegos.html#otros-juegos"
  // Termina la información de «Otros juegos».
  },
  // Empieza la información de «Cumpleaños»; «evento-cumpleanos» permite reconocer esta elección al abrir Contacto.
  "evento-cumpleanos": {
    // Guarda «Cumpleaños» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Cumpleaños",
    // Guarda el enlace para revisar «Cumpleaños» en la página Eventos, en «cumpleanos».
    "url": "eventos.html#cumpleanos",
    // Recomienda «Cumpleaños» como tipo de evento cuando se elige «Cumpleaños».
    "event": "Cumpleaños"
  // Termina la información de «Cumpleaños».
  },
  // Empieza la información de «Colegios»; «evento-colegios» permite reconocer esta elección al abrir Contacto.
  "evento-colegios": {
    // Guarda «Colegios» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Colegios",
    // Guarda el enlace para revisar «Colegios» en la página Eventos, en «colegios».
    "url": "eventos.html#colegios",
    // Recomienda «Evento escolar» como tipo de evento cuando se elige «Colegios».
    "event": "Evento escolar"
  // Termina la información de «Colegios».
  },
  // Empieza la información de «Eventos infantiles»; «evento-infantiles» permite reconocer esta elección al abrir
  // Contacto.
  "evento-infantiles": {
    // Guarda «Eventos infantiles» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Eventos infantiles",
    // Guarda el enlace para revisar «Eventos infantiles» en la página Eventos, en «infantiles».
    "url": "eventos.html#infantiles",
    // Recomienda «Evento infantil» como tipo de evento cuando se elige «Eventos infantiles».
    "event": "Evento infantil"
  // Termina la información de «Eventos infantiles».
  },
  // Empieza la información de «Eventos empresariales»; «evento-empresariales» permite reconocer esta elección al
  // abrir Contacto.
  "evento-empresariales": {
    // Guarda «Eventos empresariales» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Eventos empresariales",
    // Guarda el enlace para revisar «Eventos empresariales» en la página Eventos, en «empresariales».
    "url": "eventos.html#empresariales",
    // Recomienda «Evento empresarial» como tipo de evento cuando se elige «Eventos empresariales».
    "event": "Evento empresarial"
  // Termina la información de «Eventos empresariales».
  },
  // Empieza la información de «Fiestas y celebraciones»; «evento-celebraciones» permite reconocer esta elección al
  // abrir Contacto.
  "evento-celebraciones": {
    // Guarda «Fiestas y celebraciones» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Fiestas y celebraciones",
    // Guarda el enlace para revisar «Fiestas y celebraciones» en la página Eventos, en «celebraciones».
    "url": "eventos.html#celebraciones",
    // Recomienda «Fiesta o celebración» como tipo de evento cuando se elige «Fiestas y celebraciones».
    "event": "Fiesta o celebración"
  // Termina la información de «Fiestas y celebraciones».
  },
  // Empieza la información de «Paquete Esencial»; «paquete-esencial» permite reconocer esta elección al abrir
  // Contacto.
  "paquete-esencial": {
    // Guarda «Paquete Esencial» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Paquete Esencial",
    // Guarda el enlace para revisar «Paquete Esencial» en la página Alquiler, en «paquete esencial».
    "url": "alquiler.html#paquete-esencial"
  // Termina la información de «Paquete Esencial».
  },
  // Empieza la información de «Paquete Diversión»; «paquete-diversion» permite reconocer esta elección al abrir
  // Contacto.
  "paquete-diversion": {
    // Guarda «Paquete Diversión» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Paquete Diversión",
    // Guarda el enlace para revisar «Paquete Diversión» en la página Alquiler, en «paquete diversion».
    "url": "alquiler.html#paquete-diversion"
  // Termina la información de «Paquete Diversión».
  },
  // Empieza la información de «Paquete Gran Evento»; «paquete-gran-evento» permite reconocer esta elección al
  // abrir Contacto.
  "paquete-gran-evento": {
    // Guarda «Paquete Gran Evento» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Paquete Gran Evento",
    // Guarda el enlace para revisar «Paquete Gran Evento» en la página Alquiler, en «paquete gran evento».
    "url": "alquiler.html#paquete-gran-evento"
  // Termina la información de «Paquete Gran Evento».
  },
  // Empieza la información de «Pequeños exploradores»; «combinacion-infantil» permite reconocer esta elección al
  // abrir Contacto.
  "combinacion-infantil": {
    // Guarda «Pequeños exploradores» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Pequeños exploradores",
    // Guarda el enlace para revisar «Pequeños exploradores» en la página Alquiler, en «combinacion infantil».
    "url": "alquiler.html#combinacion-infantil",
    // Recomienda «Evento infantil» como tipo de evento cuando se elige «Pequeños exploradores».
    "event": "Evento infantil"
  // Termina la información de «Pequeños exploradores».
  },
  // Empieza la información de «Familia en juego»; «combinacion-familiar» permite reconocer esta elección al abrir
  // Contacto.
  "combinacion-familiar": {
    // Guarda «Familia en juego» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Familia en juego",
    // Guarda el enlace para revisar «Familia en juego» en la página Alquiler, en «combinacion familiar».
    "url": "alquiler.html#combinacion-familiar",
    // Recomienda «Fiesta o celebración» como tipo de evento cuando se elige «Familia en juego».
    "event": "Fiesta o celebración"
  // Termina la información de «Familia en juego».
  },
  // Empieza la información de «Desafío en equipo»; «combinacion-equipos» permite reconocer esta elección al abrir
  // Contacto.
  "combinacion-equipos": {
    // Guarda «Desafío en equipo» como el nombre que se muestra en el resumen y en el mensaje de WhatsApp.
    "label": "Desafío en equipo",
    // Guarda el enlace para revisar «Desafío en equipo» en la página Alquiler, en «combinacion equipos».
    "url": "alquiler.html#combinacion-equipos",
    // Recomienda «Evento empresarial» como tipo de evento cuando se elige «Desafío en equipo».
    "event": "Evento empresarial"
  // Termina la información de «Desafío en equipo».
  }
// Termina la lista completa de servicios disponibles para preparar una consulta.
};

// Lee la información que acompaña al enlace de Contacto, como el juego o paquete desde el que llegó la persona.
const parametros = new URLSearchParams(window.location.search);
// Busca el servicio indicado en el enlace y lo guarda como el interés inicial de la consulta.
const interes = parametros.get("interes");

// Comprueba que el enlace incluya un servicio y que ese servicio exista en la lista de Jumanvi.
if (interes && Object.hasOwn(servicios, interes)) {
  // Selecciona automáticamente en «Servicio de interés» la opción recibida desde la página anterior.
  solicitud.value = interes;
// Termina la selección inicial del servicio recibido en el enlace.
}

// Busca si el enlace también indica un tipo de evento.
const eventoRecibido = parametros.get("evento");

// Si no se pidió otro servicio válido, presenta el combo que ya se eligió en el catálogo.
if (!Object.hasOwn(servicios, interes) && (window.JumanviCombo?.obtener().length || 0) > 0) {
  // Elige la consulta de varios juegos sin borrar los datos personales del formulario.
  solicitud.value = "combo-personalizado";
// Termina la elección inicial de la consulta del combo.
}

// Revisa las opciones de «Tipo de evento» para comprobar que el evento recibido se pueda elegir.
const eventoValido = Array.from(tipoEvento.options).some(
  // Compara cada opción con el evento del enlace; basta que una coincida para aceptarlo.
  (opcion) => opcion.value === eventoRecibido
// Termina la revisión de las opciones para saber si el evento del enlace es válido.
);

// Usa el evento del enlace solo si está presente y coincide con una opción del formulario.
if (eventoRecibido && eventoValido) {
  // Marca en «Tipo de evento» la elección válida recibida desde el enlace.
  tipoEvento.value = eventoRecibido;
// Si no llegó un evento válido, comprueba si el servicio elegido tiene uno recomendado.
} else if (servicios[solicitud.value].event) {
  // Selecciona el evento recomendado para el servicio elegido.
  tipoEvento.value = servicios[solicitud.value].event;
// Termina la elección inicial del tipo de evento.
}

// Reúne las acciones que muestran el servicio elegido y preparan el enlace para volver a revisarlo.
function actualizarSeleccion() {
  // Obtiene el nombre, la página y el evento recomendado del servicio que está seleccionado.
  const servicio = servicios[solicitud.value];
  // Encuentra la frase del resumen y prepara su nuevo texto.
  document.getElementById("seleccion-texto").textContent =
    // Escribe «Estás consultando:» seguido del nombre del servicio elegido y un punto final.
    "Estás consultando: " + servicio.label + ".";
  // Encuentra el enlace del resumen que permite volver a revisar la elección.
  const volver = document.getElementById("volver-seleccion");
  // Hace que ese enlace lleve a la página y al apartado del servicio elegido.
  volver.href = window.JumanviCombo ? window.JumanviCombo.conSeleccion(servicio.url) : servicio.url;
  // Escribe «Revisar», el nombre del servicio en minúsculas y una flecha en el enlace de regreso.
  volver.textContent = "Revisar " + servicio.label.toLowerCase() + " →";
// Termina las acciones que actualizan el resumen y el enlace de regreso.
}

// Actualiza la frase de la consulta y el enlace para revisar el servicio.
actualizarSeleccion();

// Espera a que la persona cambie «Servicio de interés» para actualizar el resumen y sugerir un evento.
solicitud.addEventListener("change", function () {
  // Obtiene el nombre, la página y el evento recomendado del servicio que está seleccionado.
  const servicio = servicios[solicitud.value];
  // Comprueba si el nuevo servicio tiene un tipo de evento recomendado.
  if (servicio.event) {
    // Marca el tipo de evento recomendado para esa nueva elección.
    tipoEvento.value = servicio.event;
  // Termina la comprobación del evento recomendado para la nueva elección.
  }
  // Actualiza la frase de la consulta y el enlace para revisar el servicio.
  actualizarSeleccion();
// Termina la respuesta al cambio de «Servicio de interés».
});

// Revisa uno por uno los campos obligatorios «Nombre», «Teléfono» y «Mensaje».
for (const id of ["nombre", "telefono", "mensaje"]) {
  // Encuentra el campo obligatorio que se está revisando en esta vuelta.
  const campo = document.getElementById(id);
  // Espera a que la persona escriba en este campo para retirar un aviso de error anterior.
  campo.addEventListener("input", function () {
    // Borra el aviso de error propio de este campo; el navegador todavía comprueba que no falten los datos
    // obligatorios.
    campo.setCustomValidity("");
  // Termina la acción que borra el aviso anterior cuando se vuelve a escribir.
  });
// Termina la preparación de los avisos para los tres campos obligatorios.
}

// Empieza las acciones del botón «Enviar por WhatsApp»: revisar los campos, armar el mensaje y abrir el chat.
formulario.addEventListener("submit", function (eventoEnvio) {
  // Evita que el formulario abra su enlace directamente; primero se reúnen todos sus datos en un solo mensaje.
  eventoEnvio.preventDefault();

  // Revisa uno por uno los campos obligatorios «Nombre», «Teléfono» y «Mensaje».
  for (const id of ["nombre", "telefono", "mensaje"]) {
    // Encuentra el campo obligatorio que se está revisando en esta vuelta.
    const campo = document.getElementById(id);
    // Comprueba que el campo no esté vacío ni contenga solo espacios; si falta texto, muestra «Completa este
    // campo».
    campo.setCustomValidity(campo.value.trim() ? "" : "Completa este campo.");
  // Termina la revisión de espacios y datos vacíos en los tres campos obligatorios.
  }

  // Comprueba todos los campos y muestra los avisos del navegador si falta un dato o el correo no tiene una forma
  // válida.
  // Revisa que Mi combo tenga al menos un juego cuando esa es la consulta elegida.
  revisarCombo();

  if (!formulario.reportValidity()) {
    // Detiene este envío mientras haya un campo incorrecto, sin abrir WhatsApp.
    return;
  // Termina la comprobación que detiene el envío si hay campos incorrectos.
  }

  // Prepara una forma de leer cualquier campo quitando los espacios sobrantes al principio y al final.
  const leer = (id) => document.getElementById(id).value.trim();
  // Obtiene el nombre, la página y el evento recomendado del servicio que está seleccionado.
  const servicio = servicios[solicitud.value];
  // Lee el día elegido en «Fecha estimada».
  const fecha = leer("fecha");
  // Presenta la fecha en orden día/mes/año; si no se eligió una fecha, escribe «Por definir».
  const fechaVisible = fecha ? fecha.split("-").reverse().join("/") : "Por definir";
  // Empieza a reunir las líneas del mensaje que se mostrará en WhatsApp.
  const consulta = [
    // Añade el saludo inicial y explica que se solicita una cotización.
    "Hola Jumanvi, quiero solicitar una cotización.",
    // Deja una línea vacía entre el saludo y los datos de la consulta.
    "",
    // Añade el nombre del juego, evento, paquete o combinación elegidos.
    "Servicio de interés: " + servicio.label,
    // Añade la página y el apartado del servicio como referencia para identificar la solicitud.
    "Referencia: " + servicio.url,
    // Adjunta el nombre y la cantidad de cada juego elegido, también al consultar un paquete o evento.
    ...(window.JumanviCombo?.lineasMensaje() || []),
    // Añade el nombre escrito en el formulario.
    "Nombre: " + leer("nombre"),
    // Añade el teléfono escrito por la persona que consulta.
    "Teléfono: " + leer("telefono"),
    // Añade el correo o escribe «No indicado» si se dejó vacío.
    "Correo: " + (leer("correo") || "No indicado"),
    // Añade el evento elegido o escribe «Por definir» si no hay una elección.
    "Tipo de evento: " + (leer("evento") || "Por definir"),
    // Añade la fecha ya ordenada para su lectura, o la indicación «Por definir».
    "Fecha estimada: " + fechaVisible,
    // Añade la cantidad de invitados o escribe «Por definir» si todavía no se indicó.
    "Invitados: " + (leer("invitados") || "Por definir"),
    // Añade la duración elegida o escribe «Por definir» si no hay un horario aproximado.
    "Duración: " + (leer("duracion") || "Por definir"),
    // Añade el lugar escrito o «Por definir» si aún no está decidido.
    "Lugar: " + (leer("lugar") || "Por definir"),
    // Deja una línea vacía entre los datos del evento y el mensaje personal.
    "",
    // Añade el encabezado «Mensaje:» antes de los detalles personales de la consulta.
    "Mensaje:",
    // Añade el texto completo que se escribió en la caja «Mensaje».
    leer("mensaje")
  // Une todas las partes y coloca cada una en una línea distinta del mensaje de WhatsApp.
  ].join("\n");

  // Crea el enlace al WhatsApp 73835908 de Bolivia, con la consulta completa; protege espacios, tildes y saltos de
  // línea para que lleguen correctamente.
  const enlaceWhatsApp = "https://wa.me/59173835908?text=" + encodeURIComponent(consulta);
  // Encuentra el acceso «Continuar en WhatsApp», que sirve si el navegador no abre el chat automáticamente.
  const enlaceAlternativo = document.getElementById("enlace-envio");
  // Coloca en ese acceso el mismo enlace con la consulta completa.
  enlaceAlternativo.href = enlaceWhatsApp;
  // Muestra el acceso «Continuar en WhatsApp» para que también se pueda abrir el chat manualmente.
  enlaceAlternativo.hidden = false;
  // Encuentra el espacio de avisos del formulario y prepara la confirmación de que el mensaje ya está armado.
  document.getElementById("estado-envio").textContent =
    // Informa que falta confirmar el envío dentro de WhatsApp y señala el acceso alternativo si el chat no se
    // abrió.
    "Tu consulta está preparada. Confirma el envío en WhatsApp; si no se abrió, utiliza el enlace de abajo.";
  // Abre el chat en otra pestaña con el mensaje preparado; no lo envía automáticamente ni permite que la nueva
  // pestaña controle esta página.
  window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
// Termina las acciones que preparan la consulta y abren WhatsApp.
});

// Comprueba la selección antes de permitir una consulta del combo.
function revisarCombo() {
  // Cuenta los tipos de juego que siguen en la lista.
  const elegidos = window.JumanviCombo?.obtener() || [];
  // Pide al menos un juego únicamente si se eligió Mi combo personalizado.
  solicitud.setCustomValidity(solicitud.value === "combo-personalizado" && elegidos.length === 0 ? "Agrega al menos un juego a Mi combo o elige otro servicio de interés." : "");
// Termina la comprobación de la selección.
}

// Retira un mensaje preparado que ya no coincide con los datos actuales.
function invalidarConsultaPreparada() {
  // Oculta el enlace anterior para no enviar un combo o unos datos que ya cambiaron.
  document.getElementById("enlace-envio").hidden = true;
  // Borra el aviso anterior de consulta preparada.
  document.getElementById("estado-envio").textContent = "";
// Termina la retirada del mensaje anterior.
}

// Actualiza el formulario cuando se agrega, quita o cambia una cantidad del combo.
document.addEventListener("jumanvi:combo-cambio", () => {
  // Ofrece consultar el combo si antes solo se había elegido una consulta general.
  if (solicitud.value === "cotizacion-general" && window.JumanviCombo.obtener().length > 0) {
    // Presenta la selección de juegos como servicio de interés.
    solicitud.value = "combo-personalizado";
  // Termina la actualización del tipo de consulta.
  }
  // Vuelve a comprobar si quedan juegos suficientes para esta consulta.
  revisarCombo();
  // Renueva el texto y el regreso al catálogo con la selección más reciente.
  actualizarSeleccion();
  // Descarta el mensaje anterior para prepararlo otra vez con las cantidades nuevas.
  invalidarConsultaPreparada();
// Termina la respuesta al cambio del combo.
});

// Revisa la selección cuando la persona elige otro servicio de interés.
solicitud.addEventListener("change", revisarCombo);
// Descarta un mensaje anterior si se modifica un dato escrito en el formulario.
formulario.addEventListener("input", invalidarConsultaPreparada);
// Descarta un mensaje anterior si se cambia una lista, una fecha o una cantidad.
formulario.addEventListener("change", invalidarConsultaPreparada);
// Comprueba la selección recuperada al abrir Contacto.
revisarCombo();
