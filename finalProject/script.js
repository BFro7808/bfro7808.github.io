//document.getElementById("pepBtn").addEventListener("click", fillAuto);

let globalToppings=[]; //A list of toppings the user wants for a pizza, resets when pizza is added to order

let pizzas=[]//List of pizzas in the customer's order

function toggleButtons(btn){
    let top=btn.innerHTML;  //The name of the topping the user is changing, fecthed from the word on the button (very exploitable!)
    if(btn.value=="false"){ //User enables a topping
        btn.style="background-color: #00A120;";
        btn.value=true;

        globalToppings.push(top);
    }
    else{   //User disables a topping
        btn.style="background-color: rgb(191, 59, 59);";
        btn.value=false;

        removeTopping(top);
    }
    console.table(globalToppings);
}

function removeTopping(topping){
    let index=null; //The index of the item we want to remove
    for(let i=0;i<globalToppings.length;i++){
        if(globalToppings[i]==topping) index=i;
    }
    globalToppings.splice(index,1);   //Delete 1 element at the index of the topping we want to remove
}

function pizza(size){
    //Dont reset toppings, maybe they want two?
    this.toppings = globalToppings;
    this.size = size;

    pizzas.push(this);
    console.table(pizzas);
}

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