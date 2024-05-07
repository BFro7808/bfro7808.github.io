class genericEnemy{
    constructor(xPostition,yPosition,type){
        this.position=[xPostition,yPosition]
        this.speed=5    //5 is default, type can override

        this.type=type

        this.desiredPosition=[100,100] //position that this enemy wants to move to, can change

        this.hasDoneInit=false //If the enemy has set itself up yet

        //this.myBullets=[] NO!

        this.width, this.height //Assigned by enemy type

        this.hp
        this.drawHealthRing //determined by enemy type
        this.hpMatOp        //number used to correctly draw a health ring around an enemy

        this.aiTable=[  //why not just use the same for all??
            "giveFairyNewPosition",             //0
            "fairyShouldShoot",                 //1
            "---------------",                  //2
            "giveStrongFairyNewPosition",       //3
            "strongFairyShouldShoot",           //4
            "---------------",                  //5
            "giveMiniNewPosition",              //6
            "miniShouldShoot",                  //7
        ]

        this.attackReady=true
    }

    update(){
        this.gotoDesiredPosition()

        if(this.type=="fairy"){    //This type shoots one bullet and then runs away, test type for development, probably boring [ended up being the main enemy type]
            if(!this.hasDoneInit){
                this.hasDoneInit=true
                this.aiTable[1]="Don't"

                setTimeout(() => {
                    this.position[0]=this.getRandInt(50,750)
                    this.position[1]=-50
                    this.width=20
                    this.height=10
                    this.speed=5
                    this.hp=10

                    this.hpMatOp=2/this.hp
                    this.drawHealthRing=false

                    this.aiTable[1]="fairyShouldShoot"
                }, this.getRandInt(100,500));
            }

            //this WILL be a mess and I don't have time to make it look pretty, sorry
            if(this.aiTable[0]=="giveFairyNewPosition"){
                this.aiTable[0]="Don't"
                this.desiredPosition=[this.getRandInt(50,800),this.getRandInt(100,500)]

                setTimeout(() => {
                    this.aiTable[0]="giveFairyNewPosition"
                }, 500);
            }
            if(this.aiTable[1]=="fairyShouldShoot"){
                this.aiTable[1]="Don't"
                this.firingHandler()

                setTimeout(() => {
                    this.aiTable[1]="fairyShouldShoot"
                }, 1000);
            }
        }
        //Next enemy type will be below (hopefully)
        else if(this.type=="strongFairy"){    //This type shoots one bullet and then runs away, test type for development, probably boring
            if(!this.hasDoneInit){
                this.position[0]=this.getRandInt(50,750)
                this.position[1]=-50
                this.hasDoneInit=true
                this.width=40
                this.height=40
                this.speed=2
                this.hp=50

                this.hpMatOp=2/this.hp
                this.drawHealthRing=true
            }

            if(this.aiTable[3]=="giveStrongFairyNewPosition"){
                this.aiTable[3]="Don't"
                this.desiredPosition=[this.getRandInt(50,800),this.getRandInt(100,500)]

                setTimeout(() => {
                    this.aiTable[3]="giveStrongFairyNewPosition"
                }, 5000);
            }
            
            if(this.aiTable[4]=="strongFairyShouldShoot"){
                this.aiTable[4]="Don't"
                this.firingHandler()

                setTimeout(() => {
                    this.aiTable[4]="strongFairyShouldShoot"
                }, 250);
            }
        }

        else if(this.type=="miniBoss"){    //This type shoots one bullet and then runs away, test type for development, probably boring
            if(!this.hasDoneInit){
                this.position[0]=this.getRandInt(50,750)
                this.position[1]=-50
                this.hasDoneInit=true
                this.width=35
                this.height=40
                this.speed=1
                this.hp=250

                this.hpMatOp=2/this.hp
                this.drawHealthRing=true
            }

            if(this.aiTable[6]=="giveMiniNewPosition"){
                this.aiTable[6]="Don't"
                this.desiredPosition=[this.getRandInt(50,800),this.getRandInt(100,200)]

                setTimeout(() => {
                    this.aiTable[6]="giveMiniNewPosition"
                }, 5000);
            }
            
            if(this.aiTable[7]=="miniShouldShoot"){
                this.aiTable[7]="Don't"
                this.firingHandler()

                setTimeout(() => {
                    this.aiTable[7]="miniShouldShoot"
                }, 1000);
            }
        }
    }

    firingHandler(){
        if(!this.attackReady) return  //If the cooldown is not gone then return
        let newBullets=[]

        if(this.type=="fairy"){
            gameSound.playSound(7)
            if(playerObject.position[1]<this.position[1]){ //player is above THIS fairy
                newBullets.push(new enemyBullet(this.position[0]+this.width/2,this.position[1], 0,3,this.getRandomID()))
            }
            else{
                newBullets.push(new enemyBullet(this.position[0]+this.width/2,this.position[1], 0,-3,this.getRandomID()))
            }
        }
        else if(this.type=="strongFairy"){
            gameSound.playSound(8)
            let bSpe=5
            //bSpe is easy control for all bullet speeds
            let offset=30

            //North West
            newBullets.push(new enemyBullet(this.position[0]+this.width/2-offset,this.position[1]-offset,   -bSpe,bSpe, this.getRandomID()))
            //North 
            newBullets.push(new enemyBullet(this.position[0]+this.width/2,this.position[1]-offset,          0,bSpe, this.getRandomID()))
            //North East 
            newBullets.push(new enemyBullet(this.position[0]+this.width/2+offset,this.position[1]-offset,   bSpe,bSpe, this.getRandomID()))
            //East 
            newBullets.push(new enemyBullet(this.position[0]+this.width/2+offset,this.position[1],          bSpe,0, this.getRandomID()))
            //South East asd
            newBullets.push(new enemyBullet(this.position[0]+this.width/2+offset,this.position[1]+offset,   bSpe,-bSpe, this.getRandomID()))
            //South 
            newBullets.push(new enemyBullet(this.position[0]+this.width/2,this.position[1]+offset,          0,-bSpe, this.getRandomID()))
            //South West 
            newBullets.push(new enemyBullet(this.position[0]+this.width/2-offset,this.position[1]+offset,   -bSpe,-bSpe, this.getRandomID()))
            //West 
            newBullets.push(new enemyBullet(this.position[0]+this.width/2-offset,this.position[1],          -bSpe,0, this.getRandomID()))
        }
        else if(this.type=="miniBoss"){
            //make something new
            gameSound.playSound(8)

            newBullets.push(new enemyBullet(this.position[0]+this.width/2,this.position[1],0,-8, this.getRandomID(),"miniBossBullet00"))
        }

        this.pushNewBullets(newBullets) //Function that pushes all the newly made bullets to the playerBulletsArray array
    }

    draw(c){
        if(this.type=="fairy"){
            c.fillStyle="yellow"
            c.fillRect(this.position[0]-4,this.position[1]-1.25,this.width,this.height)
        }
        else if(this.type=="strongFairy"){
            c.fillStyle="red"
            c.fillRect(this.position[0],this.position[1]-this.height/2,this.width,this.height)
        }
        else if(this.type=="miniBoss"){
            c.fillStyle="white"
            c.fillRect(this.position[0],this.position[1]-this.height/2,this.width,this.height)
        }

        if(this.drawHealthRing){ //If this enemy should draw a health ring around it
            //white line
            c.globalAlpha=0.5
            c.beginPath()
            c.arc(this.position[0]+this.width/2,this.position[1],this.width*1.5,0,2*Math.PI)
            c.strokeStyle="white"
            c.lineWidth=3
            c.stroke()
            
            //red line
            c.beginPath()
            c.arc(this.position[0]+this.width/2,this.position[1],this.width*1.5,0,(this.hp*this.hpMatOp)*Math.PI)
            c.strokeStyle="red"
            c.lineWidth=3
            c.stroke()
            c.globalAlpha=1
        }

        //c.globalAlpha=0.5 //debug that draws desired pos on screen
        //    c.fillStyle="green" //draws the pos to go to
        //    c.fillRect(this.desiredPosition[0]-10,this.desiredPosition[1]-5,20,20)
        //    c.globalAlpha=1.0
    }

    pushNewBullets(arr){
        for(let i=0;i<arr.length;i++){
            enemyBulletsArray.push(arr[i])
        }
    }

    getRandomID(){
        return this.getRandInt(1000000,9999999)
    }

    updateHealth(damage){
        gameSound.playSound(1)
        this.hp-=damage
        score++ //award points for hits
        if(this.hp<=0){
            this.die()
        }
    }

    die(){  //Handles item spawnings for enemies that die, hence the name
        
        gameSound.playSound(10)
        this.removeMyself()
        if(this.type=="fairy"){
            enemyMemory-=2
            for(let i=0;i<2;i++){
                let newItem= new item("point",this.getRandomID(),this.position,this.width)
                itemsArray.push(newItem)
            }
            let newItem = new item("power", this.getRandomID(), this.position, this.width)
            itemsArray.push(newItem)
        }


        else if(this.type=="strongFairy"){
            
            for(let i=0;i<5;i++){
                let newItem= new item("point",this.getRandomID(),this.position,this.width)
                itemsArray.push(newItem)
            }

            for (let i = 0; i < this.getRandInt(0,10); i++) {
                let newItem = new item("power", this.getRandomID(), this.position, this.width)
                itemsArray.push(newItem)
            }

            if(this.getRandInt(0,9)==0){ //Health drop chance is 10% (0,10 is 9% idiot)
                let newItem= new item("health",this.getRandomID(),this.position,this.width)
                itemsArray.push(newItem)
            } 
        }

        
        else if(this.type=="miniBoss"){
            for(let i=0;i<20;i++){
                let newItem= new item("point",this.getRandomID(),this.position,this.width)
                itemsArray.push(newItem)
            }
            for(let i=0;i<2;i++){
                let newItem = new item("health",this.getRandomID(),this.position,this.width)
                itemsArray.push(newItem)    
            }

            let newItem = new item("follower",this.getRandomID(),this.position,this.width)
            itemsArray.push(newItem)  
        }
    }

    removeMyself(){ //Remove THIS object (checks to see where THIS object is in the enemy array and removes only the exact match)
        for(let i=0;i<enemyArray.length;i++){
            if(this.equals(enemyArray[i])) enemyArray.splice(i,1)
        }
    }

    equals(object){
        return (this.isEqual(this.position,object.position)&&
                this.hp==object.hp&&
                this.type==object.type)
    }

    gotoDesiredPosition(){  //Forced movement, moves this object until its position is the same as its desired position

        //Is this enemy within a reasonable distance from its target area?
        if(!(this.isWithinBounds(this.position[0],this.position[1], this.desiredPosition[0],this.desiredPosition[1]))){
            //X axis controls
            if(this.position[0]>this.desiredPosition[0]){       //Too far right
                this.position[0]-=this.speed
            } 
            else if(this.position[0]<this.desiredPosition[0]){  //Too far left
                this.position[0]+=this.speed
            } 
            //Y axis controls
            if(this.position[1]<this.desiredPosition[1]){       //Too far up
                this.position[1]+=this.speed
            }       
            else if(this.position[1]>this.desiredPosition[1]){  //Too far down
                this.position[1]-=this.speed
            }

        }
        else{//If this enemy is close enough to the spot it was supposed to be, tell it to stop
            this.desiredPosition=[]
        }
    }

    isWithinBounds(x,y,dx,dy){
        const LEN=20   //Distance from goto allowed for the enemy to stop moving
        //If this object is beyond 10 pixels from its target location on the X or Y axis, return false
        return !(x<dx-LEN||x>dx+LEN || y<dy+LEN||y>dy-LEN)
    }

    isEqual(array1,array2){ //returns true if the two given arrays are the same
        if(!(array1.length==array2.length))return false

        for(let i=0;i<array1.length;i++){
            if(array1[i]!=array2[i]) return false
        }
        return true
    }

    getRandInt(min,max) {return Math.trunc(Math.random()*max-min)+min}  //really small random integer function
}