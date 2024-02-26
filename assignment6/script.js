//document.getElementById("shoeSizeInput").addEventListener("keyup", function(){returnSockSize(shoeSizeInput.value);}); example embed of param
document.getElementById("calcButton").addEventListener("click", function(){calcGradePointAverage(count.value);});

//Prints the GPA after a specified number of valid letter grades are given. Probably over-complicated, but it is what it is..
function calcGradePointAverage(count){
    let i = 0;
    let currentGrade="";
    let grades = [];

    while(i<count){
        currentGrade=translateGrade(prompt("Enter Grade "+(i+1)+"/"+count+" as a Letter."));
        //If there is bad input, enter the nested while loop
        while(currentGrade==null){
            currentGrade=translateGrade(prompt("Letter can Only be A through F."));
        }
        grades[i]=currentGrade;
        i++;
    }

    console.log(grades)
    //Get the sum of the grades
    let gpa=0
    for(let i=0;i<grades.length;i++) gpa+=grades[i]; //pretend this is a while loop
    gpa= gpa/grades.length; //Get the final grade point average

    outputArea.innerHTML = "GPA: "+gpa;
}

//Given a string, takes ONLY the first character and returns 4-0 based on the letter. If the character isn't known, then null is returned
function translateGrade(letter){
    letter = String(letter);
    letter = letter.substring(0,1); //will only take the first letter entered, we don't care about + or - grades
    letter = letter.toLowerCase(); //get rid of capitals for simplicity

    if(letter=="a") return 4;
    else if (letter=="b") return 3;
    else if (letter=="c") return 2;
    else if (letter=="d") return 1;
    else if (letter=="f") return 0;

    else return null; //will cause the prompt to re appear
}