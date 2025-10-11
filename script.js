// ===== Light / Dark Mode Toggle =====
const themeToggle = document.getElementById("theme-toggle");
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ===== Editable About Section =====
const editButton = document.getElementById("edit-about");
const aboutText = document.getElementById("about-text");
let isEditing = false;

editButton.addEventListener("click", () => {
  isEditing = !isEditing;
  aboutText.contentEditable = isEditing;
  if (isEditing) aboutText.focus();
  editButton.textContent = isEditing ? "💾 Save" : "✏️ Edit";
});

// ===== Quote Fetching =====
async function getQuote() {
  const quoteButton = document.getElementById("quote-btn");
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  try {
    quoteButton.disabled = true;
    quoteButton.textContent = "Loading...";
    quoteElement.textContent = "Fetching a quote...";
    authorElement.textContent = "";

    const response = await fetch("/api/quote"); // relative path
    if (!response.ok) throw new Error("Failed to fetch quote");

    const data = await response.json();
    quoteElement.textContent = `"${data.content}"`;
    authorElement.textContent = `— ${data.author}`;
  } catch (err) {
    quoteElement.textContent = "Error loading quote.";
    authorElement.textContent = "";
    console.error(err);
  } finally {
    quoteButton.disabled = false;
    quoteButton.textContent = "New Quote";
  }
}

// Event listeners
document.getElementById("quote-btn").addEventListener("click", getQuote);
window.addEventListener("DOMContentLoaded", getQuote);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== Contact Form =====
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) return alert("Please fill in all fields.");
    alert(`Thank you ${name}! We'll get back to you at ${email}.`);
    contactForm.reset();
  });
}
