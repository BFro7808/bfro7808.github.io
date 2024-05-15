//document.getElementById("pepBtn").addEventListener("click", fillAuto);

let globalToppings=[];  //A list of toppings the user wants for a pizza, resets when pizza is added to order

let pizzas=[]           //List of pizzas in the customer's order

let orderPrice=0        //Price of order without tax
let orderPriceTotal=0   //Price of order with tax
let pizzaCount=1        //How many pizza's in order - is always one behind actual pizza count, VISUAL DISPLAY ONLY

const mediumPizzaPrice=10
const smallPizzaPrice=7
const largePizzaPrice=13

//Pizza object, updates order price and updates the on-screen order when created
function pizza(size){
    this.toppings = globalToppings;
    this.size = size;
    this.price=0;
    /*Pizza Prices:
    S - $7
    M - $10
    L - $13
    Topping - +0.25
    Then %10 sale tax*/
    if     (size=="medium")this.price+=mediumPizzaPrice;//Change this pizza's price based on its size
    else if(size=="small") this.price+=smallPizzaPrice;
    else                   this.price+=largePizzaPrice;
    this.price += 0.25*globalToppings.length;           //Add the price of the toppings to the pizza's price

    //Modify the overall prices of the order
    orderPrice+=this.price; //Add toppings to price
    orderPriceTotal=roundToHundreths(orderPrice+(orderPrice*0.1));    //Calc tax for total price

    pizzas.push(this);  //Add this pizza to the order
    updateOrder(this) //Finally, update the order list on screen so the user sees the pizza added
}

//order object WRITE DESC
//a
//a
function order(){
    this.contents=pizzas;
    this.price=orderPrice;
    this.priceTotal=orderPriceTotal;

    this.name;
    this.address;
}

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
    // console.table(globalToppings);
}

function removeTopping(topping){
    let index=null; //The index of the item we want to remove
    for(let i=0;i<globalToppings.length;i++){
        if(globalToppings[i]==topping) index=i;
    }
    globalToppings.splice(index,1);   //Delete 1 element at the index of the topping we want to remove
}

//Refreshes the Your Order list when a new pizza is added
function updateOrder(pizza){
    let str="<infoBit><infoLeft>";
    //First, add the image depending on the pizza size
    if(pizza.size=="medium")    str+='<img src="img/iconPizzaMedium.png">';
    else if(pizza.size=="small")str+='<img src="img/iconPizzaSmall.png">';
    else str+='<img src="img/iconPizzaLarge.png">';

    str+="</infoLeft><infoRight>";
    //Reformat word with capFirstLetter()
    str+=capFirstLetter(pizza.size)+"<br>";
    //Use getToppingsList(pizza) to get a list of toppings
    str+=getToppingsList(pizza)+"<br>";
    //Attach the price of the individual pizza to the info
    str+="Price: $"+formatCurrency(pizza.price);

    //Close off the info bit
    str+="</infoRight></infoBit><br>";
    orderInfo.innerHTML+=str;

    //Update the placeorder area visuals
    count.innerHTML=pizzaCount++;//Add 1 to the pizza counter
    price.innerHTML=formatCurrency(orderPrice);
    totalPrice.innerHTML=formatCurrency(orderPriceTotal);

    placeOrderDiv.style="display:inline"; //Unhide the place order section
    console.table(pizzas);
}
/* Each order info bit will look like this:
Pizza image     Pizza Size
Pizza image     Toppings, comma delimited
*/

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

//Returns the number rounded to the hundreths
function roundToHundreths(num){
    num=Math.round(num*100)/100;
    return num;
}

//Returns a word with the first letter capitalized
function capFirstLetter(word){
    return String(word).substring(0,1).toUpperCase()+word.substring(1); //Capitalize the first letter and then reattach the rest of the word and return it
}

//Returns a list of all the toppings on a pizza in a comma delimited format
function getToppingsList(pizza){
    let list="";
    if(pizza.toppings.length<1) return "No Toppings"
    for (let i=0;i<pizza.toppings.length;i++){
        //If were not on the last topping, add a comma with a space
        if(i<pizza.toppings.length-1) list+=pizza.toppings[i]+", ";
        else list+=pizza.toppings[i];
    }
    return list;
}

//Overcomplex function that reformats a number to look like USD currency, DOES NOT attach a $
function formatCurrency(num){
    numArray=String(num).split(""); //Split number into an array of chars
    // console.log("Number to modify:",numArray)
    let periodIndex
    for(let i=0; i<numArray.length;i++){
        if(numArray[i]=="."){   //If we find the period in the string, then record its index
            periodIndex=i;
            break;
        }
        periodIndex=null; //If we don't find a period, record it
    }
    if(periodIndex!=null){ //If we found a period
        //If there is only one number following the period, like: .5
        if(String(num).substring(periodIndex).length==2) return num+"0"
        //Otherwise, just return the number we got
        return num
    }
    //If we didn't find a period, return with a .00 attached
    else return num+".00";
}