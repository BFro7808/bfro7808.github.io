//document.getElementById("shoeSizeInput").addEventListener("keyup", function(){returnSockSize(shoeSizeInput.value);}); example embed of param
document.getElementById("genButton").addEventListener("click", function(){generateTable(count.value, numValue.value);});

//Takes in two numbers and multiplies the numValue count times, printing a list of the equations onto the page
function generateTable(count, numValue){
    if(isNaN(numValue*count)||count==""||numValue==""){
        alert("One or both values are not a number.");
        return;
    }

    let str="";
    let realNumber=0; //Will just be i+1 so that the list doesn't start at 0
    for(let i=0; i<count; i++){
        realNumber=i+1;
        str+=numValue+" * "+realNumber+" = "+(numValue*realNumber)+"<br>";
    }
    outputArea.innerHTML = str;
}