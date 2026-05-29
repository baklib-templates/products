import { Controller } from "@hotwired/stimulus"

// Quote ("Request a Solution") feedback form.
//
// The platform feedback form only natively carries an emoji + a message, so the
// custom contact fields (name / company / contact) are validated client-side
// and concatenated into the single hidden message field before sending.
//
// Submission uses fetch + Turbo.renderStreamMessage rather than a native Turbo
// form submit: a programmatically triggered submit can drop the
// `Accept: text/vnd.turbo-stream.html` header, which makes the server return a
// plain page and Turbo perform a full-page navigation to /-/feedback. By
// fetching with an explicit turbo-stream Accept header and feeding the response
// to Turbo.renderStreamMessage, feedback_success_turbo_stream.liquid renders its
// success toast in place and the visitor stays on the quote page.
export default class extends Controller {
  static targets = [
    "name",
    "company",
    "contact",
    "message",
    "messageField",
    "contactError",
    "messageError",
    "formError",
    "submit",
    "submitLabel",
    "submittingLabel",
  ]

  submit() {
    this.hideErrors()

    const errors = {}
    if (!this.contactTarget.value.trim()) errors.contact = true
    if (!this.messageTarget.value.trim()) errors.message = true

    if (Object.keys(errors).length) {
      this.showFieldErrors(errors)
      return
    }

    this.send()
  }

  async send() {
    const form = this.element.querySelector("form")
    if (!form) return

    this.setSubmitting(true)
    this.messageFieldTarget.value = this.assembleMessage()

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "text/vnd.turbo-stream.html",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
      })

      const body = await response.text()
      if (
        /<turbo-stream/i.test(body) &&
        window.Turbo &&
        typeof window.Turbo.renderStreamMessage === "function"
      ) {
        window.Turbo.renderStreamMessage(body)
      }

      if (response.ok) {
        this.resetForm()
      } else {
        this.showFormError()
      }
    } catch (error) {
      this.showFormError()
    } finally {
      this.setSubmitting(false)
    }
  }

  assembleMessage() {
    const lines = ["[Request a Solution]"]
    const name = this.hasNameTarget ? this.nameTarget.value.trim() : ""
    const company = this.hasCompanyTarget ? this.companyTarget.value.trim() : ""
    const contact = this.contactTarget.value.trim()
    const message = this.messageTarget.value.trim()

    if (name) lines.push("Name: " + name)
    if (company) lines.push("Company: " + company)
    if (contact) lines.push("Contact: " + contact)
    if (message) lines.push("Message:\n" + message)

    return lines.join("\n")
  }

  showFieldErrors(errors) {
    if (errors.contact) {
      this.contactErrorTarget.classList.remove("hidden")
      this.contactTarget.setAttribute("aria-invalid", "true")
    }
    if (errors.message) {
      this.messageErrorTarget.classList.remove("hidden")
      this.messageTarget.setAttribute("aria-invalid", "true")
    }
    const firstInvalid = errors.contact ? this.contactTarget : this.messageTarget
    firstInvalid.focus()
  }

  hideErrors() {
    this.contactErrorTarget.classList.add("hidden")
    this.messageErrorTarget.classList.add("hidden")
    this.contactTarget.setAttribute("aria-invalid", "false")
    this.messageTarget.setAttribute("aria-invalid", "false")
    if (this.hasFormErrorTarget) this.formErrorTarget.classList.add("hidden")
  }

  showFormError() {
    if (this.hasFormErrorTarget) this.formErrorTarget.classList.remove("hidden")
  }

  resetForm() {
    if (this.hasNameTarget) this.nameTarget.value = ""
    if (this.hasCompanyTarget) this.companyTarget.value = ""
    this.contactTarget.value = ""
    this.messageTarget.value = ""
    this.messageFieldTarget.value = ""
  }

  setSubmitting(state) {
    this.submitTarget.disabled = state
    if (this.hasSubmitLabelTarget) this.submitLabelTarget.classList.toggle("hidden", state)
    if (this.hasSubmittingLabelTarget) this.submittingLabelTarget.classList.toggle("hidden", !state)
  }
}
