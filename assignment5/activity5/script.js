document.getElementById("shoeSizeInput").addEventListener("keyup", function(){returnSockSize(shoeSizeInput.value);});

//Takes in a number of a shoe size and return the 'appropriate' sock size
function returnSockSize(shoeSize){
    let sockSize='';
    //validate
    if(isNaN(shoeSize)){
        sockSize="<red>Size needs to be a number</red>"
    }
    else if(shoeSize==null){
        sockSize="";
    }
    //passed validation
    else{
        if(shoeSize<4) sockSize = "Extra Small";
        else if(shoeSize>=4 && shoeSize<7) sockSize = "Small";
        else if(shoeSize>=7 && shoeSize<10) sockSize = "Medium";
        else if(shoeSize>=10 && shoeSize<13) sockSize = "Medium";
        else sockSize = "Extra Large";
    }
    output.innerHTML = sockSize;
}