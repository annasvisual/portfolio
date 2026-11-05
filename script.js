/* Add your real contact details here. Empty values remain hidden on the page.
   CV: place your PDF in assets/ and set cv to "assets/anna-kovtun-cv.pdf". */
const contact = {
  email: "",
  linkedin: "",
  cv: ""
};

let availableContacts = 0;
for (const [kind, value] of Object.entries(contact)) {
  const link = document.querySelector(`[data-contact="${kind}"]`);
  if (!link || !value.trim()) continue;
  if (kind === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) continue;
    link.href = `mailto:${value}`;
  } else {
    const url = new URL(value, window.location.href);
    if (!["https:", "http:", "file:"].includes(url.protocol)) continue;
    link.href = url.href;
    if (kind === "linkedin") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }
  link.hidden = false;
  availableContacts++;
}
if (availableContacts) document.querySelector("#contact-pending").hidden = true;
document.querySelector("#year").textContent = new Date().getFullYear();
