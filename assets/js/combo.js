// Mantiene la selección de juegos separada de las demás acciones de la página.
(() => {
  // Identifica el espacio del navegador donde se conserva el combo de Jumanvi.
  const clave = "jumanvi-combo-v1";
  // Relaciona cada juego del catálogo con el nombre que aparecerá en WhatsApp.
  const juegos = {
    // Reconoce la categoría de juegos inflables.
    "inflables": "Inflables",
    // Reconoce la atracción del toro mecánico.
    "toro-mecanico": "Toro mecánico",
    // Reconoce los carruseles infantiles.
    "carruseles": "Carruseles",
    // Reconoce las camas elásticas.
    "camas-elasticas": "Camas elásticas",
    // Reconoce las mesas de futbolín.
    "futbolines": "Futbolines",
    // Reconoce la consulta por carritos, sujeta a las modalidades disponibles.
    "carritos": "Carritos",
    // Reconoce la consulta por alternativas del catálogo.
    "otros-juegos": "Otros juegos"
  // Termina la lista de nombres admitidos.
  };
  // Indica si el navegador permite recordar la selección entre visitas.
  let puedeGuardar = true;

  // Acepta solamente juegos del catálogo y cantidades enteras entre 1 y 99.
  function normalizar(datos) {
    // Ignora información que no tenga forma de una lista de juegos.
    if (!Array.isArray(datos)) {
      // Devuelve una selección vacía cuando la información no es válida.
      return [];
    // Termina la comprobación de la lista recibida.
    }
    // Guarda cada juego una sola vez para impedir duplicados.
    const encontrados = new Map();
    // Revisa todas las elecciones que llegaron desde el navegador o el enlace.
    for (const item of datos) {
      // Comprueba que la elección existe y corresponde a un juego conocido.
      if (item && Object.hasOwn(juegos, item.id)) {
        // Conserva una cantidad válida; una cantidad incorrecta comienza en una unidad.
        const cantidad = Number.isInteger(item.cantidad) ? Math.min(99, Math.max(1, item.cantidad)) : 1;
        // Conserva el juego con su cantidad sin repetirlo en la selección.
        encontrados.set(item.id, { id: item.id, cantidad });
      // Termina la comprobación de este juego.
      }
    // Termina la revisión de las elecciones recibidas.
    }
    // Devuelve los juegos revisados en el orden en que se eligieron.
    return Array.from(encontrados.values());
  // Termina la revisión de la selección.
  }

  // Recupera el combo recordado en este navegador.
  function leerGuardado() {
    // Intenta leerlo sin impedir que el sitio funcione si el navegador lo bloquea.
    try {
      // Recupera la lista guardada y comprueba sus juegos y cantidades.
      return normalizar(JSON.parse(localStorage.getItem(clave) || "[]"));
    // Atiende un bloqueo del guardado o una lista anterior dañada.
    } catch {
      // Recuerda que no se puede asegurar la conservación entre visitas.
      puedeGuardar = false;
      // Empieza con una selección vacía, sin detener los botones.
      return [];
    // Termina el intento de recuperación.
    }
  // Termina la lectura de la selección anterior.
  }

  // Empieza con el combo que ya tenía este navegador.
  let combo = leerGuardado();
  // Revisa si el enlace trae una selección enviada desde otra página.
  const recibido = new URLSearchParams(window.location.search).get("combo");
  // Da prioridad a una selección que venga incluida expresamente en el enlace.
  if (recibido !== null) {
    // Intenta comprender la lista que acompaña al enlace.
    try {
      // Revisa los juegos y las cantidades antes de mostrarlos.
      const datos = JSON.parse(recibido);
      // Usa la selección del enlace solamente cuando es una lista.
      if (Array.isArray(datos)) {
        // Sustituye el combo anterior por la lista revisada del enlace.
        combo = normalizar(datos);
      // Termina la comprobación de la selección del enlace.
      }
    // Conserva la selección anterior si el enlace está incompleto o dañado.
    } catch {
      // No altera el combo ya recuperado del navegador.
    // Termina la lectura del enlace.
    }
  // Termina la recuperación inicial del combo.
  }

  // Recuerda los cambios sin enviar información fuera de este navegador.
  function guardar() {
    // Intenta conservar la lista de juegos y sus cantidades.
    try {
      // Guarda únicamente la selección, sin nombre, teléfono ni datos del formulario.
      localStorage.setItem(clave, JSON.stringify(combo));
      // Confirma que este navegador permitió guardar el cambio.
      puedeGuardar = true;
    // Mantiene la selección en la página aunque el navegador bloquee el guardado.
    } catch {
      // Permite avisar de que se debe continuar usando los enlaces del combo.
      puedeGuardar = false;
    // Termina el intento de guardar.
    }
  // Termina el guardado de la selección.
  }

  // Añade la selección a un enlace interno sin cambiar su destino ni el servicio que ya indicaba.
  function conSeleccion(destino) {
    // Separa el apartado de la dirección de la página.
    const [base, apartado] = destino.split("#");
    // Conserva la página y los demás datos que ya acompañaban al enlace.
    const [ruta, busqueda = ""] = base.split("?");
    // Prepara esos datos sin perder un juego, un paquete o un evento indicado anteriormente.
    const parametros = new URLSearchParams(busqueda);
    // Adjunta únicamente los juegos y las cantidades, nunca los datos personales.
    parametros.set("combo", JSON.stringify(combo));
    // Devuelve el mismo destino con la selección actual y su apartado original.
    return ruta + "?" + parametros.toString() + (apartado ? "#" + apartado : "");
  // Termina la preparación de un enlace interno con el combo.
  }

  // Prepara el regreso al catálogo llevando la selección actual en el enlace.
  function enlaceCatalogo() {
    // Incluye incluso una lista vacía para no recuperar un combo que se acaba de quitar.
    return conSeleccion("juegos.html#mi-combo");
  // Termina la preparación del regreso al catálogo.
  }

  // Cuenta las unidades solicitadas de todos los juegos.
  function total() {
    // Suma las cantidades de la selección actual.
    return combo.reduce((suma, item) => suma + item.cantidad, 0);
  // Termina la suma de unidades.
  }

  // Informa del resultado de agregar, quitar o modificar juegos.
  function avisar(texto) {
    // Actualiza el aviso del catálogo o del formulario, según la página abierta.
    document.querySelectorAll("[data-combo-status]").forEach((aviso) => {
      // Explica cómo continuar si no se pudo recordar el combo entre visitas.
      aviso.textContent = texto + (puedeGuardar ? "" : " El navegador no permite recordarlo. Usa los enlaces de Mi combo para conservar la selección al continuar.");
    // Termina la actualización de los avisos.
    });
  // Termina el aviso sobre la selección.
  }

  // Mantiene la dirección de esta página al día para que recargar no recupere un combo anterior.
  function recordarDireccion() {
    // Intenta actualizar solo la selección del enlace, sin volver a cargar la página.
    try {
      // Conserva la página, el servicio elegido y el apartado que está abierto.
      const direccion = new URL(window.location.href);
      // Añade la selección cuando hay juegos o cuando la dirección ya traía un combo.
      if (combo.length > 0 || direccion.searchParams.has("combo")) {
        // Sustituye únicamente los juegos y cantidades de la dirección actual.
        direccion.searchParams.set("combo", JSON.stringify(combo));
        // Actualiza esta misma entrada del recorrido sin añadir pasos al botón Volver.
        window.history.replaceState(null, "", direccion.href);
      // Termina la comprobación de la selección presente en la dirección.
      }
    // Conserva los botones y enlaces aunque un navegador impida cambiar la dirección.
    } catch {
      // La selección sigue disponible en la página y en los enlaces para continuar.
    // Termina el intento de actualizar la dirección.
    }
  // Termina la preparación para recargar conservando el último combo.
  }

  // Dibuja la misma selección en el catálogo y en el formulario.
  function mostrar() {
    // Actualiza los números que acompañan a Mi combo en el menú.
    document.querySelectorAll("[data-combo-count]").forEach((contador) => {
      // Muestra el total de unidades solicitadas.
      contador.textContent = String(total());
      // Explica el significado del número a quien escucha la página.
      contador.setAttribute("aria-label", total() + " unidades seleccionadas");
    // Termina la actualización del número del menú.
    });
    // Lleva la selección actual en los enlaces que regresan a Mi combo.
    document.querySelectorAll("[data-combo-link]").forEach((enlace) => {
      // Actualiza el regreso al catálogo con los juegos elegidos.
      enlace.href = enlaceCatalogo().replace("#mi-combo", enlace.dataset.comboLink === "catalogo" ? "#titulo-catalogo" : "#mi-combo");
    // Termina la preparación de los enlaces del catálogo.
    });
    // Prepara los enlaces para continuar con el combo hacia Contacto.
    document.querySelectorAll("[data-combo-continue]").forEach((enlace) => {
      // Lleva juegos y cantidades al formulario aunque el navegador bloquee el guardado.
      enlace.href = "contacto.html?interes=combo-personalizado&combo=" + encodeURIComponent(JSON.stringify(combo)) + "#formulario";
      // Muestra el acceso para cotizar cuando se ha elegido al menos un juego.
      enlace.hidden = combo.length === 0;
    // Termina la actualización de los accesos al formulario.
    });
    // Conserva el combo al recorrer cualquier página del sitio, incluso si el guardado está bloqueado.
    document.querySelectorAll("a[href]").forEach((enlace) => {
      // Lee el destino de este enlace sin incluir direcciones de redes sociales.
      const destino = enlace.getAttribute("href");
      // Reconoce únicamente las cinco páginas locales del proyecto.
      if (/^(index|juegos|eventos|alquiler|contacto)\.html(?:[?#]|$)/.test(destino)) {
        // Lleva la selección actual sin alterar el apartado o el servicio de ese enlace.
        enlace.href = conSeleccion(destino);
      // Termina la comprobación del destino interno.
      }
    // Termina la actualización de los enlaces internos.
    });
    // Actualiza el aspecto de los botones de las tarjetas del catálogo.
    document.querySelectorAll("[data-combo-toggle]").forEach((boton) => {
      // Comprueba si el juego de esta tarjeta ya pertenece al combo.
      const elegido = combo.some((item) => item.id === boton.dataset.comboToggle);
      // Indica si este juego está seleccionado para quien utiliza ayudas de lectura.
      boton.setAttribute("aria-pressed", String(elegido));
      // Permite agregarlo o quitarlo con el mismo botón, sin duplicar elecciones.
      boton.textContent = elegido ? "Quitar de mi combo" : "Agregar a mi combo";
    // Termina la actualización de los botones de juegos.
    });
    // Prepara cada espacio donde se muestra la lista del combo.
    document.querySelectorAll("[data-combo-panel]").forEach((panel, indice) => {
      // Encuentra la lista de juegos dentro de este espacio.
      const lista = panel.querySelector("[data-combo-list]");
      // Retira la lista anterior antes de dibujar las cantidades actualizadas.
      lista.replaceChildren();
      // Muestra el aviso de selección vacía solo cuando corresponde.
      panel.querySelector("[data-combo-empty]").hidden = combo.length > 0;
      // Explica cuántos tipos de juego y cuántas unidades se han pedido.
      panel.querySelector("[data-combo-total]").textContent = total() + " unidades · " + combo.length + " tipos de juego";
      // Muestra la opción de vaciar cuando existe alguna elección.
      panel.querySelector("[data-combo-clear]").hidden = combo.length === 0;
      // Prepara una fila por cada juego elegido.
      for (const item of combo) {
        // Crea la fila que reunirá el nombre, la cantidad y la opción de quitar.
        const fila = document.createElement("li");
        // Le da la apariencia compacta definida en los estilos del combo.
        fila.className = "combo-item";
        // Reserva un texto destacado para el nombre del juego.
        const nombre = document.createElement("strong");
        // Usa el nombre conocido del catálogo, no texto recibido desde un enlace.
        nombre.textContent = juegos[item.id];
        // Reúne los controles de cantidad y de quitar en el mismo espacio.
        const controles = document.createElement("div");
        // Aplica la distribución adaptable de estos controles.
        controles.className = "combo-item__controls";
        // Crea el nombre visible de la cantidad.
        const etiqueta = document.createElement("label");
        // Identifica esta caja sin confundirla con otra del formulario o del catálogo.
        const identificador = "combo-" + indice + "-" + item.id;
        // Relaciona la palabra Cantidad con la caja de este juego.
        etiqueta.htmlFor = identificador;
        // Escribe el nombre visible del dato que se puede editar.
        etiqueta.textContent = "Cantidad";
        // Crea la caja donde se indica cuántas unidades se solicitan.
        const cantidad = document.createElement("input");
        // Permite escribir solamente una cantidad numérica.
        cantidad.type = "number";
        // Asigna el nombre único de la caja.
        cantidad.id = identificador;
        // Explica qué juego se está contando a quien escucha la página.
        cantidad.setAttribute("aria-label", "Cantidad de " + juegos[item.id]);
        // Pide un teclado numérico en los teléfonos compatibles.
        cantidad.inputMode = "numeric";
        // No permite solicitar menos de una unidad en una fila existente.
        cantidad.min = "1";
        // Mantiene las cantidades del mensaje entre una y noventa y nueve unidades.
        cantidad.max = "99";
        // Hace que los controles de aumento avancen de una unidad en una unidad.
        cantidad.step = "1";
        // Presenta la cantidad que ya estaba seleccionada.
        cantidad.value = item.cantidad;
        // Atiende una cantidad nueva al terminar de editar la caja.
        cantidad.addEventListener("change", () => {
          // Lee el número escrito, sin aceptar texto ni cantidades incompletas.
          const nueva = cantidad.valueAsNumber;
          // Rechaza decimales, ceros, números negativos y cantidades superiores al límite.
          if (!Number.isInteger(nueva) || nueva < 1 || nueva > 99) {
            // Recupera la cantidad anterior para no conservar una solicitud inválida.
            cantidad.value = item.cantidad;
            // Explica el intervalo permitido sin perder el resto de la selección.
            avisar("Usa una cantidad entera entre 1 y 99.");
            // Termina esta edición incorrecta sin cambiar el combo.
            return;
          // Termina la comprobación de la cantidad.
          }
          // Conserva la cantidad válida para este juego.
          item.cantidad = nueva;
          // Guarda el cambio y actualiza el resumen y el formulario.
          actualizar("Cantidad de " + juegos[item.id] + " actualizada.");
          // Conserva el lugar del teclado en la caja que se acaba de editar.
          document.getElementById(identificador)?.focus();
        // Termina la respuesta a la edición de cantidades.
        });
        // Crea la opción para quitar solo este juego.
        const quitar = document.createElement("button");
        // Evita que quitar un juego envíe el formulario de Contacto.
        quitar.type = "button";
        // Aplica el aspecto del botón pequeño de quitar.
        quitar.className = "combo-remove";
        // Escribe la acción visible de este botón.
        quitar.textContent = "Quitar";
        // Identifica el juego que se quitará a quien escucha la página.
        quitar.setAttribute("aria-label", "Quitar " + juegos[item.id] + " de mi combo");
        // Atiende la decisión de quitar este juego.
        quitar.addEventListener("click", () => {
          // Conserva las demás elecciones y retira este juego.
          combo = combo.filter((actual) => actual.id !== item.id);
          // Guarda la selección restante y anuncia qué se quitó.
          actualizar(juegos[item.id] + " se quitó de tu combo.");
          // Mantiene el teclado en una opción disponible de este mismo bloque.
          (lista.querySelector("button") || panel.querySelector("[data-combo-link]"))?.focus();
        // Termina la acción de quitar un juego.
        });
        // Coloca Cantidad, su caja y Quitar en ese orden.
        controles.append(etiqueta, cantidad, quitar);
        // Une el nombre del juego con sus controles.
        fila.append(nombre, controles);
        // Añade la fila completa al resumen.
        lista.append(fila);
      // Termina el recorrido por los juegos seleccionados.
      }
    // Termina el dibujo de todos los espacios del combo.
    });
    // Conserva en la dirección los cambios más recientes de juegos y cantidades.
    recordarDireccion();
  // Termina la actualización visual del combo.
  }

  // Comparte los cambios entre la selección visible y el formulario.
  function actualizar(texto) {
    // Intenta recordar la nueva selección en el navegador.
    guardar();
    // Actualiza nombres, cantidades, botones y enlaces.
    mostrar();
    // Comunica qué cambió sin interrumpir el uso de los controles.
    avisar(texto);
    // Informa al formulario de que debe revisar su resumen y el mensaje preparado.
    document.dispatchEvent(new CustomEvent("jumanvi:combo-cambio"));
  // Termina la actualización conjunta.
  }

  // Permite que el formulario lea el combo sin modificarlo por accidente.
  window.JumanviCombo = Object.freeze({
    // Devuelve una copia de cada elección, con su nombre y cantidad.
    obtener: () => combo.map((item) => ({ ...item, nombre: juegos[item.id] })),
    // Comparte la preparación de enlaces internos con los juegos y cantidades actuales.
    conSeleccion,
    // Comparte el regreso al catálogo llevando la selección actual.
    enlaceCatalogo,
    // Prepara las líneas de juegos que se adjuntarán al mensaje de WhatsApp.
    lineasMensaje: () => combo.length ? [
      // Separa el combo de la información anterior del mensaje.
      "",
      // Presenta el apartado que reúne las elecciones.
      "Mi combo de juegos:",
      // Escribe la cantidad y el nombre de cada juego en su propia línea.
      ...combo.map((item) => "- " + item.cantidad + " x " + juegos[item.id]),
      // Aclara el total y que todavía hace falta confirmar la disponibilidad.
      "Total solicitado: " + total() + " unidades. Sujeto a disponibilidad.",
      // Separa la selección de los datos personales que siguen.
      ""
    // No añade este apartado cuando no hay juegos seleccionados.
    ] : []
  // Termina las opciones que utiliza el formulario.
  });

  // Activa los botones para agregar o quitar juegos del catálogo.
  document.querySelectorAll("[data-combo-toggle]").forEach((boton) => {
    // Comprueba que el botón corresponde a un juego conocido.
    if (!Object.hasOwn(juegos, boton.dataset.comboToggle)) {
      // Deja oculto cualquier botón que no pertenezca al catálogo.
      return;
    // Termina la comprobación del juego.
    }
    // Muestra el botón solo cuando estas acciones ya están disponibles.
    boton.hidden = false;
    // Escucha la elección realizada en la tarjeta.
    boton.addEventListener("click", () => {
      // Identifica el juego de este botón.
      const id = boton.dataset.comboToggle;
      // Comprueba si ya está en la lista.
      const existe = combo.some((item) => item.id === id);
      // Quita un juego ya elegido o añade uno nuevo con una unidad.
      combo = existe ? combo.filter((item) => item.id !== id) : [...combo, { id, cantidad: 1 }];
      // Recuerda la elección y actualiza el número del menú y la lista.
      actualizar(juegos[id] + (existe ? " se quitó de tu combo." : " se agregó a tu combo."));
    // Termina la respuesta a la elección de una tarjeta.
    });
  // Termina la preparación de los botones del catálogo.
  });

  // Prepara la opción de retirar todos los juegos de una vez.
  document.querySelectorAll("[data-combo-clear]").forEach((boton) => {
    // Atiende el botón Vaciar combo sin enviar el formulario.
    boton.addEventListener("click", () => {
      // Deja la selección sin juegos.
      combo = [];
      // Guarda el combo vacío y actualiza todos los resúmenes.
      actualizar("Tu combo está vacío. Puedes elegir otros juegos en el catálogo.");
      // Coloca el teclado en el acceso para seguir eligiendo.
      boton.closest("[data-combo-panel]").querySelector("[data-combo-link]")?.focus();
    // Termina la acción de vaciar el combo.
    });
  // Termina la preparación de los botones de vaciar.
  });

  // Atiende los cambios del combo realizados en otra pestaña del mismo sitio.
  window.addEventListener("storage", (evento) => {
    // Ignora cambios que no correspondan al combo de Jumanvi.
    if (evento.key !== clave && evento.key !== null) {
      // Termina sin alterar esta selección.
      return;
    // Termina la comprobación del cambio recibido.
    }
    // Recupera la selección actualizada, o una lista vacía si se borró el guardado.
    combo = leerGuardado();
    // Actualiza la lista visible sin volver a guardar y sin provocar un ciclo entre pestañas.
    mostrar();
    // Informa de por qué cambió la lista.
    avisar("Tu combo se actualizó desde otra pestaña.");
    // Pide al formulario que también revise su resumen.
    document.dispatchEvent(new CustomEvent("jumanvi:combo-cambio"));
  // Termina la sincronización entre pestañas.
  });

  // Conserva también la selección que haya llegado dentro de un enlace.
  guardar();
  // Presenta el combo y prepara sus enlaces al abrir la página.
  mostrar();
  // Advierte del guardado bloqueado, si lo hay, sin impedir continuar.
  avisar("");
// Termina la preparación de Mi combo.
})();
