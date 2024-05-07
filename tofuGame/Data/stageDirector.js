//This is NOT a class

var hasDoneStageInit=false  //Per stage
var hasDomeGameInit=false   //Once per game

if (hasDomeGameInit)console.warn("GAME INIT SET TRUE ON START")

var readyToSpawn=false //delay before enemies spawn at the beginning of each stage
var isInCombat=false

var enemyMemory = 0
var maxEnemyMemory = 10*stage

var enemiesAlive=0  //Changed insie the genericEnemy class

var stage = 1
var stagePhase=0    
//Each stage will have 3 phases of the same difficultly, once phase reaches 3 (0,1,2,3) then the stage with progress and phase will reset to 0

var memTable=[
    2,      //Fairy
    8,      //Strong Fairy
    44,     //Miniboss
]

var fills=[ //Given the current enemy memory, how many of each type could spawn?
    0,      //How many fairies could spawn
    0,      //How many strong fairies could spawn
    0,      //How many mini bosses could spawn
]

function handleStage(){
    enemiesAlive=enemyArray.length
    
    if(!hasDomeGameInit){   //Only runs once//hiding for now
        hasDomeGameInit = true

        gameSound.playSound(12) //Play music
        setTimeout(() => { 
            let bgmTitles = new textPop([10, 700], "BGM:", "white", "30", 6, true)
            textPopArray.push(bgmTitles)
            bgmTitles = new textPop([10, 750], "The Japanese Wilderness the Girl Watched", "white", "20", 6, true)
            textPopArray.push(bgmTitles)
        }, 5000);
    }

    if(!hasDoneStageInit){  //Runs once per stage
        maxEnemyMemory = 10 * stage
        enemyMemory=0

        console.warn(maxEnemyMemory+" is new enemy mem for this stage")
        hasDoneStageInit = true
        let stageTextPop = new textPop([250, 300], "Stage " + stage + "/∞", "white", "60", 6, true, true)
        textPopArray.push(stageTextPop)

        for(let i=0;i<memTable.length;i++){ //Fill fills with how many of each enemy can be spawned on this stage
            fills[i] = Math.floor(maxEnemyMemory /memTable[i])
        }
        console.log("Fills ->\n"+fills)

        setTimeout(() => {
            readyToSpawn=true
        }, 3500);
    }

    if(readyToSpawn&&enemiesAlive<=0){  //Enemy spawning (only if the past phase has ended -> combat = false)
        globalItemGrabMod=1
        
        //The mess container
        {
        //we need to somehow get random numbers of each enemy to spawn, this should be affected by the stage (no minibosses on stage 1-5~)
        //we need to make sure that the sum of the numbers of each add up to be <= to the max memory - how to do this?
        //then simply run spawn functions with those numbers, they could be stored inside of an array (number 3 w)
        
        //maybe assign each enemy a chance var that is multiplied - divided? by the stage?
        //decreasing the amount of an enemy type over time would mean hard coding something
        //this is going to be some domb math system that im going to have to figure out
        
        //pseudo
        //Get numbers of each to spawn
            //Only allow strong and miniboss to spawn past certain stages?
            //Strong could start spawning on stage 2, mini could be on 4 or 5
            
            //if the stage is >= 2 do below for strong fairies
            //if the stage is >= 4 do below for mini bosses
        
        //The below w
            //Generate random numbers of each enemy type to spawn
            //Check if they fit within memory
        }
        //OR MAYBE JUST TRY THIS FOR NOW

        let spawnsDebug = "SPAWN TABLE:\n"
        spawnsDebug += "Fairy: " + Math.floor(fills[0] / (2+stagePhase))+"\n\tTotal Mem: "+memTable[0]*(fills[0]*0.80)+"\n"

        spawnsDebug += "Strong Fairy: " + Math.floor(fills[1] / 2)+"\n\tTotal Mem: "+memTable[1]*(fills[1]*0.20)
        console.warn(spawnsDebug)
        
        if (stage % 5 == 0&&stagePhase==0) {    //If were on stage 5, 10, 15 etc, spawn stage/5 minibosses (once on first phase)
            console.log(stagePhase+"asdasdasd")
            spawnMiniBoss(stage / 5)
        }

        spawnFairy(fills[0]*0.75)
        spawnStrongFairy(fills[1]*0.25)
        
        //its going to suck but if the game needs to be done then something like this could work
        
        //Don't allow more spawning and indicate that player is in combat
        readyToSpawn=false
        isInCombat = true
    }
    else if (isInCombat){
        if(enemiesAlive==0){
            isInCombat = false
            stagePhase++
            globalItemGrabMod=10
            if(stagePhase<3){    //if the current stage phase is less than 3 (3 phases in total), then ready another wave
                setTimeout(() => {
                    readyToSpawn = true
                }, 3000);
            }
            else{       //Otherwise, progress the difficulty
                stage++
                stagePhase=0

                setTimeout(() => {
                    hasDoneStageInit=false
                }, 1000);
                setTimeout(() => {
                    readyToSpawn = true
                }, 5000);
            }
        }
    }
}



//ENEMY SPAWING METHODS
//Reference the memTable for enemy spawn costs
//Each method rounds down the given number to spawn (math floor)

function spawnFairy(numberToSpawn){
    numberToSpawn=Math.floor(numberToSpawn)
    console.log("Trying to spawn "+numberToSpawn+" Fairies")

    for (let i = 0; i < numberToSpawn; i++) {
        if (enemyMemory == maxEnemyMemory || enemyMemory + memTable[0]>maxEnemyMemory){ //Abort loop is memory is full
            console.warn("Enemy memory was full when trying to spawn Fairy")
            return
        }
        enemyMemory += memTable[0]

        let newEnemy = new genericEnemy(0, 0, "fairy")
        enemyArray.push(newEnemy)
    }
}

function spawnStrongFairy(numberToSpawn) {
    numberToSpawn=Math.floor(numberToSpawn)
    console.log("Trying to spawn "+numberToSpawn+" Strong Fairies")

    for (let i = 0; i < numberToSpawn; i++) {
        if (enemyMemory == maxEnemyMemory || enemyMemory + memTable[1] >maxEnemyMemory){ //Abort loop is memory is full
            console.warn("Enemy memory was full when trying to spawn Strong Fairy")
            return
        }
        enemyMemory += memTable[1]

        let newEnemy = new genericEnemy(0, 0, "strongFairy")
        enemyArray.push(newEnemy)
    }
}

function spawnMiniBoss(numberToSpawn) {
    numberToSpawn=Math.floor(numberToSpawn)
    console.log("Trying to spawn "+numberToSpawn+" Mini Bosses")

    for (let i = 0; i < numberToSpawn; i++) {
        if (enemyMemory==maxEnemyMemory||enemyMemory+memTable [2]>maxEnemyMemory){ //Abort loop is memory is full
            console.warn("Enemy memory was full when trying to spawn Mini Boss")
            return
        }
        enemyMemory+=memTable [2]

        let newEnemy = new genericEnemy(0, 0, "miniBoss")
        enemyArray.push(newEnemy)
    }
}
