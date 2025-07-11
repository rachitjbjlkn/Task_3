const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 50; i++) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  const size = Math.random() * 40 + 2;
  const posX = Math.random() * 200;
  const delay = Math.random() * 10;
  const duration = 10 + Math.random() * 20;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}%`;
  particle.style.bottom = `-${size}px`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.animationDuration = `${duration}s`;

  particlesContainer.appendChild(particle);
}
// Quiz functionality
const quizQuestions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: 2,
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "font", "styles", "style"],
    answer: 3,
  },
  {
    question: "How do you select an element with id 'demo' in CSS?",
    options: [".demo", "#demo", "*demo", "demo"],
    answer: 1,
  },
  {
    question: "Which property is used to change the background color?",
    options: ["color", "bgcolor", "background-color", "bg-color"],
    answer: 2,
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2,
  },
];

let currentQuestion = 0;
let score = 0;

const quizQuestionEl = document.getElementById("quiz-question");
const quizOptionsEl = document.getElementById("quiz-options");
const quizResultEl = document.getElementById("quiz-result");
const quizNextBtn = document.getElementById("quiz-next");
const quizScoreEl = document.getElementById("quiz-score");

function loadQuestion() {
  const question = quizQuestions[currentQuestion];
  quizQuestionEl.textContent = question.question;

  quizOptionsEl.innerHTML = "";
  question.options.forEach((option, index) => {
    const optionEl = document.createElement("div");
    optionEl.classList.add("quiz-option");
    optionEl.textContent = option;
    optionEl.addEventListener("click", () => selectOption(index));
    quizOptionsEl.appendChild(optionEl);
  });

  quizResultEl.style.display = "none";
  quizNextBtn.disabled = true;
  quizScoreEl.textContent = `Score: ${score}/${currentQuestion}`;
}

function selectOption(optionIndex) {
  const options = document.querySelectorAll(".quiz-option");
  options.forEach((option) => option.classList.remove("selected"));

  options[optionIndex].classList.add("selected");
  quizNextBtn.disabled = false;

  const question = quizQuestions[currentQuestion];
  if (optionIndex === question.answer) {
    quizResultEl.textContent = "Correct! 🎉";
    quizResultEl.className = "quiz-result correct";
    score++;
  } else {
    quizResultEl.textContent = `Incorrect! The correct answer is: ${
      question.options[question.answer]
    }`;
    quizResultEl.className = "quiz-result incorrect";
  }

  quizResultEl.style.display = "block";
  quizScoreEl.textContent = `Score: ${score}/${currentQuestion + 1}`;
}

quizNextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    quizQuestionEl.textContent = `Quiz completed! Your final score: ${score}/${quizQuestions.length}`;
    quizOptionsEl.innerHTML = "";
    quizResultEl.style.display = "none";
    quizNextBtn.style.display = "none";
    quizScoreEl.style.display = "none";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Quiz";
    restartBtn.className = "quiz-next";
    restartBtn.addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      loadQuestion();
      quizNextBtn.style.display = "block";
      quizScoreEl.style.display = "block";
      restartBtn.remove();
    });
    quizOptionsEl.appendChild(restartBtn);
  }
});

loadQuestion();

// Carousel functionality
const carouselInner = document.getElementById("carousel-inner");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselIndicators = document.getElementById("carousel-indicators");

const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

carouselItems.forEach((_, index) => {
  const indicator = document.createElement("div");
  indicator.classList.add("carousel-indicator");
  if (index === 0) indicator.classList.add("active");
  indicator.addEventListener("click", () => goToSlide(index));
  carouselIndicators.appendChild(indicator);
});

function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

  document
    .querySelectorAll(".carousel-indicator")
    .forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

carouselNext.addEventListener("click", nextSlide);
carouselPrev.addEventListener("click", prevSlide);

let carouselInterval = setInterval(nextSlide, 1000);

carouselInner.addEventListener("mouseenter", () => {
  clearInterval(carouselInterval);
});

carouselInner.addEventListener("mouseleave", () => {
  carouselInterval = setInterval(nextSlide, 5000);
});

// Weather app functionality
document
  .querySelector("#btn")
  .addEventListener("click", async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "80cc55c26bb8ac2ff0647dcfacc4d095";
    const resultDiv = document.getElementById("result");
    if (!city) {
      resultDiv.innerHTML = "Please enter a city name.";
      return;
    }
    resultDiv.innerHTML = "Loading...";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        resultDiv.innerHTML = "City not found!";
        return;
      }
      const data = await response.json();
      console.log(data);
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
      resultDiv.innerHTML = `
                    <img class="weather-icon" src="${iconUrl}" alt="Weather icon">
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p><b>${data.weather[0].main}</b>: ${data.weather[0].description}</p>
                    <p>🌡️: ${data.main.temp}°C</p>
                    <p>💦: ${data.main.humidity}%</p>
                    <p>💨: ${data.wind.speed} m/s</p>
                `;
    } catch (error) {
      resultDiv.innerHTML = "Error : fetching weather data.";
      resultDiv.style.color = "red";
      resultDiv.style.textShadow = "0 0 4px black";
    }
  });
  //Joke functionality

const jokeContent = document.getElementById("joke-content");
const jokeBtn = document.getElementById("joke-btn");

async function fetchJoke() {
  try {
    jokeBtn.disabled = true;
    jokeBtn.textContent = "Loading...";
    jokeContent.textContent = "Loading joke...";

    const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
    const data = await response.json();

    if (data.error) {
      jokeContent.textContent = "Failed to load joke. Try again!";
      return;
    }

    if (data.type === "single") {
      jokeContent.textContent = data.joke;
    } else {
      jokeContent.innerHTML = `${data.setup}<br><br>...${data.delivery}`;
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
    jokeContent.textContent = "Error loading joke. Please try again.";
  } finally {
    jokeBtn.disabled = false;
    jokeBtn.textContent = "Tell Me a Joke";
  }
}

jokeBtn.addEventListener("click", fetchJoke);

fetchJoke();
