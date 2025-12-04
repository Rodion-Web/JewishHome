const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navOverlay = document.getElementById("navOverlay");

function openMobileMenu() {
  if (!toggle || !navLinks) return;
  navLinks.classList.add("active");
  toggle.classList.add("active");
  document.body.classList.add("menu-open");
  if (navOverlay) {
    navOverlay.classList.add("active");
  }
}

function closeMobileMenu() {
  if (!toggle || !navLinks) return;
  navLinks.classList.remove("active");
  toggle.classList.remove("active");
  document.body.classList.remove("menu-open");
  if (navOverlay) {
    navOverlay.classList.remove("active");
  }
}

// Team Slider - ИСПРАВЛЕННАЯ ВЕРСИЯ
let currentTeamSlide = 0;
const teamSlides = document.querySelectorAll(".team-slide");
const teamDots = document.querySelectorAll(".team-dot");
const teamPrevBtn = document.getElementById("teamPrev");
const teamNextBtn = document.getElementById("teamNext");
const totalTeamSlides = teamSlides.length;

function showTeamSlide(index) {
  // Скрываем все слайды
  teamSlides.forEach((slide) => {
    slide.style.display = "none";
    slide.classList.remove("active");
  });

  // Убираем активный класс со всех точек
  teamDots.forEach((dot) => dot.classList.remove("active"));

  // Показываем текущий слайд
  teamSlides[index].style.display = "block";
  teamSlides[index].classList.add("active");

  // Активируем соответствующую точку
  if (teamDots[index]) {
    teamDots[index].classList.add("active");
  }

  // Обновляем состояние кнопок
  if (teamPrevBtn && teamNextBtn) {
    teamPrevBtn.disabled = index === 0;
    teamNextBtn.disabled = index === totalTeamSlides - 1;
  }
}

function nextTeamSlide() {
  if (currentTeamSlide < totalTeamSlides - 1) {
    currentTeamSlide++;
    showTeamSlide(currentTeamSlide);
  }
}

function prevTeamSlide() {
  if (currentTeamSlide > 0) {
    currentTeamSlide--;
    showTeamSlide(currentTeamSlide);
  }
}

// Event listeners для кнопок навигации
if (teamNextBtn) {
  teamNextBtn.addEventListener("click", nextTeamSlide);
}
if (teamPrevBtn) {
  teamPrevBtn.addEventListener("click", prevTeamSlide);
}

// Event listeners для точек навигации
teamDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTeamSlide = index;
    showTeamSlide(currentTeamSlide);
  });
});

// Mobile Stories Slider - ИСПРАВЛЕННАЯ ВЕРСИЯ
let currentStoriesSlide = 0;
const storiesSlides = document.querySelectorAll(".story-slide");
const storiesDots = document.querySelectorAll(".stories-dot");
const storiesPrevBtn = document.getElementById("storiesPrev");
const storiesNextBtn = document.getElementById("storiesNext");
const totalStoriesSlides = storiesSlides.length;

function showStoriesSlide(index) {
  // Скрываем все слайды
  storiesSlides.forEach((slide) => {
    slide.style.display = "none";
    slide.classList.remove("active");
  });

  // Убираем активный класс со всех точек
  storiesDots.forEach((dot) => dot.classList.remove("active"));

  // Показываем текущий слайд
  storiesSlides[index].style.display = "block";
  storiesSlides[index].classList.add("active");

  // Активируем соответствующую точку
  if (storiesDots[index]) {
    storiesDots[index].classList.add("active");
  }

  // Обновляем состояние кнопок
  if (storiesPrevBtn && storiesNextBtn) {
    storiesPrevBtn.disabled = index === 0;
    storiesNextBtn.disabled = index === totalStoriesSlides - 1;
  }
}

function nextStoriesSlide() {
  if (currentStoriesSlide < totalStoriesSlides - 1) {
    currentStoriesSlide++;
    showStoriesSlide(currentStoriesSlide);
  }
}

function prevStoriesSlide() {
  if (currentStoriesSlide > 0) {
    currentStoriesSlide--;
    showStoriesSlide(currentStoriesSlide);
  }
}

// Event listeners для кнопок навигации сторис
if (storiesNextBtn) {
  storiesNextBtn.addEventListener("click", nextStoriesSlide);
}
if (storiesPrevBtn) {
  storiesPrevBtn.addEventListener("click", prevStoriesSlide);
}

// Event listeners для точек навигации сторис
storiesDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentStoriesSlide = index;
    showStoriesSlide(currentStoriesSlide);
  });
});

// Инициализация всех слайдеров при загрузке
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация слайдера команды
  if (teamSlides.length > 0) {
    teamSlides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = "none";
      }
    });
    showTeamSlide(0);
  }

  // Инициализация слайдера мероприятий
  if (storiesSlides.length > 0) {
    storiesSlides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = "none";
      }
    });
    showStoriesSlide(0);
  }
});

// Слайдер секции "цели"
document.querySelectorAll(".goal-thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = thumb.getAttribute("data-index");

    document.querySelectorAll(".goal-main-img").forEach((img) => {
      img.classList.remove("active");
    });
    document
      .querySelector(`.goal-main-img[data-index="${index}"]`)
      .classList.add("active");

    document
      .querySelectorAll(".goal-thumb")
      .forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  });
});

// Слайдер секции "цели" альтернативный
document.querySelectorAll(".alt-thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = thumb.getAttribute("data-alt-index");

    document.querySelectorAll(".alt-main-img").forEach((img) => {
      img.classList.remove("active");
    });
    document
      .querySelector(`.alt-main-img[data-alt-index="${index}"]`)
      .classList.add("active");

    document
      .querySelectorAll(".alt-thumb")
      .forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  });
});

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    }

    // Закрываем меню на мобильных
    if (navLinks && toggle) {
      navLinks.classList.remove("active");
      toggle.classList.remove("active");
    }
  });
});

// Events Stories Modal
const eventModal = document.getElementById("eventModal");
const modalClose = document.getElementById("modalClose");
const storyItems = document.querySelectorAll(".story-item");

// Данные о мероприятиях
const eventsData = {
  1: {
    title: "Лекция 'Семейные ценности'",
    date: "15 января 2025",
    time: "19:00",
    location: "Еврейский дом",
    price: "Бесплатно",
    description:
      "Присоединяйтесь к нам на увлекательную лекцию о еврейских семейных ценностях. Мы обсудим традиции, которые помогают создавать крепкие и счастливые семьи, а также поделимся практическими советами для современной жизни.",
    images: ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"],
  },
  2: {
    title: "Мастер-класс 'Еврейская кухня'",
    date: "22 января 2025",
    time: "18:00",
    location: "Еврейский дом",
    price: "500 руб.",
    description:
      "Научитесь готовить традиционные еврейские блюда! Наш мастер-класс включает приготовление халы, гефилте фиш и других любимых блюд. Все ингредиенты включены в стоимость.",
    images: ["img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"],
  },
  3: {
    title: "Семинар 'Воспитание детей'",
    date: "29 января 2025",
    time: "19:30",
    location: "Еврейский дом",
    price: "Бесплатно",
    description:
      "Практический семинар о еврейском подходе к воспитанию детей. Обсудим вопросы дисциплины, образования и передачи традиций подрастающему поколению.",
    images: ["img/3.jpg", "img/4.jpg", "img/5.jpg", "img/1.jpg"],
  },
  4: {
    title: "Праздник 'Шаббат'",
    date: "5 февраля 2025",
    time: "18:30",
    location: "Еврейский дом",
    price: "Бесплатно",
    description:
      "Приглашаем всю семью на традиционный праздник Шаббат. В программе: зажигание свечей, кидуш, трапеза и общение в теплой атмосфере.",
    images: ["img/4.jpg", "img/5.jpg", "img/1.jpg", "img/2.jpg"],
  },
  5: {
    title: "Встреча 'Молодые семьи'",
    date: "12 февраля 2025",
    time: "20:00",
    location: "Еврейский дом",
    price: "Бесплатно",
    description:
      "Специальная встреча для молодых семей. Обсудим вызовы современной семейной жизни, поделимся опытом и найдем единомышленников.",
    images: ["img/5.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg"],
  },
};

function openEventModal(eventData) {
  if (!eventData || !eventModal) return;

  const titleEl = document.getElementById("modalTitle");
  const dateEl = document.getElementById("modalDate");
  const timeEl = document.getElementById("modalTime");
  const locationEl = document.getElementById("modalLocation");
  const priceEl = document.getElementById("modalPrice");
  const descriptionEl = document.getElementById("modalDescription");
  const gallery = document.getElementById("modalGallery");

  if (
    !titleEl ||
    !dateEl ||
    !timeEl ||
    !locationEl ||
    !priceEl ||
    !descriptionEl ||
    !gallery
  ) {
    return;
  }

  titleEl.textContent = eventData.title;
  dateEl.textContent = eventData.date;
  timeEl.textContent = eventData.time;
  locationEl.textContent = eventData.location;
  priceEl.textContent = eventData.price;
  descriptionEl.textContent = eventData.description;

  gallery.innerHTML = "";
  eventData.images.forEach((imgSrc) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = eventData.title;
    img.addEventListener("click", () => {
      window.open(imgSrc, "_blank");
    });
    gallery.appendChild(img);
  });

  eventModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Открытие модального окна
storyItems.forEach((item) => {
  item.addEventListener("click", () => {
    const eventId = item.getAttribute("data-event");
    openEventModal(eventsData[eventId]);
  });
});

// Закрытие модального окна
if (modalClose && eventModal) {
  modalClose.addEventListener("click", () => {
    eventModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// Закрытие по клику на overlay
if (eventModal) {
  eventModal.addEventListener("click", (e) => {
    if (
      e.target === eventModal ||
      e.target.classList.contains("modal-overlay")
    ) {
      eventModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Закрытие по Escape
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    eventModal &&
    eventModal.classList.contains("active")
  ) {
    eventModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Свайп-жесты для мобильных сторис
let startX = 0;
let endX = 0;

storiesSlides.forEach((slide) => {
  slide.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slide.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleStoriesSwipe();
  });
});

function handleStoriesSwipe() {
  const diff = startX - endX;
  const threshold = 50;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Свайп влево - следующая сторис
      nextStoriesSlide();
    } else {
      // Свайп вправо - предыдущая сторис
      prevStoriesSlide();
    }
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");

        // Staggered animation for children
        const children = entry.target.querySelectorAll(
          ".story-item, .team-slide, .goal-container, .goal-alt-container"
        );
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("animate-on-scroll");
    observer.observe(section);
  });

  // Observe individual elements
  const elements = document.querySelectorAll(
    ".story-item, .team-slide, .goal-container, .goal-alt-container"
  );
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease-out";
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initScrollAnimations);

// Добавляем обработчики кликов для мобильных сторис
storiesSlides.forEach((slide) => {
  slide.addEventListener("click", () => {
    const eventId = slide.getAttribute("data-event");
    openEventModal(eventsData[eventId]);
  });
});

// Фиксированный навбар при прокрутке на мобильных
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const body = document.body;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Проверяем мобильное устройство и прокрутку
  if (!navbar) return;

  if (window.innerWidth <= 768 && scrollTop > 100) {
    navbar.classList.add("scrolled");
    body.classList.add("navbar-fixed");
  } else {
    navbar.classList.remove("scrolled");
    body.classList.remove("navbar-fixed");
  }
}

// Слушаем событие прокрутки
window.addEventListener("scroll", handleNavbarScroll);

// Также обрабатываем при изменении размера окна
window.addEventListener("resize", handleNavbarScroll);

// Инициализируем при загрузке
document.addEventListener("DOMContentLoaded", handleNavbarScroll);

// Форма обратной связи
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");

// Функция для отправки формы через AJAX
async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(contactForm);

  try {
    // Показываем индикатор загрузки
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;

    // Отправляем данные через AJAX
    const response = await fetch("send-email.php", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Сервис недоступен, попробуйте позже.");
    }

    const result = await response.json();

    if (result.success) {
      // Показываем сообщение об успехе
      showSuccessModal();
      // Сбрасываем форму
      contactForm.reset();
    } else {
      alert("Ошибка отправки: " + result.message);
    }

    // Восстанавливаем кнопку
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  } catch (error) {
    console.error("Ошибка отправки:", error);
    alert(
      "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз."
    );

    // Восстанавливаем кнопку
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "Отправить";
    submitBtn.disabled = false;
  }
}

// Функция показа модального окна успеха
function showSuccessModal() {
  if (!successModal) return;
  successModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Закрытие модального окна успеха
function closeSuccessModal() {
  if (!successModal) return;
  successModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Event listeners
if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}

if (successClose) {
  successClose.addEventListener("click", closeSuccessModal);
}

// Закрытие по клику на overlay
if (successModal) {
  successModal.addEventListener("click", (e) => {
    if (
      e.target === successModal ||
      e.target.classList.contains("modal-overlay")
    ) {
      closeSuccessModal();
    }
  });
}

// Закрытие по Escape
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    successModal &&
    successModal.classList.contains("active")
  ) {
    closeSuccessModal();
  }
});

// АНИМАЦИЯ СЧЁТЧИКОВ В БЛОКЕ "СТАТИСТИКА"
const statsSection = document.querySelector(".stats-section");
const statCounters = document.querySelectorAll(".stat-counter");
let statsAnimated = false;

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-target"), 10);
  const duration = 1500; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(target * progress);

    // Простое форматирование тысяч через пробел
    counter.textContent = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initStatsObserver() {
  if (!statsSection || statCounters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statCounters.forEach((counter) => animateCounter(counter));
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(statsSection);
}

document.addEventListener("DOMContentLoaded", initStatsObserver);
