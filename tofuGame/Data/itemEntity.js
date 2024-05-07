var globalItemGrabMod=1
class item{
    constructor(itemType,givenId,spawnPos,widthOffset){
        this.itemType=itemType //point or power? (power?)
        this.id=givenId

        this.position=[ 
                    spawnPos[0]+this.getRandNum(20,100)+40,
                    spawnPos[1]+this.getRandNum(20,100)+40
                    ]

        this.accel=0
    }

    update(){
        if(this.isOutOfBounds()) this.removeMyself(itemsArray)

        if(this.itemType=="point"){
            if(this.getDistToPlayer()<150*globalItemGrabMod){
                this.moveTowardPlayer()
            }
            //If the point item isn't close enough to the player, then just keep falling
            else{
                this.position[1]++
                this.accel=0  
            }
        }

        else if(this.itemType=="health"){
            if(this.getDistToPlayer()<50*globalItemGrabMod){
                this.moveTowardPlayer()
            }
            else{
                this.position[1]++
                this.accel=0  
            }
        }

        else if(this.itemType=="follower"){ //item will give the player a new follower when picked up
            if(this.getDistToPlayer()<200*globalItemGrabMod){
                this.moveTowardPlayer()
            }
            else{
                this.position[1]++
                this.accel=0  
            }
        }
        
        else if(this.itemType=="power"){
            if (this.getDistToPlayer() < 150 * globalItemGrabMod) {
                this.moveTowardPlayer()
            }
            else {
                this.position[1]++
                this.accel = 0
            }
        }

        else {
            console.error("Item type " + this.itemType + " isn't defined. Removing...")
            this.removeMyself(itemsArray)
        }
    }

    moveTowardPlayer(){
        let pPos=playerObject.getPos()
        this.accel+=0.1

        if(this.position[0] > pPos[0]+6) this.position[0]-=(4+this.accel)
        else if (this.position[0] < pPos[0]-6) this.position[0]+=(4+this.accel)

        if(this.position[1] > pPos[1]+6) this.position[1]-=(2+this.accel)
        else if (this.position[1] < pPos[1]-6) this.position[1]+=(4+this.accel)

        if (this.getDistToPlayer()<20){ //If the point is on the player but got stuck
            this.position=pPos
        }

        //Check if we are touching the player
        if(this.collidesWithObject(playerObject)){
            if(this.itemType=="point"){
                gameSound.playSound(3)
                this.removeMyself(itemsArray)

                let gp=this.getRandInt(7,14) //why not random points
                score+=gp

                let pointCollectText= new textPop(this.position,gp,"gold","20",3,true,false,"item")
                textPopArray.push(pointCollectText)
            }
            else if(this.itemType=="health"){
                gameSound.playSound(5)
                this.removeMyself(itemsArray)

                if(playerObject.hp<10)  playerObject.hp++   //Only add another life if player is below 10

                let pointCollectText= new textPop(this.position,"♡","hotpink","30",3,true,false,"item")
                textPopArray.push(pointCollectText)
            }
            else if(this.itemType=="follower"){
                gameSound.playSound(11)
                this.removeMyself(itemsArray)

                addFollower()

                let pointCollectText= new textPop(this.position,"Follower","purple","30",3,true,false,"item")
                textPopArray.push(pointCollectText)
            }
            else if(this.itemType=="power"){
                gameSound.playSound(3)
                this.removeMyself(itemsArray)

                let powerToAdd = this.getRandInt(1, 3)
                power += powerToAdd

                if(power>POWER_MAX) power=POWER_MAX

                let powerCollectText = new textPop(this.position, 1, "deepskyblue", "20", 3, true, false, "item")
                textPopArray.push(powerCollectText)
            }
        }
    }

    draw(c){
        if(this.itemType=="point"){
            c.fillStyle="#00FFAA"
            c.fillRect(this.position[0],this.position[1],10,10)

            c.fillStyle="black"
            c.font="10px Georgia"
            c.fillText("P",this.position[0]+2,this.position[1]+8)
        }
        else if(this.itemType=="health"){
            c.fillStyle="hotpink"
            c.font="30px Georgia"
            c.fillText("♡",this.position[0]-10,this.position[1])  //  FINISH ADJUSTING THE X DRAW OFFSET FOR TEXT <-- Let's hope I did that (I don't remember what it is)
        }
        else if(this.itemType=="follower"){
            c.beginPath()
            c.arc(this.position[0],this.position[1],10,0,2*Math.PI)
            c.strokeStyle="purple"
            c.lineWidth=5
            c.stroke()
            c.globalAlpha=0.8
            c.fillStyle="purple"
            c.fill()
            c.globalAlpha=1
        }
        else if (this.itemType == "power") {    //set up power drawing
            c.globalAlpha = 0.5
            c.beginPath()
            c.arc(this.position[0], this.position[1], 5, 0, 2 * Math.PI)
            c.fillStyle = "deepskyblue"
            c.fill()
            c.globalAlpha = 1
        }
    }

    isOutOfBounds(){
        //Returns true or false if the bullet should be removed or not
        //Canvis width is 800 pixels, canvas height is 900 pixels THIS MUST BE MANUALLY RE-ENTERED HERE IF CHANGED                                          (noob)
        let boolean=false

        let cWidth=800, cHeight=900

        if      (this.position[0]<-100||this.position[0]>cWidth+100)    boolean=true
        else if (this.position[1]<-100||this.position[1]>cHeight+100)   boolean=true

        return boolean
    }

    removeMyself(arrayToCheck){ //Remove THIS object (checks to see where THIS object is in the given array and removes only the exact match)
        for(let i=0;i<arrayToCheck.length;i++){
            if(this.equals(arrayToCheck[i])) arrayToCheck.splice(i,1)
        }
    }

    equals(object){ //Are these the same?
        return this.id==object.id
    }

    getRandInt(min,max) {return Math.trunc(Math.random()*max-min)+min}  //really small random integer function

    getRandNum(min,max){    //Same as get rand int but can return negatives
        let number=Math.trunc(Math.random()*max-min)+min
        if(this.getRandInt(0,1)==0) number*=-1
        return number
    }

    getDistToPlayer(){
        let xDiff=Math.abs(this.position[0]-playerObject.position[0])
        let yDiff=Math.abs(this.position[1]-playerObject.position[1])

        return xDiff+yDiff
    }

    collidesWithObject(object){
        let xCheck=false
        let yCheck=false
        if(this.position[0] > object.position[0]-object.width/2-object.width 
            && this.position[0] < object.position[0]-object.width/2+object.width) xCheck=true
        if(this.position[1] > object.position[1]-object.height 
            && this.position[1] < object.position[1]+object.height) yCheck=true

        return (xCheck&&yCheck)
    }
}