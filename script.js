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

// ===== Sparkle Effect =====

const sparkleLayer = document.querySelector('.sparkle-layer');

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.animationDuration = (1 + Math.random() * 2) + 's';
  sparkleLayer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 2000);
}

setInterval(createSparkle, 400); 






// ===== ABOUT US SECTION =====
document.addEventListener('DOMContentLoaded', function() {
            const photoStack = document.getElementById('photoStack');
            const photos = document.querySelectorAll('.photo');
            const personInfos = document.querySelectorAll('.person-info');
            
            const imageUrls = [
                'images/ronald.png',
                'images/jennie.png',
                'images/roland.png',
                'images/paul.png',            ];
  
            let currentPerson = 1;
            
            photoStack.addEventListener('click', function() {
                // Remove active class from current photo and info
                document.querySelector('.photo.active').classList.remove('active');
                document.querySelector('.person-info.active').classList.remove('active');
                
                // Move to next person (cycle back to 1 after 4)
                currentPerson = currentPerson % 4 + 1;
                
                // Add active class to new photo and info
                document.querySelector(`.photo[data-person="${currentPerson}"]`).classList.add('active');
                document.querySelector(`.person-info[data-person="${currentPerson}"]`).classList.add('active');
            });
        });

// ===== OVERVIEW Section =====
document.addEventListener('DOMContentLoaded', function() {
    const overviewLink = document.querySelector('a[href="#overview"]');
    if (overviewLink) {
        overviewLink.addEventListener('click', function(e) {
            e.preventDefault();
            const overviewSection = document.getElementById('overview');
            if (overviewSection) {
                overviewSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
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
