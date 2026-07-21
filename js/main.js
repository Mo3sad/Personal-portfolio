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
    title: "موقع شخصي إبداعي",
    description: "تصميم موقع شخصي بأسلوب عصري وألوان جريئة",
    category: "تصميم",
    image: "assets/p-3.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["Figma", "UI/UX", "Prototype"],
  },
  {
    id: 2,
    title: "تطبيق إدارة المهام",
    description: "تطبيق ويب تفاعلي لإدارة المهام مع ميزات التعاون الجماعي",
    category: "تطبيق",
    image: "assets/p-2.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["Vue.js", "Firebase", "Tailwind"],
  },
  {
    id: 3,
    title: "متجر إلكتروني متكامل",
    description: "منصة تجارة إلكترونية حديثة مع نظام دفع آمن وإدارة المنتجات",
    category: "موقع ويب",
    image: "assets/p-1.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    title: "متجر أزياء فاخر",
    description: "منصة تسوق راقية للأزياء مع تجربة مستخدم استثنائية",
    category: "تجارة",
    image: "assets/p-6.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["Next.js", "Stripe", "Sanity"],
  },
  {
    id: 5,
    title: "لوحة تحليلات اجتماعية",
    description: "منصة تحليل وإدارة حسابات التواصل الاجتماعي",
    category: "تطبيق",
    image: "assets/p-5.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["React", "Chart.js", "API"],
  },
  {
    id: 6,
    title: "موقع شركة استشارية",
    description: "موقع احترافي لشركة استشارات مع نظام حجز المواعيد",
    category: "موقع ويب",
    image: "assets/p-4.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["Next.js", "TypeScript", "Prisma"],
  },
  {
    id: 7,
    title: "تصميم تطبيق جوال",
    description: "تصميم UI/UX كامل لتطبيق جوال متعدد الوظائف",
    category: "تصميم",
    image: "assets/p-9.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["Figma", "Adobe XD", "Sketch"],
  },
  {
    id: 8,
    title: "تطبيق لياقة بدنية",
    description: "تطبيق متكامل لتتبع التمارين والتغذية والتقدم",
    category: "تطبيق",
    image: "assets/p-8.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["React Native", "Redux", "Firebase"],
  },
  {
    id: 9,
    title: "موقع مطعم وتوصيل",
    description: "منصة طلب طعام مع نظام توصيل وتتبع الطلبات",
    category: "موقع ويب",
    image: "assets/p-7.webp",
    liveLink: "#",
    githubLink: "#",
    tags: ["React", "Express", "PostgreSQL"],
  },
];
function displayProjects(filterCategory = "الكل") {
  var projectsRow = document.getElementById("projects-row");
  if (!projectsRow) return;

  projectsRow.innerHTML = "";

  var filteredProjects =
    filterCategory === "الكل"
      ? projectsData
      : projectsData.filter((project) => project.category === filterCategory);

  if (filteredProjects.length === 0) {
    projectsRow.innerHTML = `<div class="col-12 text-center text-muted py-5">لا توجد مشاريع في هذا القسم حالياً.</div>`;
    return;
  }

  filteredProjects.forEach((project) => {
    var tagsHTML = project.tags
      .map((tag) => `<span class="tag-item">${tag}</span>`)
      .join("");

    let badgeText = project.category;
    if (project.category === "تجارة") badgeText = "تجارة إلكترونية";

    var resolvedImgSrc = project.image;

    var cardHTML = `
      <div class="col-12 col-md-6 col-lg-4 animate-fade-in">
        <div class="card project-card border-0 h-100">
          <div class="project-img-wrapper">
            <img src="${resolvedImgSrc}" alt="${project.title}" class="img-fluid" />
          </div>

          <div class="card-body project-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="badge-design">${badgeText}</span>
              <div class="action-buttons d-flex gap-2">
                <a href="${project.liveLink}" class="btn-action" title="معاينة حية">
                  <i class="far fa-eye"></i>
                </a>
                <a href="${project.githubLink}" class="btn-action" title="ملف جيت">
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </div>

            <h3 class="project-title mb-2">${project.title}</h3>
            <p class="project-desc mb-4">${project.description}</p>

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
