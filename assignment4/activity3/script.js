document.getElementById("convertButton").addEventListener("click", convertMiles);

//Takes the value of the text box and sets the outputDiv to a result string of all the distances
function convertMiles(){
    console.log(1)
    let miles = milesInput.value

    let yards= roundTenths(miles*1760);
    let feet= roundTenths(miles*5280);
    let inches= roundTenths(miles*63360);

    let str = "<bold>"+miles+" miles would equate to:</bold><br>"+
    yards+" yards<br>"+feet+" feet<br>"+inches+" inches";
    outputDiv.innerHTML = str;
}

//Rounds to the tenths, to account for float entries
function roundTenths(x){
    x*=10;
    x=Math.round(x);
    x/=10;
    return x;
}