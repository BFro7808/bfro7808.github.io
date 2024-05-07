class playerFollower{
    constructor(previousFollowersCount){
        //this will be the things that follows the player and shoots more bullets
        this.position=playerObject.getPos()
        this.desiredPosition=[]
        this.attackReady=true
        this.speed=7

        this.offsets=[] //Determine where to attatch the follower based on the players position
        if(previousFollowersCount==0){
            this.offsets=[-100,-20]
        }
        else if(previousFollowersCount==1){
            this.offsets=[100,-20]
        }
        else{
            this.offsets=[0,70]
        }
    }

    update(){
        let playerPos=playerObject.getPos()
        this.position=[playerPos[0]+this.offsets[0],playerPos[1]+this.offsets[1]]

        if(playerObject.shiftSpeedMod==1){this.firingHandeler()} //player isn't holding shift to slow
    }

    draw(c){

        c.globalAlpha=0.7
        c.beginPath()
        c.arc(this.position[0],this.position[1],7,0,2*Math.PI)

        c.strokeStyle="purple"
        c.lineWidth=7

        c.fillStyle="purple"
        c.fill()

        c.stroke()
        c.globalAlpha=1
    }

    firingHandeler(){
        if(!(playerObject.attacking&&this.attackReady)) return  //If the cooldown is not gone or is told not to attack
        this.startAttackCoolDown()

        let newBullets=[]

        let id=this.getRandInt(1000000,9999999)
        newBullets.push(new playerFollowerBullet(this.position[0],this.position[1], 0,-20,id))
        id=this.getRandInt(1000000,9999999)
        newBullets.push(new playerFollowerBullet(this.position[0],this.position[1], 1,-20,id))
        id=this.getRandInt(1000000,9999999) //this could be a function
        newBullets.push(new playerFollowerBullet(this.position[0],this.position[1], -1,-20,id))
        
        this.pushNewBullets(newBullets) //Function that pushes all the newly made bullets to the playerBulletsArray array
    }

    startAttackCoolDown(){
        this.attackReady=false
        setTimeout(() => {
            this.attackReady=true
        }, 100);
    }

    getRandFloat(min,max) {return (Math.random()*max-min)+min}  //really small random float function

    pushNewBullets(arr){
        for(let i=0;i<arr.length;i++){
            playerFollowerBulletsArray.push(arr[i])
        }
    }
    
    getRandInt(min,max) {return Math.trunc(Math.random()*max-min)+min}  //really small random integer function
}
