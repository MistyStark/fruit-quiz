(() => {
  const APP_ID = "app";

  const state = {
    screen: "start", // start | quiz
    quiz: {
      question: "苺",
      choices: [
        "じろうがき", "きよみ",
        "いちご", "あんず",
        "すもも", "りんご",
        "ざくろ", "とう",
        "かき", "くわのみ"
      ],
      selectedIndex: null,
      locked: false,
    },
  };

  const START_IMAGES = [
    "images/011_start.png",
    "images/012_start.png",
    "images/013_start.png",
    "images/014_start.png",
  ];

  const $ = (id) => document.getElementById(id);

  function pickStartImage() {
    const i = Math.floor(Math.random() * START_IMAGES.length);
    return START_IMAGES[i];
  }

  function applyRandomStartBg() {
    const startScreen = document.getElementById("startScreen");
    if (!startScreen) return;

    const img = pickStartImage();

    // 画像 + うっすら紙っぽい下地（真っ白画像でも違和感が出にくい）
    // 画像自体が白背景なら、下地はほぼ見えない
    startScreen.style.backgroundImage = `
      url("${img}"),
      linear-gradient(180deg, #ffffff, #ffffff)
    `;
    startScreen.style.backgroundRepeat = "no-repeat";
    startScreen.style.backgroundPosition = "center";
    startScreen.style.backgroundSize = "contain";
  }

  function mount(html) {
    const app = $(APP_ID);
    if (!app) return;

    app.innerHTML = html;

    // ★ DOMが描画された後に背景を当てる
    if (state.screen === "start") {
      applyRandomStartBg();
    }

    bind();
  }

  function bind() {
    if (state.screen === "start") {
      const startBtn = document.querySelector(".start-btn");
      if (!startBtn) return;

      startBtn.addEventListener("click", () => {
        state.screen = "quiz";
        mount(render());
      });

      return;
    }

    // quiz
    const okBtn = document.querySelector(".ok-btn");
    const choiceBtns = document.querySelectorAll(".choice-btn");
    if (!okBtn) return;

    choiceBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.quiz.locked) return;
        state.quiz.selectedIndex = Number(btn.dataset.index);
        mount(render());
      });
    });

    okBtn.addEventListener("click", () => {
      if (state.quiz.locked) return;
      if (state.quiz.selectedIndex === null) return;

      state.quiz.locked = true;
      mount(render());
      console.log("ANSWER FIXED:", state.quiz.selectedIndex);
    });
  }

  function renderStart() {
    return `
      <section class="screen bg-start start-mock" id="startScreen" aria-label="スタート画面">
        <button class="start-btn" aria-label="スタート">スタート</button>
      </section>
    `;
  }

  function renderQuiz() {
    const okDisabled =
      state.quiz.selectedIndex === null || state.quiz.locked
        ? 'disabled="disabled"'
        : "";

    return `
      <section class="screen paper-bg" aria-label="クイズ画面">
        <div class="paper-card quiz-wrap">
          <div class="pad">
            <div class="quiz-title-kanji">${state.quiz.question}</div>
            <div class="hr"></div>

            <div class="choice-grid">
              ${state.quiz.choices
                .map((choice, index) => {
                  const sel = state.quiz.selectedIndex === index ? "is-selected" : "";
                  return `
                    <button class="choice-btn ${sel}" data-index="${index}">
                      ${choice}
                    </button>
                  `;
                })
                .join("")}
            </div>

            <div class="quiz-blank" aria-hidden="true"></div>

            <div class="quiz-bottom">
              <button class="btn btn-green btn-pill ok-btn" ${okDisabled}>OK</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function render() {
    return state.screen === "start" ? renderStart() : renderQuiz();
  }

  window.addEventListener("DOMContentLoaded", () => mount(render()));
})();
