// CEI Climatización y Electricidad Ibarra — interacciones básicas

// Número de WhatsApp para el formulario (código de país + número, sin espacios)
const WHATSAPP_NUMBER = "523318933647";

// Header con fondo al hacer scroll
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menú móvil
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Animación al aparecer en pantalla
const revealEls = document.querySelectorAll(
  ".section__head, .card, .about__media, .about__text, .why__item, .sector, .review, .zones__map, .contact__info, .form, .why__list li"
);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}

// Formulario de cotización
// Versión 1: abre WhatsApp con los datos prellenados.
// Versión 2 (CRM): reemplaza el bloque marcado abajo por un fetch() al webhook del CRM.
const form = document.getElementById("quoteForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.value.trim() !== "";
    field.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    note.textContent = "Por favor completa tu nombre, teléfono y el servicio que necesitas.";
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  // ---- INICIO: envío actual por WhatsApp ----
  const text =
    `Hola, quiero solicitar una cotización.%0A` +
    `*Nombre:* ${encodeURIComponent(data.nombre)}%0A` +
    `*Teléfono:* ${encodeURIComponent(data.telefono)}%0A` +
    `*Servicio:* ${encodeURIComponent(data.servicio)}%0A` +
    `*Zona:* ${encodeURIComponent(data.zona)}%0A` +
    (data.mensaje ? `*Detalles:* ${encodeURIComponent(data.mensaje)}` : "");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
  note.textContent = "¡Gracias! Te abrimos WhatsApp para enviar tu solicitud. Si prefieres, llámanos directamente.";
  form.reset();
  // ---- FIN ----

  /* Ejemplo para conectar al CRM más adelante:
  fetch("https://TU-WEBHOOK-DEL-CRM", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, origen: "sitio-web", fecha: new Date().toISOString() })
  })
    .then(() => { note.textContent = "¡Gracias! Te llamamos muy pronto."; form.reset(); })
    .catch(() => { note.textContent = "Hubo un problema. Llámanos al 33 1893 3647."; });
  */
});

document.getElementById("year").textContent = new Date().getFullYear();
