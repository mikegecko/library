const libraryGrid = document.getElementById('library');
const addItem = document.getElementById('add-btn');
addItem.addEventListener('click', addBook);
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function () {
    let x = '';
    this.read ? x = 'Read' : x = 'Not yet read';
    return (`<h3>${this.title}</h3> <p>by ${this.author}</p> <p>${this.pages} pages</p> <button id="btn${myLibrary.indexOf(this)}">${x}</button>`);
}
Book.prototype.readToggle = function () {
    this.read = !this.read;
    return (this.read);
}

function addBookToLibrary() {
    //This will be called when user presses submit button on for with new book info
}

function displayLibrary() {
    //Loop through myLibrary[] and add book cards to html
    myLibrary.forEach(book => {
        const div = document.createElement('div');
        const bookID =myLibrary.indexOf(book);
        div.className = 'book-item';
        div.id = 'book'+bookID;
        div.innerHTML = `${book.info()}
        <div class="func-container">
            <div class="remove-btn">
                <span id="del${bookID}" class="material-icons-outlined md-36 md-dark">
                    delete
                </span>
            </div>
        `;
        libraryGrid.appendChild(div);
        const btn = document.getElementById('btn' + bookID);
        const remove_btn = document.getElementById('del'+ bookID);
        btn.addEventListener('click', readStatus);
        remove_btn.addEventListener('click', removeBook);
        book.read ? btn.classList.add('btn-read') : btn.classList.add('btn-notread');
    });
}
//Receives button event and toggles read property
function readStatus(event) {
    let bookIndex = event.target.id
    bookIndex = bookIndex.replace(/\D/g, '');
    if (myLibrary[bookIndex].readToggle()) {
        event.target.innerHTML = 'Read';
        event.target.classList.add('btn-read');
        event.target.classList.remove('btn-notread');
    } else {
        event.target.innerHTML = 'Not yet read';
        event.target.classList.add('btn-notread');
        event.target.classList.remove('btn-read');
    }
}

function removeBook(event){
    let bookIndex = event.target.id
    bookIndex = bookIndex.replace(/\D/g, '');
    myLibrary.pop(bookIndex);
    const toRemove = document.getElementById('book'+bookIndex);
    toRemove.remove();
}

function addBook(event){
    
}
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
myLibrary.push(book1);
console.log(book1.info());
console.table(myLibrary);
displayLibrary();