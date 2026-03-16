const playArea = document.getElementById('play-area');
const startBtn = document.getElementById('start');
const timeLabel = document.getElementById('time');
const scoreLabel = document.getElementById('score');
let timer = 20; let score = 0; let intervalId = null; let dot = null;

function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function spawnDot(){if(dot) dot.remove(); dot = document.createElement('button'); dot.className='dot'; dot.textContent='😊'; dot.setAttribute('aria-label','点击按钮得分');
  const w = playArea.clientWidth - 60; const h = playArea.clientHeight - 60; const x = rand(0,w); const y = rand(0,h); dot.style.left = x+'px'; dot.style.top = y+'px';
  dot.addEventListener('click', ()=>{score++; scoreLabel.textContent=score; spawnDot();});
  playArea.appendChild(dot);
}

function startGame(){score=0;timer=20;scoreLabel.textContent=score;timeLabel.textContent=timer;startBtn.disabled=true;spawnDot();
  intervalId = setInterval(()=>{timer--; timeLabel.textContent=timer; if(timer<=0){endGame()}},1000);
}
function endGame(){clearInterval(intervalId); intervalId=null; if(dot) dot.remove(); startBtn.disabled=false; alert('时间到！你的分数：'+score);} 
startBtn.addEventListener('click', startGame);

// accessibility: allow keyboard enter to click dot
playArea.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && document.activeElement.classList.contains('dot')){document.activeElement.click();}});