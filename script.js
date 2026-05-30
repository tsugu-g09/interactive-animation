const loopPlayer = document.getElementById("loopPlayer");
const finishPlayer = document.getElementById("finishPlayer");
const finishBtn = document.getElementById("finishBtn");

let finishRequested = false;
let isFinishing = false;

// loop終端
loopPlayer.addEventListener("ended", () => {

  // Finish要求なし → 再ループ
  if (!finishRequested) {
    loopPlayer.currentTime = 0;
    loopPlayer.play();
    return;
  }

  // もう切替済みなら何もしない
  if (isFinishing) return;

  isFinishing = true;

  // loop隠す
  loopPlayer.style.opacity = "0";

  // finish見せる
  finishPlayer.style.opacity = "1";

  finishPlayer.currentTime = 0;
  finishPlayer.play();
});

// ボタン
finishBtn.addEventListener("click", () => {
  finishRequested = true;
});