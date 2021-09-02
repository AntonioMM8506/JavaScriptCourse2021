const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currenPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currenPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}//End of reset

function endRound(){
    const initialPlayerHealth = currenPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currenPlayerHealth -= playerDamage;

    if(currenPlayerHealth<=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currenPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Welcome back to life!');
    }   

    if(currentMonsterHealth<=0 && currenPlayerHealth>0){
        alert('You won!');
    }else if(currenPlayerHealth<=0 && currentMonsterHealth>0){
        alert('The monster won');
    }else if(currenPlayerHealth<=0 && currentMonsterHealth>=0){
        alert('This is a draw');
    }

    if(currenPlayerHealth<=0 || currentMonsterHealth<=0){
        reset();
    }
}//End of endRound


function attackMonster(mode){
    let maxDamage;
    if(mode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    }else if(mode === 'STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    endRound();
}//End of attack Monster


function attackHandler(){
    attackMonster('ATTACK');
}//End of attackHandler


function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
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
    endRound();
}//End of healPlayerHandler

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)