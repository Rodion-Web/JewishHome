const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const photos = document.querySelectorAll(".team-photo");
const details = document.getElementById("team-details");
const bigPhoto = document.getElementById("team-photo-big");

function updateTeamDetails(photo) {
  photos.forEach((p) => p.classList.remove("active"));
  photo.classList.add("active");

  // Меняем большое фото
  // Подставляем аналогичный аватар большего размера (пример)
  // Тут использованы ссылки pravatar — для демонстрации, у тебя свои src
  let bigSrc = photo.src.replace("60", "350");
  bigPhoto.src = bigSrc;
  bigPhoto.alt = photo.alt;

  // Меняем текст справа
  details.innerHTML = `
        <div class="team-title">
          <h2 class="team-name">${photo.dataset.name}</h2>
          <p class="team-position">/ ${photo.dataset.role.toUpperCase()}</p>
        </div>
        <div class="team-message">
          <p><strong>${photo.dataset.intro}</strong></p>
          <p>${photo.dataset.desc}</p>
        </div>
        <div class="team-quote">
          <strong>ЛЮБИМАЯ ФРАЗА</strong>
          <p>«${photo.dataset.quote || "Цитата не указана"}»</p>
        </div>
      `;
}

photos.forEach((photo) => {
  photo.addEventListener("click", () => updateTeamDetails(photo));
});

if (photos.length > 0) {
  updateTeamDetails(photos[0]);
}

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
