class playerFollowerBullet{
    constructor(xPosition,yPosition,bulletDriftx,bulletDrifty,idNum,bulletScript){
        this.position=[]
        this.position[0]=xPosition    //Xpos
        this.position[1]=yPosition    //Ypos

        this.bulletDriftx=bulletDriftx  //Velocity of bullet along the x axis
        this.bulletDrifty=bulletDrifty  //Velocity of bullet along the y axis
        
        this.bulletScript=bulletScript  //Predefined bullet type

        this.id=idNum //this is assigned during creation, a random large number
    }

    update(){//Handles position and collison
        if(this.isOutOfBounds()){
            this.removeMyself(playerFollowerBulletsArray)
        }
        else{ //regular object updating
            for(let i=0;i<enemyArray.length;i++){
                if(this.collidesWithObject(enemyArray[i])){
                    this.position[0]=-1000
                    enemyArray[i].updateHealth(1) //do one damage
                }
            }
            this.position[0]+=this.bulletDriftx
            this.position[1]+=this.bulletDrifty
        }
    }

    draw(c){
        c.globalAlpha=0.5
        c.beginPath()
        c.arc(this.position[0],this.position[1],3.5,0,2*Math.PI)

        c.strokeStyle="white"
        c.lineWidth=7

        c.fillStyle="green"
        c.fill()

        c.stroke()
        c.globalAlpha=1
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
        if(this.position[0] > object.position[0]-object.width*graceAreaMultiplier
            && this.position[0] < object.position[0]+object.width+object.width*graceAreaMultiplier) xCheck=true
        if(this.position[1] > object.position[1]
            && this.position[1] < object.position[1]+object.height*graceAreaMultiplier) yCheck=true

        return (xCheck&&yCheck)
    }

    removeMyself(arrayToCheck){ //Remove THIS object (checks to see where THIS object is in the given array and removes only the exact match)
        for(let i=0;i<arrayToCheck.length;i++){
            if(this.equals(arrayToCheck[i])) arrayToCheck.splice(i,1)
        }
    }

    equals(object){ //Are these the same?
        return this.id==object.id
    }
}