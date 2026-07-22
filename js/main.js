/* ===== Language Switcher (EN default / AR) ===== */
function setLanguage(lang) {
  // Swap every element with data-en/data-ar
  document.querySelectorAll("[data-en]").forEach((el) => {
    const text = lang === "ar" ? el.dataset.ar : el.dataset.en;
    if (text !== undefined) el.innerHTML = text;
  });

  // Swap input/textarea placeholders
  document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
    const text =
      lang === "ar"
        ? el.dataset.arPlaceholder
        : el.dataset.enPlaceholder;

    if (text !== undefined) {
      el.setAttribute("placeholder", text);
    }
  });

  // Swap Bootstrap CSS (LTR <-> RTL)
  const bsLink = document.getElementById("bootstrapCSS");
  if (bsLink) {
    bsLink.href =
      lang === "ar"
        ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
        : "css/bootstrap.min.css";
  }

  // Change html direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // Change Hero Arrow
  const arrow = document.querySelector(".hero-arrow");
  if (arrow) {
    if (lang === "ar") {
      arrow.classList.remove("fa-arrow-right");
      arrow.classList.add("fa-arrow-left");
    } else {
      arrow.classList.remove("fa-arrow-left");
      arrow.classList.add("fa-arrow-right");
    }
  }

  // Save language
  localStorage.setItem("siteLang", lang);

  // Change button text
  const langText = document.getElementById("langText");
  if (langText) {
    langText.textContent = lang === "ar" ? "EN" : "AR";
  }

  // Refresh projects
  if (typeof refreshProjectsLanguage === "function") {
    refreshProjectsLanguage(lang);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLang") || "en"; // English by default
  setLanguage(savedLang);

  const langBtn = document.getElementById("langSwitch");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const currentLang = document.documentElement.lang === "ar" ? "ar" : "en";
      setLanguage(currentLang === "ar" ? "en" : "ar");
    });
  }
});
// window.addEventListener("load", () => {

//     const loader = document.getElementById("loader");
//     const bar = document.getElementById("loaderBar");

//     let width = 0;

//     const loading = setInterval(() => {

//         width++;

//         bar.style.width = width + "%";

//         if(width >= 100){

//             clearInterval(loading);

//             setTimeout(() => {

//                 loader.classList.add("hide");

//                 setTimeout(()=>{
//                     loader.remove();
//                 },600);

//             },300);

//         }

//     },15);

// });

var mode = document.body;
var input = document.querySelector("#modeToggle");
var navLinks = document.querySelectorAll(".nav-link");
var savedMode = JSON.parse(localStorage.getItem("mode")) || false;
const stats = document.querySelector(".stats");
const statEx = document.querySelector(".statEx");
let skills = document.querySelector(".skills");
let bars = document.querySelectorAll(".progress-bar-fill");
let statsStarted = false;
let skillsStarted = false;
let statExStarted = false;
function startCounter(section, selector, end) {
  let count = 1;

  const elements = section.querySelectorAll(selector);

  const timer = setInterval(() => {
    elements.forEach((el) => {
      el.textContent = `${count}+`;
    });

    if (count >= end) clearInterval(timer);

    count++;
  }, 30);
}
function updateTheme(isDark) {
  if (isDark) {
    mode.classList.add("body-dark");
    input.checked = true;

    navLinks.forEach((link) => {
      link.classList.remove("text-muted");
      link.classList.add("text-ul");
    });
  } else {
    mode.classList.remove("body-dark");
    input.checked = false;

    navLinks.forEach((link) => {
      link.classList.remove("text-ul");
      link.classList.add("text-muted");
    });
  }
}
window.addEventListener("scroll", () => {
  if (stats && scrollY >= stats.offsetTop - 300 && !statsStarted) {
    statsStarted = true;
    startCounter(stats, ".stat50", 50);
    startCounter(stats, ".stat8", 8);
    startCounter(stats, ".stat40", 40);
  }

  if (statEx && scrollY >= statEx.offsetTop - 300 && !statExStarted) {
    statExStarted = true;
    startCounter(statEx, ".stat50", 50);
    startCounter(statEx, ".stat8", 8);
    startCounter(statEx, ".stat40", 40);
    startCounter(statEx, ".stat12", 12);
  }

  if (skills && scrollY >= skills.offsetTop - 300 && !skillsStarted) {
    skillsStarted = true;

    bars.forEach((bar) => {
      bar.style.width = bar.dataset.width;
    });
  }
});
updateTheme(savedMode);
input.addEventListener("change", () => {
  var isDark = input.checked;
  updateTheme(isDark);
  localStorage.setItem("mode", JSON.stringify(isDark));
});
document.addEventListener("DOMContentLoaded", function () {
  var fontCards = document.querySelectorAll(".font-select-card");
  var colorCircles = document.querySelectorAll(".color-circle-wrapper");
  var root = document.documentElement;

  function loadSavedTheme() {
    var savedFont = localStorage.getItem("selectedFont");
    var savedColor = localStorage.getItem("selectedColor");

    if (savedFont) {
      root.style.setProperty("--font-family", savedFont);

      fontCards.forEach((c) => c.classList.remove("active"));

      var fontInput = document.querySelector(
        `input[name="fontOption"][value="${savedFont}"]`,
      );

      if (fontInput) {
        fontInput.checked = true;
        fontInput.closest(".font-select-card").classList.add("active");
      }
    }

    if (savedColor) {
      root.style.setProperty("--primary-them", savedColor);

      colorCircles.forEach((c) => c.classList.remove("active"));

      var colorInput = document.querySelector(
        `input[name="themeColor"][value="${savedColor}"]`,
      );

      if (colorInput) {
        colorInput.checked = true;
        colorInput.closest(".color-circle-wrapper").classList.add("active");
      }
    }
  }

  loadSavedTheme();
  fontCards.forEach((card) => {
    card.addEventListener("click", function () {
      fontCards.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");

      var radio = this.querySelector("input[type='radio']");
      if (radio) {
        radio.checked = true;

        root.style.setProperty("--font-family", radio.value);

        localStorage.setItem("selectedFont", radio.value);
      }
    });
  });

  colorCircles.forEach((circle) => {
    circle.addEventListener("click", function () {
      colorCircles.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");

      var radio = this.querySelector("input[type='radio']");

      if (radio) {
        radio.checked = true;

        root.style.setProperty("--primary-them", radio.value);

        localStorage.setItem("selectedColor", radio.value);
      }
    });
  });

  var resetBtn = document.querySelector(".btn-reset-custom");

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      localStorage.removeItem("selectedFont");
      localStorage.removeItem("selectedColor");

      root.style.setProperty("--font-family", '"Tajawal", sans-serif');
      root.style.setProperty("--primary-them", "#7f5ff4");

      fontCards.forEach((c) => c.classList.remove("active"));
      colorCircles.forEach((c) => c.classList.remove("active"));

      var defaultFont = document.querySelector(
        `input[name="fontOption"][value="'Tajawal', sans-serif"]`,
      );

      if (defaultFont) {
        defaultFont.checked = true;
        defaultFont.closest(".font-select-card").classList.add("active");
      }

      var defaultColor = document.querySelector(
        `input[name="themeColor"][value="#7f5ff4"]`,
      );

      if (defaultColor) {
        defaultColor.checked = true;
        defaultColor.closest(".color-circle-wrapper").classList.add("active");
      }
    });
  }
});

var projectsData = [
  {
    id: 1,
    title: "لوحة تحكم بنك",
    titleEn: "Bank Dashboard",
    description: "لوحة تحكم حديثة لإدارة الحسابات والمعاملات البنكية.",
    descriptionEn:
      "A modern banking dashboard for managing accounts and financial transactions.",
    category: "تطبيق",
    image: "assets/dash.png",
    liveLink: "https://mo3sad.github.io/dashboard/",
    githubLink: "https://github.com/Mo3sad/dashboard",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
  },
  {
    id: 2,
    title: "مطعم دينيار",
    titleEn: "Dinear Restaurant",
    description: "موقع مطعم احترافي يعرض القائمة وإمكانية الحجز.",
    descriptionEn:
      "A professional restaurant website showcasing the menu and reservation system.",
    category: "تطبيق",
    image: "assets/dinear.png",
    liveLink: "https://mo3sad.github.io/Dinner/",
    githubLink: "https://github.com/Mo3sad/Dinner",
    tags: ["HTML", "CSS", "Bootstrap" ,"JavaScript"],
  },
  {
    id: 3,
    title: "إيليت هوم",
    titleEn: "Elite Home",
    description: "موقع عقارات حديث لعرض الوحدات السكنية والمشروعات.",
    descriptionEn:
      "A modern real estate website for showcasing properties and housing projects.",
    category: "موقع ويب",
    image: "assets/elithome.png",
    liveLink: "https://mo3sad.github.io/Elitehome/",
    githubLink: "https://github.com/Mo3sad/Elitehome",
    tags: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: 4,
    title: "متجر الألعاب",
    titleEn: "Games Store",
    description: "واجهة متجر ألعاب إلكترونية بتصميم عصري ومتجاوب.",
    descriptionEn:
      "A modern responsive gaming store interface with an attractive design.",
    category: "موقع ويب",
    image: "assets/games.png",
    liveLink: "https://mo3sad.github.io/games/",
    githubLink: "https://github.com/Mo3sad/games",
    tags: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: 5,
    title: "إدارة جهات الاتصال",
    titleEn: "Contact Management",
    description: "تطبيق لإدارة جهات الاتصال مع الإضافة والتعديل والبحث.",
    descriptionEn:
      "A contact management application with add, edit, delete, and search features.",
    category: "تطبيق",
    image: "assets/contact.png",
    liveLink: "https://mo3sad.github.io/ContactHub/",
    githubLink: "https://github.com/Mo3sad/ContactHub",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
  },
];
var categoryLabels = {
  الكل: { en: "All", ar: "الكل" },
  "موقع ويب": { en: "Website", ar: "موقع ويب" },
  تطبيق: { en: "Apps", ar: "التطبيقات" },
  تصميم: { en: "Design", ar: "التصميم" },
  تجارة: { en: "E-Commerce", ar: "التجارة الإلكترونية" },
};

var currentProjectFilter = "الكل";

function refreshProjectsLanguage(lang) {
  displayProjects(currentProjectFilter, lang);
}
function displayProjects(filterCategory = "الكل", lang) {
  var projectsRow = document.getElementById("projects-row");
  if (!projectsRow) return;

  currentProjectFilter = filterCategory;
  var currentLang =
    lang || (document.documentElement.lang === "ar" ? "ar" : "en");

  projectsRow.innerHTML = "";

  var filteredProjects =
    filterCategory === "الكل"
      ? projectsData
      : projectsData.filter((project) => project.category === filterCategory);

  if (filteredProjects.length === 0) {
    var emptyMsg =
      currentLang === "ar"
        ? "لا توجد مشاريع في هذا القسم حالياً."
        : "No projects in this category yet.";
    projectsRow.innerHTML = `<div class="col-12 text-center text-muted py-5">${emptyMsg}</div>`;
    return;
  }

  filteredProjects.forEach((project) => {
    var tagsHTML = project.tags
      .map((tag) => `<span class="tag-item">${tag}</span>`)
      .join("");

    var projectTitle = currentLang === "ar" ? project.title : project.titleEn;
    var projectDesc =
      currentLang === "ar" ? project.description : project.descriptionEn;

    var badgeText =
      (categoryLabels[project.category] &&
        categoryLabels[project.category][currentLang]) ||
      project.category;

    var resolvedImgSrc = project.image;

    var previewLabel = currentLang === "ar" ? "معاينة حية" : "Live Preview";
    var githubLabel = currentLang === "ar" ? "ملف جيت" : "GitHub Repo";

    var cardHTML = `
      <div class="col-12 col-md-6 col-lg-4 animate-fade-in">
        <div class="card project-card border-0 h-100">
          <div class="project-img-wrapper">
            <img src="${resolvedImgSrc}" alt="${projectTitle}" class="img-fluid" />
          </div>

          <div class="card-body project-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="badge-design">${badgeText}</span>
              <div class="action-buttons d-flex gap-2">
                <a href="${project.liveLink}" target="_blank" class="btn-action" title="${previewLabel}">
                  <i class="far fa-eye"></i>
                </a>
                <a href="${project.githubLink}" target="_blank" class="btn-action" title="${githubLabel}">
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </div>

            <h3 class="project-title mb-2">${projectTitle}</h3>
            <p class="project-desc mb-4">${projectDesc}</p>

            <div class="project-tags mt-auto d-flex flex-wrap gap-2 justify-content-end">
              ${tagsHTML}
            </div>
          </div>
        </div>
      </div>
    `;
    projectsRow.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function initProjectFilters() {
  var filterButtons = document.querySelectorAll(
    ".filter-buttons-container .btn-work",
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) =>
        btn.classList.remove("shadow-sm", "active"),
      );

      this.classList.add("shadow-sm", "active");

      var selectedFilter = this.getAttribute("data-filter");
      displayProjects(selectedFilter);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayProjects("الكل");
  initProjectFilters();
});

emailjs.init("1jmGPPRkZwFg1YAHZ");

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_o8czub5", "template_4jtab5l", this)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "تم إرسال الرسالة",
          text: "شكراً لتواصلك، هرد عليك في أقرب وقت.",
          confirmButtonText: "حسناً",
        });

        form.reset();
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "حدث خطأ",
          text: "تعذر إرسال الرسالة، حاول مرة أخرى.",
        });
      });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const dotsContainer = document.getElementById("carouselDots");

  let currentPage = 0;

  function getCardsPerPage() {
    if (window.innerWidth <= 768) return 1;
    return 3;
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    const totalCards = track.children.length;
    const cardsPerPage = getCardsPerPage();
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      if (i === currentPage) dot.classList.add("active");

      dot.addEventListener("click", () => {
        currentPage = i;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    const cardsPerPage = getCardsPerPage();
    const card = track.querySelector(".carousel-card");
    const gap = 20;
    const cardWidth = card.getBoundingClientRect().width + gap;

    const shiftAmount = currentPage * cardsPerPage * cardWidth;
    track.style.transform = `translateX(-${shiftAmount}px)`;

    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPage);
    });
  }

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(track.children.length / getCardsPerPage());
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    currentPage = 0;
    createDots();
    updateCarousel();
  });

  createDots();
  updateCarousel();
});
