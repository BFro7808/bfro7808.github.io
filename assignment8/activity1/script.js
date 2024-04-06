//document.getElementById("shoeSizeInput").addEventListener("keyup", function(){returnSockSize(shoeSizeInput.value);}); example embed of param
document.getElementById("genButton").addEventListener("click", function(){generateTable(count.value, numValue.value);});

//Takes in two numbers and multiplies the numValue count times, printing a list of the equations onto the page
function generateTable(count, numValue){
    if(isNaN(numValue*count)||count==""||numValue==""){
        alert("One or both values are not a number.");
        return;
    }

    let table1=[];
    let realNumber=0; //Will just be i+1 so that the list doesn't start at 0
    for(let i=0; i<count; i++){
        realNumber=i+1;
        table1.push(numValue+" * "+realNumber+" = "+(numValue*realNumber)+"<br>"); //Add the equation string into the array
    }
    console.table(table1);
    
    table1.forEach(addLineEquation); //Add each of the equations to the page via another loop.
}

function addLineEquation(eq){
    console.log(eq);
    outputArea.innerHTML += eq;
}