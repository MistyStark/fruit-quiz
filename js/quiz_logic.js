(() => {
  const APP_ID = "app";
  const CHOICE_COUNT = 16;
  const QUIZ_COUNT = 10;

  const START_IMAGES = [
    "images/011_start.png",
    "images/012_start.png",
    "images/013_start.png",
    "images/014_start.png",
  ];

  const state = {
    screen: "start", // start | quiz | knowledge | result
    quiz: {
      order: [],
      index: 0,
      choices: [],
      selected: null,
      phase: "select", // select | result
      isCorrect: false,
      history: [] // {kanji, your, answer, correct}
    }
  };

  const $ = (id) => document.getElementById(id);

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickStartImage() {
    const i = Math.floor(Math.random() * START_IMAGES.length);
    return START_IMAGES[i];
  }

  // 10問を重複なしで抽選
  function buildOrder10() {
    const indices = QUIZ_DATA.map((_, i) => i);
    return shuffle(indices).slice(0, Math.min(QUIZ_COUNT, indices.length));
  }

  function generateChoices(correctYomi) {
    const pool = QUIZ_DATA.map(q => q.yomi).filter(y => y !== correctYomi);
    const uniqPool = Array.from(new Set(pool));
    const picked = shuffle(uniqPool).slice(0, Math.max(0, CHOICE_COUNT - 1));
    const merged = shuffle([...picked, correctYomi]);
    while (merged.length < CHOICE_COUNT) merged.push(correctYomi);
    return merged.slice(0, CHOICE_COUNT);
  }

  function currentQuestion() {
    const qIndex = state.quiz.order[state.quiz.index];
    return QUIZ_DATA[qIndex];
  }

  function resetGame() {
    state.screen = "quiz";
    state.quiz.order = buildOrder10();
    state.quiz.index = 0;
    state.quiz.history = [];
    prepareQuestion();
  }

  function prepareQuestion() {
    const q = currentQuestion();
    state.quiz.choices = generateChoices(q.yomi);
    state.quiz.selected = null;
    state.quiz.phase = "select";
    state.quiz.isCorrect = false;
    mount(render());
  }

  function showResultJudge() {
    const q = currentQuestion();
    const your = state.quiz.choices[state.quiz.selected];
    const answer = q.yomi;
    const correct = (your === answer);

    state.quiz.isCorrect = correct;
    state.quiz.phase = "result";

    state.quiz.history.push({
      kanji: q.kanji,
      your,
      answer,
      correct
    });

    mount(render());
  }

  function goNextFromJudge() {
    const isLast = (state.quiz.index >= state.quiz.order.length - 1);
    if (isLast) {
      state.screen = "result";
      mount(render());
      return;
    }
    state.quiz.index += 1;
    prepareQuestion();
  }

  function correctCount() {
    return state.quiz.history.filter(r => r.correct).length;
  }

  /* =========================
     knowledge screen control
     ========================= */

  function openKnowledge() {
    state.screen = "knowledge";
    mount(render());
  }

  /* =========================
     render
     ========================= */

  function renderStart() {
    const bg = pickStartImage();
    return `
      <section class="screen start-mock paper-bg" id="startScreen" style="background-image:url('${bg}')">
        <button class="btn btn-pill start-btn" type="button">スタート</button>
      </section>
    `;
  }

  function renderQuiz() {
    const q = currentQuestion();
    const isJudge = state.quiz.phase === "result";
    const okDisabled = state.quiz.selected === null ? "disabled" : "";

    const headerMini = `
      <div class="quiz-mini">
        <span class="quiz-mini-label">もんだい</span>
        <span class="quiz-mini-count">${state.quiz.index + 1}/${state.quiz.order.length}</span>
      </div>
    `;

    const judgeArea = isJudge ? `
      <div class="result-area">
        <div class="result-banner ${state.quiz.isCorrect ? "is-correct" : "is-wrong"}">
          <span class="result-banner-text">${state.quiz.isCorrect ? "せいかい" : "おしいね"}</span>
          <span class="result-emoji" aria-hidden="true">${state.quiz.isCorrect ? "👏" : "🙂"}</span>
        </div>

        <div class="result-answer">
          こたえ：<span class="result-yomi">${q.yomi}</span>
        </div>
      </div>
    ` : "";

    const bodyArea = !isJudge ? `
      <div class="choice-grid" role="list">
        ${state.quiz.choices.map((choice, idx) => {
      const isSelected = state.quiz.selected === idx ? "is-selected" : "";
      return `<button class="choice-btn ${isSelected}" data-index="${idx}" type="button">${choice}</button>`;
    }).join("")}
      </div>

      <div class="quiz-bottom">
        <button class="btn btn-pill ok-btn" type="button" ${okDisabled}>OK</button>
      </div>
    ` : `
      <div class="result-actions">
        <button class="btn btn-pill memo-btn" type="button">この果物って？</button>
        <button class="btn btn-pill next-btn" type="button">つぎへ</button>
      </div>
    `;

    return `
      <section class="screen paper-bg" id="quizScreen">
        <div class="quiz-wrap">
          <div class="paper-card">
            <div class="pad">
              ${headerMini}
              <div class="quiz-title-kanji" id="kanji">${q.kanji}</div>
              <div class="hr"></div>
              ${judgeArea}
              ${bodyArea}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderKnowledge() {
    const q = currentQuestion();
    const memoText = q.memo?.text ?? "（説明がありません）";
    const season = q.memo?.season ?? "";
    const area = q.memo?.area ?? "";
    const image = q.memo?.image ?? "";

    const meta = `
      <div class="memo-meta">
        ${season ? `<div class="meta-row"><span class="meta-label">季節</span><span class="meta-value">${escapeHtml(season)}</span></div>` : ""}
        ${area ? `<div class="meta-row"><span class="meta-label">産地</span><span class="meta-value">${escapeHtml(area)}</span></div>` : ""}
      </div>
    `;

    const imgArea = image ? `
      <div class="k-image-frame">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(q.kanji)} の写真">
      </div>
    ` : "";

    return `
      <section class="screen paper-bg" id="knowledgeScreen">
        <div class="quiz-wrap">
          <div class="paper-card knowledge-card">
            <div class="pad">
              <div class="memo-top">
                <div class="memo-kanji">${escapeHtml(q.kanji)}</div>
                <div class="memo-yomi">${escapeHtml(q.yomi)}</div>
              </div>

              ${meta}
              ${imgArea}

              <div class="memo-text" aria-label="豆知識">
                ${escapeHtml(memoText).replaceAll("\n", "<br>")}
              </div>

              <div class="memo-actions">
                <button class="btn btn-pill next-btn next-from-knowledge" type="button">つぎへ</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderResult() {
    const total = state.quiz.history.length;
    const ok = correctCount();

    const rows = state.quiz.history.map((r) => `
      <div class="res-row ${r.correct ? "is-ok" : "is-ng"}">
        <div class="res-q">${r.kanji}</div>
        <div class="res-your">${r.your}</div>
        <div class="res-ans">${r.answer}</div>
        <div class="res-arrow">›</div>
      </div>
    `).join("");

    return `
      <section class="screen paper-bg" id="resultScreen">
        <div class="quiz-wrap">
          <div class="paper-card result-card">
            <div class="pad">
              <div class="res-top">
                <div class="res-title">正解数</div>
                <div class="res-score">
                  <span class="res-score-main">${ok}</span><span class="res-score-sub">/${total}</span>
                </div>
              </div>

              <div class="res-msg">
                <div class="res-msg-1">いい脳トレでした ✨</div>
                <div class="res-msg-2">おつかれさま 🙂</div>
              </div>

              <div class="res-table">
                <div class="res-head">
                  <div>問題</div><div>あなた</div><div>こたえ</div><div></div>
                </div>
                <div class="res-body">
                  ${rows}
                </div>
              </div>

              <div class="res-actions">
                <button class="btn btn-pill next-btn again-btn" type="button">もういちど</button>
                <button class="btn btn-pill next-btn end-btn" type="button">おわる</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function render() {
    if (state.screen === "start") return renderStart();
    if (state.screen === "knowledge") return renderKnowledge();
    if (state.screen === "result") return renderResult();
    return renderQuiz();
  }

  /* =========================
     mount / events
     ========================= */

  function mount(html) {
    const app = $(APP_ID);
    if (!app) return;
    app.innerHTML = html;

    if (state.screen === "start") {
      const btn = document.querySelector(".start-btn");
      if (btn) btn.addEventListener("click", resetGame);
      return;
    }

    if (state.screen === "result") {
      const again = document.querySelector(".again-btn");
      const end = document.querySelector(".end-btn");

      if (again) again.addEventListener("click", resetGame);
      if (end) end.addEventListener("click", () => {
        state.screen = "start";
        mount(render());
      });
      return;
    }

    if (state.screen === "knowledge") {
      const next = document.querySelector(".next-from-knowledge");
      if (next) next.addEventListener("click", () => {
        // knowledgeでは「つぎへ」しか無い：そのまま次の問題へ（最後なら結果へ）
        state.screen = "quiz";
        goNextFromJudge();
      });
      return;
    }

    // quiz
    const isJudge = state.quiz.phase === "result";

    if (!isJudge) {
      document.querySelectorAll(".choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          state.quiz.selected = Number(btn.dataset.index);
          mount(render());
        });
      });

      const okBtn = document.querySelector(".ok-btn");
      if (okBtn) okBtn.addEventListener("click", () => {
        if (state.quiz.selected === null) return;
        showResultJudge();
      });

      return;
    }

    // judge
    const memoBtn = document.querySelector(".memo-btn");
    const nextBtn = document.querySelector(".next-btn");
    if (memoBtn) memoBtn.addEventListener("click", openKnowledge);
    if (nextBtn) nextBtn.addEventListener("click", goNextFromJudge);
  }

  window.addEventListener("DOMContentLoaded", () => mount(render()));
})();
