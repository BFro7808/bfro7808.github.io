//Converts an integer in years to months, days, hours, and seconds, then outputs it to the page
function updateMonths(years){
    if(isNaN(years)||years==""){
        ageStatsDiv.innerHTML="<red>Enter a number</red>"
        return; //end if the input isnt a number
    }

    let months = roundTenths(years*12);     //12 months in a year
    let days = roundTenths(years*365);      //365 days in a year
    let hours = roundTenths(days*24);       //24 hours in a day
    let seconds = roundTenths(days*86400);  //86400 seconds in one day
    
    yearFixup=roundTenths(years);

    let output = "A <embolden>"+yearFixup+"</embolden> year-old would have lived:<br>"
        +"<embolden>"+months+"</embolden> months<br>"
        +"<embolden>"+days+"</embolden> days<br>"
        +"<embolden>"+hours+"</embolden> hours<br>"
        +"<embolden>"+seconds+"</embolden> seconds<br>" //extra br for some space after

    ageStatsDiv.innerHTML = output;
}

//Rounds to the tenths, to account for float entries
function roundTenths(x){
    x*=10;
    x=Math.round(x);
    x/=10;
    return x;
}