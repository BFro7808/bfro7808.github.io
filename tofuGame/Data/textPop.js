let collideAreaMod = 3

class textPop{
    constructor(position,str,color,size,holdTime,shouldFade,shouldFadeIn,type){
        this.position=position
        this.type=type

        this.text=str
        this.color=color
        this.size=size

        this.width=size  //random number assignment, hope it works
        this.height=size

        this.holdTime=holdTime*1000 //convert to seconds for set timeout
        this.begunHold=false //set to true to prevent looping
        this.finishedHold=false //delay in the set time out has finished and this should fade or delete

        this.shouldFade=shouldFade //true means decrease alpha while drawing instead of removing
        this.shouldFadeIn = shouldFadeIn           //true means to set alpha to 0 and increase alpha
        this.alpha=1
        if (shouldFadeIn) this.alpha=0

        this.id=this.getRandInt(1000000,9999999)
    }

    update(){
        if(this.color=="gold"||this.color=="deepskyblue") this.checkCombine()
        this.position[1]-=0.1

        if(this.shouldFadeIn){
            this.alpha+=0.01
            if(this.alpha>=1) this.shouldFadeIn=false   //Stop running this block when fully opaque
        }

        if(!this.begunHold){    //Start the timer for how long this text should stay
            this.begunHold=true
            setTimeout(() => {
                this.finishedHold=true
            }, this.holdTime);
        }
        else if(this.finishedHold){     //Once the hold time is finished
            if(this.shouldFade){
                if(this.alpha>0.1) this.alpha-=0.01
                else this.removeMyself(textPopArray)
            }
            else{
                this.removeMyself(textPopArray)
            }
        }
        
    }

    checkCombine(){ //Checks to see if there are any point text objects colliding with this one that can be combined with this one
        for(let i=0;i<textPopArray.length;i++){
            if (this.color=="gold" && textPopArray[i].color == "gold" && this.collidesWithObject(textPopArray[i])){  //ASSUMING THAT ONLY POINT TEXT WILL USE GOLD AS THE COLOR
                let num1=Number(this.text)

                let num2 = Number(textPopArray[i].text)

                let newText=num1+num2

                textPopArray[i].removeMyself(textPopArray)
                this.removeMyself(textPopArray)
                
                let combined = new textPop(this.position, newText, "gold", "20", 3, true, false, "item")
                textPopArray.push(combined)
            }
            else if (this.color=="deepskyblue" && textPopArray[i].color == "deepskyblue" && this.collidesWithObject(textPopArray[i])){
                let num1 = Number(this.text)

                let num2 = Number(textPopArray[i].text)

                let newText = num1 + num2

                textPopArray[i].removeMyself(textPopArray)
                this.removeMyself(textPopArray)

                let combined = new textPop(this.position, newText, "deepskyblue", "20", 3, true, false, "item")
                textPopArray.push(combined)
            }
        }

    }

    draw(c){
        c.fillStyle=this.color
        c.font=this.size+"px Arial"

        c.globalAlpha=this.alpha
        if (this.type == "item") c.fillText("+"+this.text, this.position[0], this.position[1])

        else                     c.fillText(this.text, this.position[0], this.position[1])
        c.globalAlpha=1

        // c.globalAlpha=0.1    //used for debug
        // c.fillRect(this.position[0],this.position[1],this.width,this.height)
        // c.globalAlpha = 1
    }



    getRandInt(min,max) {return Math.trunc(Math.random()*max-min)+min}  //really small random integer function

    removeMyself(arrayToCheck){ //Remove THIS object (checks to see where THIS object is in the given array and removes only the exact match)
        for(let i=0;i<arrayToCheck.length;i++){
            if(this.equals(arrayToCheck[i])) arrayToCheck.splice(i,1)
        }
    }

    equals(object){ //Are these the same?
        return this.id==object.id
    }

    getRandNum(min, max) {    //Same as get rand int but can return negatives
        let number = Math.trunc(Math.random() * max - min) + min
        if (this.getRandInt(0, 1) == 0) number *= -1
        return number
    }

    collidesWithObject(object) {
        let xCheck = false
        let yCheck = false
        if (this.position[0] > object.position[0] - object.width * collideAreaMod
            && this.position[0] < object.position[0] + object.width + object.width * collideAreaMod) xCheck = true
        if (this.position[1] > object.position[1]
            && this.position[1] < object.position[1] + object.height * collideAreaMod) yCheck = true

        return (xCheck && yCheck)
    }
}