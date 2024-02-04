//Gets pay based on user input, then outputs the pay for a week, month, and year
function calcPay(hours,rate){
    if(hours>168){
        outputDiv.innerHTML="<red>Hours entered exceeds hours in a week</red><br><br>";
        return;
    }
    //Weekly pay would be hours per week * rate per hour
    let weeksPay = hours*rate;
    //Monthly pay would be hours per week * 4.345, since some months have less weeks
    let monthsPay = weeksPay*4.345;
    //Yearly pay would be 12 months or 52 weeks
    let yearsPay = monthsPay*12;

    //Round and format
    weeksPay=roundHundredths(weeksPay);
    monthsPay=roundHundredths(monthsPay);
    yearsPay=roundHundredths(yearsPay);

    //Build the final string
    let outString = "Pay per Week: <embolden>$"+weeksPay+"</embolden><br>"
    +"Pay per Month: <embolden>$"+monthsPay+"</embolden><br>"
    +"Pay per Year: <embolden>$"+yearsPay+"</embolden";

    outputDiv.innerHTML=outString;
}

//Rounds to the hundredths, is number is an integer, then add .00 to the string
function roundHundredths(x){
    if(!Number.isInteger(x)){
        x*=100;
        x=Math.round(x);
        x/=100;
        return x;
    }
    else return x+".00"
}