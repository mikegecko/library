const display = document.getElementById("disp");
display.innerText = 'test';
let myLibrary = [];

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function(){
    let x = '';
    this.read ? x = 'has read' : x = 'not yet read';
    return(`${this.title} by ${this.author}, ${this.pages} pages, ${x}`);
}
function addBookToLibrary(){
    //This will be called when user presses submit button on for with new book info
}
function displayLibrary(){
    //Loop through myLibrary[] and add book cards to html
}
const book1 = new Book('The Hobbit','J.R.R. Tolkien', 295, false);
console.log(book1.info());