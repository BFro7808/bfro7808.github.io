//Gets the width and height of the inner and outerwindow, then calls the update helper function
function sizeChanged(){
    let dimsOuter=[0,0]; //Width and height of window + toolbar
    let dimsInner=[0,0]; //Width and hegith of window, not including toolbar

    dimsOuter[0]=window.outerWidth;
    dimsOuter[1]=window.outerHeight;

    dimsInner[0]=window.innerWidth;
    dimsInner[1]=window.innerHeight;

    updateVals(dimsOuter,dimsInner);
}

//Updates all of the dynamic values on the page
function updateVals(dimsOuter,dimsInner){
    outputWhole.innerHTML=dimsOuter[0]+"x"+dimsOuter[1];

    outputPage.innerHTML=dimsInner[0]+"x"+dimsInner[1];

    outputLocation.innerHTML=window.location.toString();
}