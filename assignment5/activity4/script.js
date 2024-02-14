//document.getElementById("shoeSizeInput").addEventListener("keyup", function(){returnSockSize(shoeSizeInput.value);}); example embed of param
// none - hide element
// inline - shows the element as far as im concerned :)

document.getElementById("whatToShow").addEventListener("keyup", function(){menuUpdate(whatToShow.value);});

document.getElementById("buttonSquare").addEventListener("click", squareArea)
document.getElementById("buttonCircle").addEventListener("click", circleArea)
document.getElementById("buttonTriangle").addEventListener("click", triangleArea)

function menuUpdate(shape){
    if(shape.toLowerCase(shape)=='square'){
        //show
        left.style="display:inline;"
        //hide
        middle.style="display:none;"
        right.style="display:none;"
    }
    else if(shape.toLowerCase(shape)=='circle'){
        //show
        middle.style="display:inline;"
        //hide
        left.style="display:none;"
        right.style="display:none;"
    }
    else if(shape.toLowerCase(shape)=='triangle'){
        //show
        right.style="display:inline;"
        //hide
        middle.style="display:none;"
        left.style="display:inlnoneine;"
    }
}

//Get the area of the given shape and output it as an on-screen alert
function squareArea(){
    let dims = [square_width.value, square_height.value];
    let area = Math.round(dims[0]*dims[1]);

    window.alert("The area of the square would be "+area);
}

//Get the area of the given shape and output it as an on-screen alert
function circleArea(){
    let radius = circle_radius.value;
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