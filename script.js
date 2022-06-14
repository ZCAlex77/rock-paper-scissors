window.onload = () =>{
  const options = ['rock', 'paper', 'scissors'],
        attacks = {rock: 0x270A, paper: 0x270B, scissors: 0x270C},
        attackDisplay = document.querySelectorAll('.attack'),
        damageDisplay = document.querySelectorAll('.damage'),
        healthBars = document.querySelectorAll('meter');
        attackBtn = document.querySelectorAll('.option');

  const endGame = (winner) =>{
    document.querySelector('#winner').textContent = winner;
    document.querySelector('#restart').style.display = 'flex';
  }
  const restart = () =>{
    healthBars.forEach(bar => bar.value = 100);
    attackDisplay.forEach(display => display.textContent = '');
    document.querySelector('#restart').style.display = 'none';
  }
  const displayAttack = (player, computer) => {
    attackDisplay[0].textContent = String.fromCodePoint(attacks[player]);
    attackDisplay[1].textContent = String.fromCodePoint(attacks[computer]);
  }
  const damagePlayer = (loser) => {
    damageDisplay[loser].style.display = 'block';
    damageDisplay[loser].style.animationPlayState = 'running';
    healthBars[loser].value -= 20;
    setTimeout(function(){damageDisplay[loser].style.animationPlayState = 'paused'; damageDisplay[loser].style.display = 'none';}, 1000);
    if(healthBars[loser].value === 0) endGame(['COMPUTER', 'YOU'][1*loser]);
  }
  const computerPlay = () => options[Math.floor(Math.random()*2)];
  const playRound = (playerSelection, computerSelection) =>{
    displayAttack(playerSelection, computerSelection);
    if(playerSelection === computerSelection) return;
    switch(playerSelection){
      case 'rock': damagePlayer(computerSelection === 'scissors'? 1 : 0); break;
      case 'paper': damagePlayer(computerSelection === 'rock'? 1 : 0); break;
      case 'scissors': damagePlayer(computerSelection === 'paper'? 1 : 0); break;
    }
  }

  attackBtn[0].addEventListener('click', () => playRound('rock', computerPlay()));
  attackBtn[1].addEventListener('click', () => playRound('paper', computerPlay()));
  attackBtn[2].addEventListener('click', () => playRound('scissors', computerPlay()));
  document.querySelector('#restart-btn').addEventListener('click', restart);
}