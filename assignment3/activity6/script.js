function calcPaintAndCost(){
    //Room dimensions
    let w=Number(width.value);
    let l=Number(roomLength.value);
    let h=Number(height.value);

    let costPerGallon=price.value; //cost per gallon
    let spread=cover.value; //sqr ft per gallon

    let totalRoomArea=2*l*h+2*w*h;
    let totalGallonsNeeded=Math.ceil(totalRoomArea/spread);
    let totalCost=totalGallonsNeeded*costPerGallon;

    outputDiv.innerHTML="To cover a room with a total of <embolden>"+totalRoomArea+"</embolden> square feet, you would need <embolden>"
    +totalGallonsNeeded+"</embolden> gallons of paint, which would cost <embolden>$"+totalCost+"</embolden>.";
}