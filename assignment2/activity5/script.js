//Takes in the length and width of a room in feet, then outputs the area in sqr yards
function getArea(w,l){
    if(isNaN(w)||isNaN(l)){ //prevents non-numbers from making it through
        outputDiv.innerHTML = "One or both inputs aren't a number";
        return;
    }
    else if(w==""||l==""){
        outputDiv.innerHTML = "One or both inputs are empty";
        return;
    }

    //Get the area in yards, then round to the hundredths
    area = (l*w)/3;
    area*=100;
    area=Math.round(area);
    area/=100;

    outputDiv.innerHTML = "The area of the room is <embolden>"+area+"</embolden>~ square yards.";
}