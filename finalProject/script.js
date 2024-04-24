//document.getElementById("pepBtn").addEventListener("click", fillAuto);

//Function that is run whenever the page loads
function auto(){
    autoYear();
}

//Sets the copyright year as the current year
function autoYear(){
    let d = new Date;
    let year= d.getFullYear();
    footer.innerHTML="&copy;"+year;
}

let toppings=[]; //A list of toppings the user wants for a pizza, resets when pizza is added to order

function toggleButtons(btn){
    let top=btn.innerHTML;  //The name of the topping the user is changing, fecthed from the word on the button (very exploitable!)
    if(btn.value=="false"){ //User enables a topping
        btn.style="background-color: #00A120;";
        btn.value=true;

        toppings.push(top);
    }
    else{   //User disables a topping
        btn.style="background-color: rgb(191, 59, 59);";
        btn.value=false;

        removeTopping(top);
    }
    //console.table(toppings);
}

function removeTopping(topping){
    let index=null; //The index of the item we want to remove
    for(let i=0;i<toppings.length;i++){
        if(toppings[i]==topping) index=i;
    }
    toppings.splice(index,1);   //Delete 1 element at the index of the topping we want to remove
}

function createPizza(toppings,size){
    //this will make an object
}