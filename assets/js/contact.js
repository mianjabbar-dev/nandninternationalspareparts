/* N&N International @ ASH Spare Parts — contact form
   Delivery: messages are sent to CONTACT_EMAIL below
   (mianjabbar2004@gmail.com, supplied by the site owner on 2026-11-23).
   Route: FormSubmit (https://formsubmit.co) AJAX endpoint — free, no
   account or API key. The form POSTs JSON to
   https://formsubmit.co/ajax/<CONTACT_EMAIL> with an
   "Accept: application/json" header and shows success only when the
   service answers OK. ONE-TIME SETUP: the first submission makes
   FormSubmit email CONTACT_EMAIL a confirmation link — the owner must
   click it once, otherwise FormSubmit holds submissions. After that,
   every message arrives in the inbox automatically.
   Fallback: if the request fails (offline, blocked, service down),
   the form shows a mailto: link to the SAME address with subject and
   message prefilled, so the visitor can send it from their own email
   app instead. Nothing is ever reported as sent unless it was. A
   backend can replace sendViaFormSubmit() later without changing the
   form. To change the destination address, edit CONTACT_EMAIL only. */
(function () {
  var CONTACT_EMAIL = "mianjabbar2004@gmail.com";
  var FORM_SUBMIT_URL = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;

  function init() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("contact-status");
    var mailtoBox = document.getElementById("mailto-box");
    var mailtoLink = document.getElementById("mailto-link");
    var copyBtn = document.getElementById("copy-message-btn");
    var submitBtn = form.querySelector('button[type="submit"]');

    function setError(inputId, message) {
      var el = document.getElementById(inputId + "-error");
      if (el) el.textContent = message || "";
      var input = document.getElementById(inputId);
      if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
    }
    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status" + (kind ? " " + kind : "");
    }
    function buildMailto(name, email, phone, subject, message) {
      var body = "Name: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : "") + "\n\n" + message;
      return "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("[N&N @ ASH Spare Parts] " + subject) +
        "&body=" + encodeURIComponent(body);
    }
    function showMailtoFallback(name, email, phone, subject, message) {
      var mailto = buildMailto(name, email, phone, subject, message);
      window.NN_lastMailto = mailto;
      if (mailtoLink) {
        mailtoLink.href = mailto;
        mailtoLink.textContent = "Open in Email App";
      }
      if (mailtoBox) mailtoBox.classList.add("show");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("contact-name").value.trim();
      var email = document.getElementById("contact-email").value.trim();
      var phone = document.getElementById("contact-phone").value.trim();
      var subject = document.getElementById("contact-subject").value.trim();
      var message = document.getElementById("contact-message").value.trim();
      var valid = true;

      if (!name) { setError("contact-name", "Please enter your name."); valid = false; } else setError("contact-name", "");
      if (!email) { setError("contact-email", "Please enter your email address."); valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("contact-email", "Please enter a valid email address."); valid = false; }
      else setError("contact-email", "");
      if (!subject) { setError("contact-subject", "Please enter a subject."); valid = false; } else setError("contact-subject", "");
      if (!message) { setError("contact-message", "Please write your message."); valid = false; } else setError("contact-message", "");
      if (phone && !/^[+0-9\s\-()]{7,20}$/.test(phone)) { setError("contact-phone", "Please enter a valid phone number, or leave it blank."); valid = false; }
      else setError("contact-phone", "");

      if (!valid) {
        setStatus("Please correct the highlighted fields and try again.", "error");
        if (mailtoBox) mailtoBox.classList.remove("show");
        return;
      }

      if (mailtoBox) mailtoBox.classList.remove("show");
      setStatus("Sending your message…", "");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      fetch(FORM_SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          message: message,
          _subject: "[N&N @ ASH Spare Parts] " + subject,
          _replyto: email,
          _template: "table",
          _captcha: "false"
        })
      }).then(function (res) {
        if (!res.ok) throw new Error("FormSubmit answered " + res.status);
        return res.json();
      }).then(function (data) {
        if (data && data.success === false) throw new Error("FormSubmit rejected the submission");
        setStatus("Thank you — your message has been sent to " + CONTACT_EMAIL + ".", "success");
        form.reset();
      }).catch(function () {
        showMailtoFallback(name, email, phone, subject, message);
        setStatus("Automatic sending did not work just now. Please click “Open in Email App” to send your message to " + CONTACT_EMAIL + " from your own email app.", "error");
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send Message"; }
      });
    });

    if (copyBtn) copyBtn.addEventListener("click", function () {
      var name = document.getElementById("contact-name").value.trim();
      var email = document.getElementById("contact-email").value.trim();
      var phone = document.getElementById("contact-phone").value.trim();
      var subject = document.getElementById("contact-subject").value.trim();
      var message = document.getElementById("contact-message").value.trim();
      var text = "To: " + CONTACT_EMAIL + "\nSubject: " + subject + "\nName: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : "") + "\n\n" + message;
      function done() { setStatus("Message copied to clipboard.", "success"); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { setStatus("Copy failed — please select and copy the message manually.", "error"); });
      } else {
        setStatus("Copy is not supported in this browser — please select and copy the message manually.", "error");
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
