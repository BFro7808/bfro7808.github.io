class player{
    constructor(){
        this.position=[400,700]

        this.playerMoveSpeed=9
        this.shiftSpeedMod=1    //Modified later in code when the player holds SHIFT

        this.attacking=true     //Is the player firing?
        this.attackReady=true   //Is the cool down between shots over?

        this.realWidth=40
        this.realHeight=40

        this.width=10 //These are used for the hitbox of the square
        this.height=10

        this.invul=false //Is the NOT player able to be hit?
        this.hasRunInvulInit=false  //used to begin the invul flashing
        this.alpha=1    //used for the flashing again

        this.timeToElapse=0  //Used in the flashing function

        this.hp=10 //player health

        this.shouldDraw=true    //Used for hiding the player after they die
    }

    //Movement functions
    update(curKeys,newKeys){
        if(this.invul)  this.flash()
        this.playerFiringHandeler()
        //In order of WASD keys
        this.checkInBounds()

        if (newKeys[27]) pauseGame()    //Game is able to be unpaused because this line is in gamestate==pause line in update method

        if(newKeys[69]){
            this.usePower()
        }

        if (debug && curKeys[81]) killAll() //holding q and debug is on
        
        if(debug&&curKeys[82]){ //Holding r and debug mode is on
            let newItem = new item("power", this.getRandomID(), this.position, this.width)
            itemsArray.push(newItem)
        }

        if(curKeys[87]){//W
            this.position[1]-=this.playerMoveSpeed*this.shiftSpeedMod
            this.updateFollowersPosition()
        }
        
        if(curKeys[65]){//A
            this.position[0]-=this.playerMoveSpeed*this.shiftSpeedMod
            this.updateFollowersPosition()
        }
        
        if(curKeys[83]){//S
            this.position[1]+=this.playerMoveSpeed*this.shiftSpeedMod
            this.updateFollowersPosition()
        }

        if(curKeys[68]){//D
            this.position[0]+=this.playerMoveSpeed*this.shiftSpeedMod
            this.updateFollowersPosition()
        }

        //this if else checks to see if the player is holding any combination of W or S and A or D,
        //if true, then the player's movement speed is reduced so as not to give them a speed boost for holding two keys
        if((curKeys[87]||curKeys[83])&&(curKeys[65]||curKeys[68])) this.playerMoveSpeed=7
        else    this.playerMoveSpeed=9

        this.checkInBounds()

        if(curKeys[16]){
            this.shiftSpeedMod=0.6
            playerWeapon="regular"
        }
        else{
            this.shiftSpeedMod=1
            playerWeapon="scatter"
        }
    }

    playerFiringHandeler(){
        if(!(this.attacking&&this.attackReady)) return  //If the cooldown is not gone or is told not to attack
        this.startAttackCoolDown()

        let newBullets=[]
        //playerWeapon is declared in the main file
        //weapon is now modified by holding SHIFT
        if(playerWeapon=="regular"){
            //Middle bullet
            let id=this.getRandInt(1000000,9999999)
            newBullets.push(new playerBullet(this.position[0] - playerObject.realWidth/2, this.position[1], 0,-20,id))
            id=this.getRandInt(1000000,9999999)
            newBullets.push(new playerBullet(this.position[0] + playerObject.realWidth/2, this.position[1], 0,-20,id))
        }
        else if(playerWeapon=="scatter"){
            for (let i = 0; i < 1;i++){ //loop here in case i want to increase count
                let id = this.getRandInt(1000000, 9999999)
                let randomXDrift=this.getRandFloat(0.1,1) //added into new bullet object
                if(this.getRandFloat(0.1,1)>0.5) randomXDrift*=-1

                newBullets.push(new playerBullet(this.position[0],this.position[1], randomXDrift*3,-8,id))
            }
        }
        
        this.pushNewBullets(newBullets) //Function that pushes all the newly made bullets to the playerBulletsArray array
    }

    draw(c){
        if(this.shouldDraw){
            c.globalAlpha=this.alpha    //Will be modified by the flash function
            c.fillStyle="blue"
            c.fillRect(this.position[0]-this.realWidth/2,this.position[1]-this.realHeight/2.5,this.realWidth,this.realHeight)
            c.globalAlpha=1
            c.fillStyle="white"
            c.fillRect(this.position[0]-this.width/2,this.position[1],this.width,this.height)
        }
    }

    flash(){ //Used to create the flashing effect for the player while invul is true
        if(!this.hasRunInvulInit){
            this.timeToElapse=fps*5 //should be five seconds
            this.hasRunInvulInit=true
        }

        this.timeToElapse--

        if(this.timeToElapse%fps==0){
            this.alpha=1
        }
        else if(this.timeToElapse%2==0){
            this.alpha=0.5
        }
        else if(this.timeToElapse%3==0){
            this.alpha=1
        }
        else{
            this.alpha=0.5
        }
        //In theory, this should have the value of fps*5 - fps, meaning one second should pass each time the equal of fps has been removed
        //This will probably flash too slow
        if(this.timeToElapse<=0){   //End and reset
            this.invul=false
            this.hasRunInvulInit=false
        }
    }

    usePower(){
        if(this.attacking&&power>=POWER_MAX){
            this.invul=true
            power=0
            let newBlast = new blast(this.getPos())
            blastArray.push(newBlast)
        }
        else{
            let failedPop= new textPop([this.position[0]-80,this.position[1]-40],"Not Enough Power!","red",20,1,true,false)
            textPopArray.push(failedPop)
        }
    }



    die(){ //when the player gets hit with a bullet
        this.invul=true
        this.hp--
        if (this.hp < 0) gameState="lose"
        
        this.dropSomePoints()

        this.shouldDraw=false    //jank garbage that works
        this.attacking=false

        setTimeout(() => {
            this.shouldDraw=true
            this.attacking=true
            this.position=[400,700]
            this.flash()    //This will reset the invul state
        }, 2500);
    }

    dropSomePoints(){   //Removes some of the player's points and drops them as items (don't care if you can pick them up and get more back)

        let deathDropText= new textPop(this.position,"-100","red","30",3,true)
        textPopArray.push(deathDropText)

        score-=100
        if(score<0) score=0
        for(let i=0;i<5;i++){
            let newItem= new item("point",this.getRandomID(),this.position,this.width)
            itemsArray.push(newItem)
        }
    }

    updateFollowersPosition(){
        for(let i=0;i<playerFollowersArray.length;i++){
            playerFollowersArray[i].desiredPosition=[this.position[0]-100,this.position[1]-20]
        }
    }

    checkInBounds(){
        if(this.shouldDraw){
            if      (this.position[0]<10)     this.position[0]=10
            else if (this.position[0]>790)    this.position[0]=790
            else if (this.position[1]<10)     this.position[1]=10
            else if (this.position[1]>890)    this.position[1]=890
        }
        //Else is used to keep the player away from the stage, so they cannot pickup items while they are dead (not drawing)
        else    this.position=[-9999,-9999]
    }

    pushNewBullets(arr){
        for(let i=0;i<arr.length;i++){
            playerBulletsArray.push(arr[i])
        }
    }

    startAttackCoolDown(){
        this.attackReady=false
        setTimeout(() => {
            this.attackReady=true
        }, 40);
    }

    getRandInt(min,max) {return Math.trunc(Math.random()*max-min)+min}  //really small random integer function

    getRandFloat(min,max) {return (Math.random()*max-min)+min}  //really small random float function

    getPos(){   //Returns the player's position as an array (player uses 2 vars while others use array because im too lazy to change it, i mean i couldve right now as i right this comment, it would probabaly take less time (and space) but well, this is how it goes)
        let posArr=[this.position[0],this.position[1]]
        return posArr
    }

    getRandInt(min,max) {return Math.trunc(Math.random()*max-min)+min}  //really small random integer function

    getRandomID(){
        return this.getRandInt(1000000,9999999)
    }
}