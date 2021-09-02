const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER STRONG ATTACK";
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_EVENT_GAME_OVER = 'GAME OVER';

let battleLog = [];

const enteredValue = prompt('Maximum Life for you and the monster', '100'); //Used so the user can enter a value
let chosenMaxLife = parseInt(enteredValue);
//Validates that the entered value is a number
if(isNaN(chosenMaxLife) || chosenMaxLife<=0){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currenPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth){
    let logEntry  = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    if(ev == LOG_EVENT_PLAYER_ATTACK || ev == LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER';        
    }else if(ev == LOG_EVENT_MONSTER_ATTACK || ev == LOG_EVENT_PLAYER_HEAL || ev == LOG_EVENT_GAME_OVER){
        logEntry.target = 'PLAYER';
    }

    battleLog.push(logEntry);
}//End of writeToLog


function reset(){
    currentMonsterHealth = chosenMaxLife;
    currenPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}//End of reset


function endRound(){
    const initialPlayerHealth = currenPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currenPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currenPlayerHealth);

    if(currenPlayerHealth<=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currenPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Welcome back to life!');
    }   

    if(currentMonsterHealth<=0 && currenPlayerHealth>0){
        alert('You won!');
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currenPlayerHealth);
    }else if(currenPlayerHealth<=0 && currentMonsterHealth>0){
        alert('The monster won');
        writeToLog(LOG_EVENT_MONSTER_ATTACK, 'MONSTER WON', currentMonsterHealth, currenPlayerHealth);
    }else if(currenPlayerHealth<=0 && currentMonsterHealth>=0){
        alert('This is a draw');
        writeToLog(LOG_EVENT_MONSTER_ATTACK, 'DRAW', currentMonsterHealth, currenPlayerHealth);
    }

    if(currenPlayerHealth<=0 || currentMonsterHealth<=0){
        reset();
    }
}//End of endRound


function attackMonster(mode){
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE: STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK: LOG_EVENT_PLAYER_STRONG_ATTACK; 
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currenPlayerHealth);

    endRound();
}//End of attack Monster


function attackHandler(){
    attackMonster(MODE_ATTACK);
}//End of attackHandler


function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATACK);
}//End of strongAttackHandler


function healPlayerHandler(){
    let healValue;
    if(currenPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert('You can not heal more than your initial max health');
        healValue = chosenMaxLife - currenPlayerHealth;
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currenPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currenPlayerHealth);

    endRound();
}//End of healPlayerHandler


function printLogHandler(){
    console.log(battleLog);
}//End of printLogHandler


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
