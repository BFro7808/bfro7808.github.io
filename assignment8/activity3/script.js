//document.getElementById("shoeSizeInput").addEventListener("keyup", function(){returnSockSize(shoeSizeInput.value);}); example embed of param
document.getElementById("calcButton").addEventListener("click",startBaking);

let livePI=0
let stepsPI=[]
let interval=[2,3,4]

const maxIterations=1000
const logging = false //stops the browser from possibly dying due to console logs

//Does all the math in the Nilakantha algorithim, iterates maxIterations # of times. Outputs every 50th step to the screen + the final step
function startBaking(){
    livePI=3;

    for(let i=0;i<maxIterations;i++){
        let tempNum=getDivNum();
        if(i%2==0){ //If even
            livePI+=(4/tempNum);
            if(logging==true) console.warn(livePI);
        }
        else{ //If odd
            livePI-=(4/tempNum);
            if(logging==true) console.error(livePI);
        }
        updateInterval();

        if(i%50==0||i+1==maxIterations) stepsPI.push([i,livePI]);
    }
    outputSteps();
}

//Updates all numbers in the interval array by 2 and logs it to console
function updateInterval(){
    for(let i=0; i<interval.length;i++){
        interval[i]+=2;
    }
    if(logging==true) console.warn("Interval was updated:");
    if(logging==true) console.table(interval);
}

//Helper function that returns all values of the interval array multiplied together
function getDivNum(){
    return (interval[0])*(interval[1])*(interval[2]);
}

function outputSteps(){
    stepsPI.forEach(element => {
        outputArea.innerHTML+=element[0]+": "+element[1]+"<br>";
    });
}