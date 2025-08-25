const STORAGE_KEY = "studyData";

// データをロード
function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data)
    : { day: 1, lastDate: null, totalTime: 0, timeLeft: null };
}

// データを保存
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ノルマ時間（秒）
function getGoalTime(day) {
  let minutes = day * 5;
  if (minutes > 180) minutes = 180;
  return minutes * 60;
}

// 秒を mm:ss に変換
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// 初期化
let timer;
let isRunning = false;
let data = loadData();
data.day = Number(data.day) || 1;
data.totalTime = Number(data.totalTime) || 0;
data.timeLeft =
  data.timeLeft !== null && data.timeLeft > 0
    ? Number(data.timeLeft)
    : getGoalTime(data.day);

const todayStr = new Date().toDateString();

// ストリーク判定
if (data.lastDate !== todayStr) {
  const lastDateObj = data.lastDate ? new Date(data.lastDate) : null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (lastDateObj && lastDateObj.toDateString() === yesterday.toDateString()) {
    // 前日達成 → 継続
    data.day++;
    if (!data.timeLeft || data.timeLeft <= 0)
      data.timeLeft = getGoalTime(data.day);
  } else {
    // 連続途切れ → リセット
    data.day = 1;
    data.timeLeft = getGoalTime(data.day);
  }
  data.lastDate = todayStr;
  saveData(data);
}

// DOM
const dayEl = document.getElementById("day");
const timeEl = document.getElementById("time");
const totalEl = document.getElementById("total");
const startStopBtn = document.getElementById("startStop");

// 表示更新
function updateDisplay() {
  dayEl.textContent = `現在: ${data.day}日目`;
  timeEl.textContent = formatTime(data.timeLeft);
  const totalMinutes = Math.floor(data.totalTime / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  totalEl.textContent = `累計勉強時間: ${hours}時間${minutes}分`;

  // ノルマ達成済みならボタン無効化
  if (data.timeLeft <= 0) {
    startStopBtn.disabled = true;
    startStopBtn.textContent = "今日のノルマ達成済み";
  } else {
    startStopBtn.disabled = false;
    startStopBtn.textContent = isRunning ? "ストップ" : "スタート";
  }
}

// タイマー処理
function tick() {
  if (data.timeLeft > 0) {
    data.timeLeft--;
    data.totalTime++;
    saveData(data);
    updateDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;
    saveData(data);
    updateDisplay();
    alert("今日のノルマ達成！次の日に進めます。");
  }
}

// スタート/ストップ
startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    timer = setInterval(tick, 1000);
    isRunning = true;
    updateDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;
    saveData(data);
    updateDisplay();
  }
});

// 初期表示
updateDisplay();
