/*
  Static contact form validation and WhatsApp handoff.
*/

import Component from "../core/Component.js";

export default class ContactForm extends Component {
  constructor(root, storage) {
    super(root);
    this.storage = storage;
    this.whatsappNumber = "573001112233";
  }

  init() {
    this.form = this.select("[data-contact-form]");
    this.status = this.select("[data-form-status]");

    if (!this.form || !this.status) {
      return;
    }

    super.init();
    this.restoreDraft();
    this.listen(this.form, "input", () => this.saveDraft());
    this.listen(this.form, "submit", (event) => this.handleSubmit(event));
  }

  restoreDraft() {
    const draft = this.storage.get("contact-draft");

    if (!draft) {
      return;
    }

    Object.entries(draft).forEach(([name, value]) => {
      const field = this.form.elements.namedItem(name);
      if (field) {
        field.value = value;
      }
    });
  }

  saveDraft() {
    const formData = new FormData(this.form);
    this.storage.set("contact-draft", Object.fromEntries(formData.entries()));
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      this.setStatus("error", "Revisa los campos marcados antes de enviar.");
      return;
    }

    const formData = new FormData(this.form);
    const message = this.createWhatsAppMessage(formData);

    this.storage.remove("contact-draft");
    this.setStatus("success", "Listo. Abriremos WhatsApp con tu solicitud lista para enviar.");
    window.location.href = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  createWhatsAppMessage(formData) {
    return [
      "Hola, Almacén de Bicicletas JJ. Quiero hacer una solicitud:",
      "",
      `Nombre: ${formData.get("name")}`,
      `Telefono: ${formData.get("phone")}`,
      `Correo: ${formData.get("email")}`,
      `Servicio: ${formData.get("service")}`,
      "",
      `Mensaje: ${formData.get("message")}`
    ].join("\n");
  }

  setStatus(state, message) {
    this.status.hidden = false;
    this.status.dataset.state = state;
    this.status.textContent = message;
  }
}
