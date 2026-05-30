// Dark mode and light mode
var themeButton = document.querySelector("[data-theme-toggle]");
var themeIcon = document.querySelector("[data-theme-icon]");

function darkMode() {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
  document.body.setAttribute("data-theme", "dark");

  if (themeIcon) {
    themeIcon.className = "bi bi-sun";
  }

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", "true");
  }

  localStorage.setItem("mahfazati-theme", "dark");
}

function lightMode() {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
  document.body.setAttribute("data-theme", "light");

  if (themeIcon) {
    themeIcon.className = "bi bi-moon-stars";
  }

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", "false");
  }

  localStorage.setItem("mahfazati-theme", "light");
}

if (localStorage.getItem("mahfazati-theme") === "dark") {
  darkMode();
} else {
  lightMode();
}

if (themeButton) {
  themeButton.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      lightMode();
    } else {
      darkMode();
    }
  });
}

// FAQ search
var faqInput = document.getElementById("faq-search-input");
var faqItems = document.querySelectorAll(".faq-list details");
var faqEmpty = document.querySelector("[data-faq-empty]");

if (faqInput) {
  for (var i = 0; i < faqItems.length; i++) {
    faqItems[i].setAttribute("data-open", faqItems[i].open);
  }

  faqInput.addEventListener("input", searchFaq);

  if (faqInput.form) {
    faqInput.form.addEventListener("submit", function (event) {
      event.preventDefault();
      searchFaq();
    });
  }
}

function searchFaq() {
  var word = faqInput.value.toLowerCase().trim();
  var results = 0;

  for (var i = 0; i < faqItems.length; i++) {
    var item = faqItems[i];
    var text = item.innerText.toLowerCase();

    if (word === "" || text.includes(word)) {
      item.hidden = false;
      item.classList.remove("faq-hidden");
      results++;

      if (word !== "") {
        item.open = true;
      } else {
        item.open = item.getAttribute("data-open") === "true";
      }
    } else {
      item.hidden = true;
      item.classList.add("faq-hidden");
    }
  }

  if (faqEmpty) {
    if (results === 0) {
      faqEmpty.classList.add("visible");
    } else {
      faqEmpty.classList.remove("visible");
    }
  }
}
