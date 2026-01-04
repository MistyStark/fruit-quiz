// quiz_logic.js
(() => {
  const APP_ID = "app";

  const state = {
    screen: "start"
  };

  function $(id) {
    return document.getElementById(id);
  }

  function mount(html) {
    const app = $(APP_ID);
    if (!app) return;
    app.innerHTML = html;
    bind();
  }

  function bind() {
    const startBtn = document.querySelector("[data-action='start']");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        alert("クイズ開始！🍎（次は問題画面を作るよ）");
      });
    }
  }

function renderStart() {
  return `
    <section class="screen bg-start start-mock" aria-label="スタート画面">
      <button class="start-btn" data-action="start" aria-label="スタート">
        スタート
      </button>
    </section>
  `;
}


  function render() {
    switch (state.screen) {
      case "start":
      default:
        return renderStart();
    }
  }

  function boot() {
    mount(render());
  }

  window.addEventListener("DOMContentLoaded", boot);
})();
