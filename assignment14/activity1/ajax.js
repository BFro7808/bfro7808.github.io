// function loadDoc() {
//     const xhttp = new XMLHttpRequest();
//     xhttp.onload = function() {
//       document.getElementById("output").innerHTML = this.responseText;
//       }
//     xhttp.open("GET", "ajax_info.txt", true);
//     xhttp.send();
//   }

document.getElementById("getBtn").addEventListener("click", getInfo);

//User object function
function user(
    firstName=null,
    lastName=null, 
    address=null,
    city=null,
    region=null,
    postalCode=null,
    email=null,
    phoneNumber=null
    ){
        this.firstName= firstName;
        this.lastName= lastName;
        this.address= address;
        this.city=city;
        this.region=region;
        this.postalCode=postalCode;
        this.email=email;
        this.phoneNumber=phoneNumber;
}

/* Info array reference
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
//Makes a new user object using whatever info is stored inside of the info array
function createUser(){
    let x= new user(
        info[0],    //- firstName
        info[1],    //- lastName
        info[2],    //- address
        info[3],    //- city
        info[4],    //- region
        info[5],    //- postalCode
        info[6],    //- email
        info[7],    //- phoneNumber
        info[8]     //- dateOfBirth
    );

    console.log(x)
    x= JSON.stringify(x)
    console.log(x)

    // let request = new XMLHttpRequest();
    // request.open("POST", "ajax_info.json", true);
    // request.setRequestHeader("Content-Type", "application/json");
    // request.onreadystatechange = function() {
    //     console.log("Request: "+request.statusText)
    //};
//   request.send(x);
}

function getInfo(){
    fetch('ajax_info.json')
    .then(data => console.log(data))
    .catch (error => console.log('Error:' + error));
}