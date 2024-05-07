var power=0
const POWER_MAX = 100

class blast{
    constructor(position){
        this.position = position
        this.radius=40
        this.id = this.getRandInt(1000000, 9999999)

        this.hasDonePulse=false

        this.innerAlpha=0.3

        gameSound.playSound(13)
    }

    update(){
        this.checkInRadius() //Test and remove bullets inside of the blast radius

        if(this.hasDonePulse==false){
            this.position = this.getPlayerPos()
            this.radius-=5
            if(this.radius<=0){
                this.radius=0
                setTimeout(() => {
                    this.hasDonePulse = true
                }, 500);
            }
        }
        else{
            this.innerAlpha-=0.0025
            this.radius += 10
            if (this.radius >= 1000){
                this.removeMyself(blastArray)
                if(blastArray.length==0){
                    playerObject.invul=false
                    playerObject.alpha=1
                }
            } 
        }
    }

    draw(c){

        c.beginPath()
        c.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI)
        c.strokeStyle = "white"
        c.lineWidth = 7
        c.fillStyle = "yellow"

        c.globalAlpha = this.innerAlpha
        c.fill()
        c.globalAlpha = 1
        c.stroke()
    }

    checkInRadius(){
        for (let i = 0; i < enemyBulletsArray.length;i++){
            if (this.getDistanceTo(enemyBulletsArray[i])<this.radius*1.25){    //If distance to bullet is <= the radius of this blast
                enemyBulletsArray[i].removeMyself(enemyBulletsArray)
                gameSound.playSound(6)
            }
        }

        for (let i = 0; i < enemyArray.length;i++){
            if (this.getDistanceTo(enemyArray[i]) < this.radius * 1.25) {    //If distance to enemy is <= the radius of this blast
                //force the enemy to move upward 100 pixels
                let dPos = enemyArray[i].desiredPosition
                enemyArray[i].desiredPosition = [dPos[0],dPos[1]-4]
            }
        }
    }

    getDistanceTo(object) {
        let xDiff = Math.abs(this.position[0] - object.position[0])
        let yDiff = Math.abs(this.position[1] - object.position[1])

        return xDiff + yDiff
    }
    
    getRandInt(min, max) { return Math.trunc(Math.random() * max - min) + min }  //really small random integer function

    removeMyself(arrayToCheck) { //Remove THIS object (checks to see where THIS object is in the given array and removes only the exact match)
        for (let i = 0; i < arrayToCheck.length; i++) {
            if (this.equals(arrayToCheck[i])) arrayToCheck.splice(i, 1)
        }
    }

    equals(object) { //Are these the same?
        return this.id == object.id
    }

    getPlayerPos(){
        return [playerObject.position[0],playerObject.position[1]]
    }
}