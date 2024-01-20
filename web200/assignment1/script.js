//As a forewarning, I'm very much in the habit of not using semicolons at
// the end of my statements

//Used to count the number of times output2 runs, minimizes annoyance
let hoverPopCount=0;

//Chnages the "Now you see me" paragraph
function output1(){
    outputParagraph.innerHTML="Now you don't";
}

//Makes a popup whenever the user hovers over the text area
function output2(){
    if(hoverPopCount<3){
        window.confirm("Hello World");
        hoverPopCount++;
    } 
    else console.log("The popup has shown itself enough, no more.");
}

//Creates three console logs when the user selects the radio button
function output3(){
    console.log("Log");
    console.warn("Warn");
    console.error("oops");
}

//Changes the main heading of the page to whatever the user writes in the textbox
function output4(userText){
    headingOne.innerHTML=userText;
}