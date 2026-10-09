const formulario = document.getElementById("formulario");
const solicitud = document.getElementById("solicitud");
const tipoEvento = document.getElementById("evento");
const servicios = {
  "cotizacion-general": {
    "label": "Cotización personalizada",
    "url": "alquiler.html#cotizacion"
  },
  "juego-inflables": {
    "label": "Inflables",
    "url": "juegos.html#inflables"
  },
  "juego-toro-mecanico": {
    "label": "Toro mecánico",
    "url": "juegos.html#toro-mecanico"
  },
  "juego-carruseles": {
    "label": "Carruseles",
    "url": "juegos.html#carruseles"
  },
  "juego-camas-elasticas": {
    "label": "Camas elásticas",
    "url": "juegos.html#camas-elasticas"
  },
  "juego-futbolines": {
    "label": "Futbolines",
    "url": "juegos.html#futbolines"
  },
  "juego-carritos": {
    "label": "Carritos",
    "url": "juegos.html#carritos"
  },
  "juego-otros-juegos": {
    "label": "Otros juegos",
    "url": "juegos.html#otros-juegos"
  },
  "evento-cumpleanos": {
    "label": "Cumpleaños",
    "url": "eventos.html#cumpleanos",
    "event": "Cumpleaños"
  },
  "evento-colegios": {
    "label": "Colegios",
    "url": "eventos.html#colegios",
    "event": "Evento escolar"
  },
  "evento-infantiles": {
    "label": "Eventos infantiles",
    "url": "eventos.html#infantiles",
    "event": "Evento infantil"
  },
  "evento-empresariales": {
    "label": "Eventos empresariales",
    "url": "eventos.html#empresariales",
    "event": "Evento empresarial"
  },
  "evento-celebraciones": {
    "label": "Fiestas y celebraciones",
    "url": "eventos.html#celebraciones",
    "event": "Fiesta o celebración"
  },
  "paquete-esencial": {
    "label": "Paquete Esencial",
    "url": "alquiler.html#paquete-esencial"
  },
  "paquete-diversion": {
    "label": "Paquete Diversión",
    "url": "alquiler.html#paquete-diversion"
  },
  "paquete-gran-evento": {
    "label": "Paquete Gran Evento",
    "url": "alquiler.html#paquete-gran-evento"
  },
  "combinacion-infantil": {
    "label": "Pequeños exploradores",
    "url": "alquiler.html#combinacion-infantil",
    "event": "Evento infantil"
  },
  "combinacion-familiar": {
    "label": "Familia en juego",
    "url": "alquiler.html#combinacion-familiar",
    "event": "Fiesta o celebración"
  },
  "combinacion-equipos": {
    "label": "Desafío en equipo",
    "url": "alquiler.html#combinacion-equipos",
    "event": "Evento empresarial"
  }
};

const parametros = new URLSearchParams(window.location.search);
const interes = parametros.get("interes");

if (interes && Object.hasOwn(servicios, interes)) {
  solicitud.value = interes;
}

const eventoRecibido = parametros.get("evento");
const eventoValido = Array.from(tipoEvento.options).some(
  (opcion) => opcion.value === eventoRecibido
);

if (eventoRecibido && eventoValido) {
  tipoEvento.value = eventoRecibido;
} else if (servicios[solicitud.value].event) {
  tipoEvento.value = servicios[solicitud.value].event;
}

function actualizarSeleccion() {
  const servicio = servicios[solicitud.value];
  document.getElementById("seleccion-texto").textContent =
    "Estás consultando: " + servicio.label + ".";
  const volver = document.getElementById("volver-seleccion");
  volver.href = servicio.url;
  volver.textContent = "Revisar " + servicio.label.toLowerCase() + " →";
}

actualizarSeleccion();

solicitud.addEventListener("change", function () {
  const servicio = servicios[solicitud.value];
  if (servicio.event) {
    tipoEvento.value = servicio.event;
  }
  actualizarSeleccion();
});

for (const id of ["nombre", "telefono", "mensaje"]) {
  const campo = document.getElementById(id);
  campo.addEventListener("input", function () {
    campo.setCustomValidity("");
  });
}

formulario.addEventListener("submit", function (eventoEnvio) {
  eventoEnvio.preventDefault();

  for (const id of ["nombre", "telefono", "mensaje"]) {
    const campo = document.getElementById(id);
    campo.setCustomValidity(campo.value.trim() ? "" : "Completa este campo.");
  }

  if (!formulario.reportValidity()) {
    return;
  }

  const leer = (id) => document.getElementById(id).value.trim();
  const servicio = servicios[solicitud.value];
  const fecha = leer("fecha");
  const fechaVisible = fecha ? fecha.split("-").reverse().join("/") : "Por definir";
  const consulta = [
    "Hola Jumanvi, quiero solicitar una cotización.",
    "",
    "Servicio de interés: " + servicio.label,
    "Referencia: " + servicio.url,
    "Nombre: " + leer("nombre"),
    "Teléfono: " + leer("telefono"),
    "Correo: " + (leer("correo") || "No indicado"),
    "Tipo de evento: " + (leer("evento") || "Por definir"),
    "Fecha estimada: " + fechaVisible,
    "Invitados: " + (leer("invitados") || "Por definir"),
    "Duración: " + (leer("duracion") || "Por definir"),
    "Lugar: " + (leer("lugar") || "Por definir"),
    "",
    "Mensaje:",
    leer("mensaje")
  ].join("\n");

  const enlaceWhatsApp = "https://wa.me/59173835908?text=" + encodeURIComponent(consulta);
  const enlaceAlternativo = document.getElementById("enlace-envio");
  enlaceAlternativo.href = enlaceWhatsApp;
  enlaceAlternativo.hidden = false;
  document.getElementById("estado-envio").textContent =
    "Tu consulta está preparada. Confirma el envío en WhatsApp; si no se abrió, utiliza el enlace de abajo.";
  window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
});
