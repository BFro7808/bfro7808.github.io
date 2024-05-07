class soundInitializer{
    constructor(){
        this.soundsSrcArray=[
            "Data/Sound/testSound.wav",         //0 DEPRICATED
            "Data/Sound/damage00.wav",          //1
            "Data/Sound/graze.wav",             //2
            "Data/Sound/item00.wav",            //3
            "Data/Sound/pldead00.wav",          //4
            "Data/Sound/plst00.wav",            //5
            "Data/Sound/tan00.wav",             //6
            "Data/Sound/tan01.wav",             //7
            "Data/Sound/tan02.wav",             //8
            "Data/Sound/ok00.wav",              //9
            "Data/Sound/enep00.wav",            //10
            "Data/Sound/extend.wav",            //11
            "Data/Sound/music.mp3",             //12
            "Data/Sound/nep00.wav"              //13
        ]
        //Sounds 1-11 are sourced originally from Touhou 6 ~ The Embodiment of Scarlet Devil
        //Webpage https://www.sounds-resource.com/pc_computer/touhoukoumakyoutheembodimentofscarletdevil/sound/327/

        //Sound 12 is the track "The Japanese Wilderness the Girl Watched" from Touhou 10: Mountain of Faith - Stage 5
        this.volumeTable=[  //Individual volume controls for each sound
            1,          //0
            3,          //1
            1,          //2
            3,          //3
            4,          //4
            4,          //5
            0.5,        //6
            0.5,        //7
            0.5,        //8
            1,          //9
            5,          //10
            5,          //11
            7,          //12    Might be unable to change volume of the music due to it not stopping (it may change after a loop though)
            15          //13
        ]
    }

    playSound(number){
        //Trying to create too many sound elements at once will be blocked by the browser
        let soundBaseElement = document.createElement("audio")
        soundBaseElement.src=this.soundsSrcArray[number]
        soundBaseElement.volume=this.volumeTable[number]*gameVolume

        soundBaseElement.play()
        
        //Found this little bit here https://stackoverflow.com/questions/11103582/how-do-you-detect-when-html5-audio-has-finished-playing-more-than-once
        if (number == 12) { //Loop this sound if it is the music
            soundBaseElement.addEventListener("ended", function () {
                soundBaseElement.currentTime = 0
                soundBaseElement.play()
            })
        }

        if(number!=12)soundBaseElement.remove()
    }
}
