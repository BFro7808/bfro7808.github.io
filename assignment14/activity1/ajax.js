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
    )
    {
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
}

function getInfo(){
    let request = new XMLHttpRequest();
    request.open("GET", "ajax_info.json");
    request.onload = function(){
        let data = JSON.parse(request.responseText);
        console.log(request.status,request.statusText)
        showInfo(data);
    }
    request.send();
}

let globalDataVariable = 0

function showInfo(data){
    console.warn(data)
    globalDataVariable = data;

    output.innerHTML=""
    
    for(let i=0; i<data.length; i++){
        output.innerHTML+=getUserString(data[i],i);
    }
}

function getUserString(user,userNum){
    let str = "<h3>User "+userNum+"</h3>"+
    "Name: "+user.firstName+" "+user.lastName+"<br>"+
    "Address: "+user.address+" "+user.postalCode+" "+user.region+"<br>"+
    "Date of Birth: "+user.dateOfBirth+"<br>"+
    "->Contact Info:"+
    "Email: "+user.email+"<br>"+
    "Phone number: "+user.phoneNumber+"<br>";

    return str;
}