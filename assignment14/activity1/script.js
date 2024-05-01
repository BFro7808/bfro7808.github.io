document.getElementById("autoBtn").addEventListener("click", autoFill);

let info=[]

/*
0 - firstName
1 - lastName
2 - address
3 - city
4 - region
5 - postalCode
6 - email
7 - phoneNumber
8 - dateOfBirth
*/
//Takes all form info and stores it into an array for easy use
function readyFormInfo(){
    alert("Form info in console");
    
    info = []; //Clear any previous info
    let form = document.forms["infoForm"];

    info.push(form.firstName.value);
    info.push(form.lastName.value);
    info.push(form.address.value);
    info.push(form.city.value);
    info.push(form.region.value);
    info.push(form.postalCode.value);
    info.push(form.email.value);
    info.push(form.phoneNumber.value);
    info.push(form.dateOfBirth.value);

    console.table(info);
}

//Fills the form in with junk info for easy testing
function autoFill(){
    infoForm.firstName.value="John";
    infoForm.lastName.value="Smith";
    infoForm.address.value="123 Where Ct";
    infoForm.city.value="Louville";
    infoForm.region.value="Overthere";
    infoForm.postalCode.value="90098";
    infoForm.email.value="jsmith@mailsite.com";
    infoForm.phoneNumber.value="000-000-0000";
    infoForm.dateOfBirth.value="1999-01-01";
}

//Automatically set the maximum date to 18 years ago from today
function setDateMax(){
    let date = new Date;

    let year = date.getFullYear()-18; //Get the year - 18
    let month = date.getMonth()+1; //Correct the month, date object starts at 0, not 1
    let day = date.getDate();

    if(String(month).length==1) month = "0"+month;
    if(String(day).length==1) day = "0"+day;
    
    let str=year+"-"+month+"-"+day

    dateField.max=str;
}