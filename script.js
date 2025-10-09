// Бургер-меню
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  toggle.classList.toggle("active");
});

// Закрытие меню при клике на ссылку
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    toggle.classList.remove("active");
  });
});

// Team Slider
let currentTeamSlide = 0;
const teamSlides = document.querySelectorAll(".team-slide");
const teamDots = document.querySelectorAll(".team-dot");
const teamPrevBtn = document.getElementById("teamPrev");
const teamNextBtn = document.getElementById("teamNext");
const totalTeamSlides = teamSlides.length;

function showTeamSlide(index) {
  // Убираем активный класс со всех слайдов
  teamSlides.forEach((slide) => slide.classList.remove("active"));
  teamDots.forEach((dot) => dot.classList.remove("active"));

  // Показываем текущий слайд
  teamSlides[index].classList.add("active");
  teamDots[index].classList.add("active");

  // Обновляем состояние кнопок
  teamPrevBtn.disabled = index === 0;
  teamNextBtn.disabled = index === totalTeamSlides - 1;
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
teamNextBtn.addEventListener("click", nextTeamSlide);
teamPrevBtn.addEventListener("click", prevTeamSlide);

// Event listeners для точек навигации
teamDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTeamSlide = index;
    showTeamSlide(currentTeamSlide);
  });
});

// Автоматическое переключение слайдов (опционально)
let teamAutoSlide = setInterval(nextTeamSlide, 5000);

// Останавливаем автопрокрутку при наведении
const teamSlider = document.querySelector(".team-slider");
teamSlider.addEventListener("mouseenter", () => {
  clearInterval(teamAutoSlide);
});

teamSlider.addEventListener("mouseleave", () => {
  teamAutoSlide = setInterval(nextTeamSlide, 5000);
});

// Инициализация
showTeamSlide(0);

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
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    }

    // Закрываем меню на мобильных
    navLinks.classList.remove("active");
    toggle.classList.remove("active");
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

// Открытие модального окна
storyItems.forEach((item) => {
  item.addEventListener("click", () => {
    const eventId = item.getAttribute("data-event");
    const eventData = eventsData[eventId];

    if (eventData) {
      // Заполняем модальное окно данными
      document.getElementById("modalTitle").textContent = eventData.title;
      document.getElementById("modalDate").textContent = eventData.date;
      document.getElementById("modalTime").textContent = eventData.time;
      document.getElementById("modalLocation").textContent = eventData.location;
      document.getElementById("modalPrice").textContent = eventData.price;
      document.getElementById("modalDescription").textContent =
        eventData.description;

      // Заполняем галерею
      const gallery = document.getElementById("modalGallery");
      gallery.innerHTML = "";
      eventData.images.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = eventData.title;
        img.addEventListener("click", () => {
          // Открытие изображения в полном размере
          window.open(imgSrc, "_blank");
        });
        gallery.appendChild(img);
      });

      // Показываем модальное окно
      eventModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Закрытие модального окна
modalClose.addEventListener("click", () => {
  eventModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Закрытие по клику на overlay
eventModal.addEventListener("click", (e) => {
  if (e.target === eventModal || e.target.classList.contains("modal-overlay")) {
    eventModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Закрытие по Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && eventModal.classList.contains("active")) {
    eventModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Мобильный слайдер для мероприятий (старая версия - теперь не используется)
let currentEventIndex = 0;
const eventsArray = Array.from(storyItems);

function showEvent(index) {
  eventsArray.forEach((item, i) => {
    if (i === index) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Инициализация мобильного слайдера
function initMobileSlider() {
  if (window.innerWidth <= 768) {
    // На мобильных устройствах используем новую версию сторис
    // Старый слайдер больше не нужен
    eventsArray.forEach((item) => {
      item.style.display = "block";
    });
  } else {
    // На десктопе показываем все элементы
    eventsArray.forEach((item) => {
      item.style.display = "block";
    });
  }
}

// Инициализация при загрузке и изменении размера окна
window.addEventListener("load", initMobileSlider);
window.addEventListener("resize", initMobileSlider);

// Mobile Stories Slider
let currentStoriesSlide = 0;
const storiesSlides = document.querySelectorAll(".story-slide");
const storiesDots = document.querySelectorAll(".stories-dot");
const storiesPrevBtn = document.getElementById("storiesPrev");
const storiesNextBtn = document.getElementById("storiesNext");
const totalStoriesSlides = storiesSlides.length;

function showStoriesSlide(index) {
  // Убираем активный класс со всех слайдов
  storiesSlides.forEach((slide) => slide.classList.remove("active"));
  storiesDots.forEach((dot) => dot.classList.remove("active"));

  // Показываем текущий слайд
  storiesSlides[index].classList.add("active");
  storiesDots[index].classList.add("active");

  // Обновляем состояние кнопок
  storiesPrevBtn.disabled = index === 0;
  storiesNextBtn.disabled = index === totalStoriesSlides - 1;
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
if (storiesNextBtn && storiesPrevBtn) {
  storiesNextBtn.addEventListener("click", nextStoriesSlide);
  storiesPrevBtn.addEventListener("click", prevStoriesSlide);
}

// Event listeners для точек навигации сторис
storiesDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentStoriesSlide = index;
    showStoriesSlide(currentStoriesSlide);
  });
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

// Автоматическое переключение сторис (опционально)
let storiesAutoSlide = setInterval(nextStoriesSlide, 4000);

// Останавливаем автопрокрутку при наведении
const storiesContainer = document.querySelector(".stories-container");
if (storiesContainer) {
  storiesContainer.addEventListener("mouseenter", () => {
    clearInterval(storiesAutoSlide);
  });

  storiesContainer.addEventListener("mouseleave", () => {
    storiesAutoSlide = setInterval(nextStoriesSlide, 4000);
  });
}

// Инициализация сторис
if (storiesSlides.length > 0) {
  showStoriesSlide(0);
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
    const eventData = eventsData[eventId];

    if (eventData) {
      // Заполняем модальное окно данными
      document.getElementById("modalTitle").textContent = eventData.title;
      document.getElementById("modalDate").textContent = eventData.date;
      document.getElementById("modalTime").textContent = eventData.time;
      document.getElementById("modalLocation").textContent = eventData.location;
      document.getElementById("modalPrice").textContent = eventData.price;
      document.getElementById("modalDescription").textContent =
        eventData.description;

      // Заполняем галерею
      const gallery = document.getElementById("modalGallery");
      gallery.innerHTML = "";
      eventData.images.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = eventData.title;
        img.addEventListener("click", () => {
          // Открытие изображения в полном размере
          window.open(imgSrc, "_blank");
        });
        gallery.appendChild(img);
      });

      // Показываем модальное окно
      eventModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});
// Фиксированный навбар при прокрутке на мобильных
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const body = document.body;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Проверяем мобильное устройство и прокрутку
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
// Добавьте этот код в конец файла script.js

// Форма обратной связи
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const successClose = document.getElementById('successClose');

// Функция для отправки формы через AJAX
async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(contactForm);

  try {
    // Показываем индикатор загрузки
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    // Отправляем данные через AJAX
    const response = await fetch('send-email.php', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      // Показываем сообщение об успехе
      showSuccessModal();
      // Сбрасываем форму
      contactForm.reset();
    } else {
      alert('Ошибка отправки: ' + result.message);
    }

    // Восстанавливаем кнопку
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

  } catch (error) {
    console.error('Ошибка отправки:', error);
    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');

    // Восстанавливаем кнопку
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Отправить';
    submitBtn.disabled = false;
  }
}

// Функция показа модального окна успеха
function showSuccessModal() {
  successModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Закрытие модального окна успеха
function closeSuccessModal() {
  successModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Event listeners
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

if (successClose) {
  successClose.addEventListener('click', closeSuccessModal);
}

// Закрытие по клику на overlay
if (successModal) {
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal || e.target.classList.contains('modal-overlay')) {
      closeSuccessModal();
    }
  });
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && successModal.classList.contains('active')) {
    closeSuccessModal();
  }
});