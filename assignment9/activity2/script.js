document.getElementById("picker").addEventListener("change", displayDateTime);

function displayDateTime(){
    let dateString = picker.value;
    let year=getStringYear(dateString);
    let month=getStringMonth(dateString);
    let day=getStringDay(dateString);

    let UTCday=day;
    let d = new Date();
    if (d.getHours>=19) UTCday++; //Progress by one day if 5 hours ahead means a new day

    let UTCmonth=month;
    if(UTCday>30){
        UTCday=1;
        UTCmonth++
    }

    let UTCyear=year;
    if(UTCmonth>12){
        UTCmonth=1;
        UTCyear++;
    }

    let str1 = "Year: "+year+
    "<br>Month: "+month+
    "<br>Day: "+day;
    timeOut1.innerHTML = str1;

    let str2 = "Year: "+UTCyear+
    "<br>Month: "+UTCmonth+
    "<br>Day: "+UTCday;
    timeOut2.innerHTML = str2;
}

function getStringYear(str){
    console.log(String(str).substring(0,4));
    return String(str).substring(0,4);
}
function getStringMonth(str){
    console.log(String(str).substring(5,7));
    return String(str).substring(5,7);
}
function getStringDay(str){
    console.log(String(str).substring(8));
    return String(str).substring(8);
}