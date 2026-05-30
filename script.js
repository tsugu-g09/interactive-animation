const loopPlayer = document.getElementById("loopPlayer");
const finishPlayer = document.getElementById("finishPlayer");
const finishBtn = document.getElementById("finishBtn");

let finishRequested = false;
let isFinishing = false;

// 最初はfinishを非表示
finishPlayer.style.opacity = "0";

// finishを事前ロード
finishPlayer.load();

// 再生準備完了フラグ
let finishReady = false;

finishPlayer.addEventListener("canplaythrough", () => {
  finishReady = true;
  console.log("finish ready");
});

// スマホ向けウォームアップ
window.addEventListener("load", async () => {
  try {
    finishPlayer.muted = true;

    // 一瞬だけ再生して停止（デコード準備）
    await finishPlayer.play();
    finishPlayer.pause();
    finishPlayer.currentTime = 0;

  } catch (e) {
    console.log("warmup skipped");
  }
});

// loop終端
loopPlayer.addEventListener("ended", async () => {

  // 通常ループ
  if (!finishRequested) {
    loopPlayer.currentTime = 0;
    loopPlayer.play();
    return;
  }

  if (isFinishing) return;

  isFinishing = true;

  // finishが準備できてなければ少し待つ
  if (!finishReady) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }

finishPlayer.currentTime = 0;

// 先に再生開始
await finishPlayer.play();

// 1フレーム待つ（描画を待機）
requestAnimationFrame(() => {
  // このタイミングで切替
  loopPlayer.style.opacity = "0";
  finishPlayer.style.opacity = "1";
});
});

// Finishボタン
finishBtn.addEventListener("click", () => {
  finishRequested = true;
});