setInterval(displayDateTime, 1000);

//Gets the current date and time, then separates it into different strings and outputs all items as a formatted list
function displayDateTime(){
    let dateTime = new Date();

    let year = dateTime.getFullYear();
    let month = dateTime.getMonth()+1; //Add one so range goes from 0-11 to 1-12
    let day = dateTime.getDay();
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();
    let second = dateTime.getSeconds();

    day=getDayName(day); //Convert the number given by the date object to the name of the day

    let outputString = "Year: "+year+
    "<br>Month: "+month+
    "<br>Day: "+day+
    "<br>Hour: "+hour+
    "<br>Minute: "+minute+
    "<br>Second: "+second;

    clocker.innerHTML = outputString;
}

//Convert the date object number for each day into a string of that day's name
function getDayName(x){
    if(x==0) return "Sunday"
    else if (x==1) return "Monday"
    else if (x==2) return "Tuesday"
    else if (x==3) return "Wednesday"
    else if (x==4) return "Thursday"
    else if (x==5) return "Friday"
    else if (x==6) return "Saturday"
}