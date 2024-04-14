document.getElementById("autoBtn").addEventListener("click", autoFill);
document.getElementById("pNumField").addEventListener("change", formatPhone);

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

//Formats phone num field, only does this when valid input is given
function formatPhone(){
    let str=String(infoForm.phoneNumber.value)

    if(str.length<10) return;

    let firstThree = str.substring(0,3);
    let nextThree = str.substring(3,6);
    let finalFour = str.substring(6,10); //This line will cut off anything beyond the 9th char

    infoForm.phoneNumber.value= firstThree+"-"+nextThree+"-"+finalFour;
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