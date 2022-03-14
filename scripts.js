const libraryGrid = document.getElementById('library');
document.get
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function () {
    let x = '';
    this.read ? x = 'Has read' : x = 'Not yet read';
    return (`<h3>${this.title}</h3> <p>by ${this.author}</p> <p>${this.pages} pages</p> <button id="btn${myLibrary.indexOf(this)}">${x}</button>`);
}
Book.prototype.readToggle = function () {
    this.read = !this.read;
    return(this.read);
}

function addBookToLibrary() {
    //This will be called when user presses submit button on for with new book info
}

function displayLibrary() {
    //Loop through myLibrary[] and add book cards to html
    myLibrary.forEach(book => {
        const div = document.createElement('div');
        const bookID = 'book' + myLibrary.indexOf(book);
        div.className = 'book-item';
        div.id = bookID
        div.innerHTML = `${book.info()}
        <div class="func-container">
            <div id="${bookID}" class="remove-btn">
                <span class="material-icons-outlined md-36 md-dark">
                    delete
                </span>
            </div>
        `;
        libraryGrid.appendChild(div);
        let btn = document.getElementById('btn' + myLibrary.indexOf(book));
        btn.addEventListener('click',readStatus);
    });

}
function readStatus(event){
    let bookIndex = event.target.id
    bookIndex = bookIndex.replace(/\D/g,'');
    if(myLibrary[bookIndex].readToggle()) event.target.innerHTML = 'Has read';
    else event.target.innerHTML = 'Not yet read';
    
}
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
myLibrary.push(book1);
console.log(book1.info());
console.table(myLibrary);
displayLibrary();