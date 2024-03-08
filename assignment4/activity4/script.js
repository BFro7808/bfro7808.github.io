document.getElementById("buttonSquare").addEventListener("click", squareArea)
document.getElementById("buttonCircle").addEventListener("click", circleArea)
document.getElementById("buttonTriangle").addEventListener("click", triangleArea)

//Get the area of the given shape and output it as an on-screen alert
function squareArea(){
    let dims = [square_width.value, square_height.value];
    let area = Math.round(dims[0]*dims[1]);

    window.alert("The area of the square would be "+area);
}

//Get the area of the given shape and output it as an on-screen alert
function circleArea(){
    let radius = circle_radius.value;
    radius = Math.pow(radius,2) //Square the radius
    let area = Math.round(Math.PI*radius);

    window.alert("The area of the circle would be "+area);
}

//Get the area of the given shape and output it as an on-screen alert
function triangleArea(){
    let base = triangle_base.value;
    let height = triangle_height.value;

    let area = Math.round((base*height)/2);

    window.alert("The area of the trianlge would be "+area);
}