const playArea = document.getElementById('play-area');
const startBtn = document.getElementById('start');
const timeLabel = document.getElementById('time');
const scoreLabel = document.getElementById('score');
const highscoreLabel = document.getElementById('highscore');
const STORAGE_KEY = 'sample-01-highscore';
let timer = 20; let score = 0; let intervalId = null; let dot = null;

// 初始化最高分显示
let highscore = 0;
try {
  const s = localStorage.getItem(STORAGE_KEY);
  if (s !== null) highscore = parseInt(s, 10) || 0;
} catch (e) {
  console.warn('无法访问 localStorage:', e);
}
highscoreLabel && (highscoreLabel.textContent = highscore);

function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function spawnDot(){if(dot) dot.remove(); dot = document.createElement('button'); dot.className='dot'; dot.textContent='😊'; dot.setAttribute('aria-label','点击按钮得分');
  const w = playArea.clientWidth - 60; const h = playArea.clientHeight - 60; const x = rand(0,w); const y = rand(0,h); dot.style.left = x+'px'; dot.style.top = y+'px';
  dot.addEventListener('click', ()=>{score++; scoreLabel.textContent=score; spawnDot();});
  playArea.appendChild(dot);
}

function startGame(){score=0;timer=20;scoreLabel.textContent=score;timeLabel.textContent=timer;startBtn.disabled=true;spawnDot();
  intervalId = setInterval(()=>{timer--; timeLabel.textContent=timer; if(timer<=0){endGame()}},1000);
}
function endGame(){
  clearInterval(intervalId);
  intervalId = null;
  if (dot) dot.remove();
  startBtn.disabled = false;
  // 检查并保存最高分
  try {
    if (score > highscore) {
      highscore = score;
      localStorage.setItem(STORAGE_KEY, String(highscore));
      highscoreLabel && (highscoreLabel.textContent = highscore);
    }
  } catch (e) {
    console.warn('无法保存最高分到 localStorage:', e);
  }
  alert('时间到！你的分数：' + score + (score >= highscore ? '（已刷新最高分）' : ''));
}
startBtn.addEventListener('click', startGame);

// accessibility: allow keyboard enter to click dot
playArea.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && document.activeElement.classList.contains('dot')){document.activeElement.click();}});