var graze=0
//Amount of time a bullet has touched the blue portion of the player

class enemyBullet{
    constructor(xPosition,yPosition,bulletDriftx,bulletDrifty,idNum,bulletScript){
        this.position=[]
        this.position[0]=xPosition    //Xpos
        this.position[1]=yPosition    //Ypos

        this.radius=3.5 //3.5 is default bullet size

        this.bulletDriftx=bulletDriftx  //Velocity of bullet along the x axis
        this.bulletDrifty=bulletDrifty  //Velocity of bullet along the y axis
        
        this.bulletScript=bulletScript  //Predefined bullet type

        this.id=idNum //this is assigned during creation, a random large number

        if(bulletScript=="miniBossBullet00"){
            this.radius=5
        }

        this.hasDoneAGraze=false
    }

    update(){//Handles position and collison
        if(this.isOutOfBounds()){
            this.removeMyself(enemyBulletsArray)
        }
        else{ //regular object updating
            if(!playerObject.invul&&this.collidesWithObject(playerObject)){
                gameSound.playSound(4)
                playerObject.die()
            }
            else if (this.isGrazingPlayer()&&!this.hasDoneAGraze){
                //If we graze the player, wait 3 seconds before we can do it again
                this.hasDoneAGraze=true
                graze++
                setTimeout(() => {
                    this.hasDoneAGraze=false
                }, 3000);
            }

            this.checkScripts()

            this.position[0]+=this.bulletDriftx
            this.position[1]-=this.bulletDrifty //THIS SHOULD BE -= to make bullet go down
        }
    }

    checkScripts(){//Do any updates that scripts need to perform on this bullet
        if(this.bulletScript=="miniBossBullet00"){
                if(this.position[1]>playerObject.position[1]-10&&this.position[1]<playerObject.position[1]+10){ //Do horizontal bullet boom : )
                    this.removeMyself(enemyBulletsArray)
                    let newBullets=[]
                    gameSound.playSound(6)

                    newBullets.push(new enemyBullet(this.position[0],this.position[1],2,0,this.getRandomID()))
                    newBullets.push(new enemyBullet(this.position[0],this.position[1],-2,0,this.getRandomID()))
                    this.pushNewBullets(newBullets)
                }
            }
    }

    pushNewBullets(arr){
        for(let i=0;i<arr.length;i++){
            enemyBulletsArray.push(arr[i])
        }
    }

    getRandomID(){
        return this.getRandInt(1000000,9999999)
    }

    removeMyself(arrayToCheck){ //Remove THIS object (checks to see where THIS object is in the given array and removes only the exact match)
        for(let i=0;i<arrayToCheck.length;i++){
            if(this.equals(arrayToCheck[i])) arrayToCheck.splice(i,1)
        }
    }

    equals(object){ //Are these the same?
        return this.id==object.id
    }

    isEqual(array1,array2){ //returns true if the two given arrays are the same
        if(!(array1.length==array2.length))return false

        for(let i=0;i<array1.length;i++){
            if(array1[i]!=array2[i]) return false
        }
        return true
    }

    draw(c){
        c.globalAlpha=0.7
        c.beginPath()
        c.arc(this.position[0],this.position[1],this.radius,0,2*Math.PI)

        c.strokeStyle="white"
        c.lineWidth=7
        c.stroke()

        c.globalAlpha=1
        c.fillStyle="red"
        c.fill()

        //c.font="20px Georgia"
        //c.fillText(this.collidesWithObject(playerObject),this.position[0]+5,this.position[1]+5)
    }

    isOutOfBounds(){
        //Returns true or false if the bullet should be removed or not
        //Canvis width is 800 pixels, canvas height is 900 pixels THIS MUST BE MANUALLY RE-ENTERED HERE IF CHANGED
        let boolean=false

        let cWidth=800, cHeight=900

        if      (this.position[0]<-100||this.position[0]>cWidth+100)    boolean=true
        else if (this.position[1]<-100||this.position[1]>cHeight+100)   boolean=true

        return boolean
    }

    getRandInt(min,max) {return Math.trunc(Math.random()*max-min)+min}  //really small random integer function

    collidesWithObject(object){
        let xCheck=false
        let yCheck=false
        if(this.position[0] > object.position[0]-object.width/2-object.width 
            && this.position[0] < object.position[0]-object.width/2+object.width) xCheck=true
        if(this.position[1] > object.position[1]-object.height 
            && this.position[1] < object.position[1]+object.height) yCheck=true

        return (xCheck&&yCheck)
    }

    isGrazingPlayer() {
        let xCheck = false
        let yCheck = false
        if (this.position[0] > playerObject.position[0] - playerObject.realWidth / 2 - playerObject.realWidth
            && this.position[0] < playerObject.position[0] - playerObject.realWidth / 2 + playerObject.realWidth) xCheck = true
        if (this.position[1] > playerObject.position[1] - playerObject.realHeight
            && this.position[1] < playerObject.position[1] + playerObject.realHeight) yCheck = true

        return (xCheck && yCheck)
    }
}