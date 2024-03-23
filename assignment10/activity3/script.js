document.getElementById("formatAPA").addEventListener("click", function(){getValues(0);});
document.getElementById("formatMLA").addEventListener("click", function(){getValues(1);});
document.getElementById("autoFillBtn").addEventListener("click", fillAuto);

let book = {};

//Gets all of the values for the book object and stores them to an array, then calls the setBookKeys function & sends in the array of values
function getValues(format){
    //Format 0 is APA, format 1 is MLA
    let bookVals = [];
    bookVals.push(title.value);
    bookVals.push(author.value);
    bookVals.push(year.value);
    bookVals.push(publisher.value);
    bookVals.push(city.value);
    bookVals.push(state.value);

    setBookKeys(bookVals);

    if(format==0) formatToAPA();
    else formatToMLA();
}

//Gives the book option all of its key values
function setBookKeys(values){
    /* values key
    0 - Title
    1 - Author
    2 - Year
    3 - Publisher
    4 - City
    5 - State
    */
    book.title=values[0]
    book.author=values[1]
    book.year=values[2]+"" //make sure its a string for safety reasons
    book.publisher=values[3]
    book.city=values[4]
    book.state=values[5]

    console.log(book)
}

//Output a string for the book option in APA format
function formatToAPA(){
    //Last, First initial, (Year) Title. City, State: Publisher

    let authorName = sepFirstLast(book.author);//0 is first name, 1 is last name    NO MIDDLE NAME
    console.log(authorName);

    let str = "";
    str+=authorName[1]+", ";                            //Add the last name
    str+=String(authorName[0]).substring(0,1)+". ";     //Add only the first letter of the author's first name
    str+="("+book.year+") <i>"+book.title+".</i> ";     //Add year and title
    str+=book.city+", "+book.state+": "+book.publisher; //Add city, state, and publisher cap

    output.innerHTML = str;
}

//Same as formatToAPA, but for MLA
function formatToMLA(){
    let authorName = sepFirstLast(book.author);//0 is first name, 1 is last name    NO MIDDLE NAME
    console.log(authorName);

    let str="";
    str+=authorName[1]+", "+authorName[0]+", ";  //Add the author's first and last name
    str+=book.title+". "+book.publisher+", ";   //Add the book title and publisher
    str+=book.year;                             //Add the book year

    output.innerHTML = str;
}

//Takes in a single name string and returns an array of the first/ last name separated
function sepFirstLast(name){
    return name.split(" ");
}

//Automatically fill the text inputs with test info
function fillAuto(){
    title.value="Flowers and Trees"
    author.value="Bob Miller"
    year.value="1989"
    publisher.value="Joli Publishing"
    city.value="Nashville"
    state.value="TN"
}