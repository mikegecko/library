const libraryGrid = document.getElementById('library');
const addItem = document.getElementById('add-btn');
const overlay = document.getElementById('form-overlay');
const exitOverlay = document.getElementById('exit-btn');
const submitItem = document.getElementById('submit-btn');
const newBook = document.getElementById('book-form');
submitItem.addEventListener('click', addBook);
overlay.addEventListener('click', overlayControl);
addItem.addEventListener('click', overlayControl);
exitOverlay.addEventListener('click', overlayControl);
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

const book0 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
myLibrary.push(book0);
displayLibrary();
//TODO: You can add empty items & duplicate books
function displayLibrary() {
    //Loop through myLibrary[] and add book cards to html - maybe add checking for duplicate books
    myLibrary.forEach(book => {
        const div = document.createElement('div');
        const bookID = myLibrary.indexOf(book);
        if (document.getElementById(`book${bookID}`)) {
            return;
        } else {
            div.className = 'book-item';
            div.id = 'book' + bookID;
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
            const remove_btn = document.getElementById('del' + bookID);
            btn.addEventListener('click', readStatus);
            remove_btn.addEventListener('click', removeBook);
            book.read ? btn.classList.add('btn-read') : btn.classList.add('btn-notread');
            console.table(myLibrary);
        }
    });
    bookinfoDisplay();
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
    bookinfoDisplay();
}
//Make it so that when elements are removed they are assigned proper id's
function removeBook(event) {
    let bookIndex = event.target.id
    bookIndex = bookIndex.replace(/\D/g, '');
    myLibrary.splice(bookIndex , 1);
    const toRemove = document.getElementById('book' + bookIndex);
    toRemove.remove();
    bookinfoDisplay();
}

function overlayControl(event) {
    if (event.target.id === 'add-btn') {
        overlay.style.display = "flex";
    } else if (event.target.id === 'exit-btn' || event.target.id === 'form-overlay') {
        overlay.style.display = 'none';
    }
}

function addBook(event) {
    let title = newBook[0].value;
    let author = newBook[1].value;
    let pages = newBook[2].value;
    let isread = newBook[3].checked; //this is true || false
    for (let index = 0; index < newBook.length; index++) {
        const element = newBook[index];
        element.value = '';
        element.checked = false;
    }
    let book = new Book(title, author, pages, isread);
    myLibrary.push(book);
    displayLibrary();
    overlay.style.display = 'none';
}

function bookinfoDisplay(){
    const planToRead = document.getElementById('booksunread');
    const booksRead = document.getElementById('booksread');
    const readPages = document.getElementById('pagesread');
    let totalPages = 0;
    let totalBooks = 0;
    let totalUnread = 0;
    myLibrary.forEach(book => {
        if(book.read){
            totalBooks += 1;
            totalPages += parseInt(book.pages);
        }
        else{
            totalUnread += 1;
        }
    });
    planToRead.innerText = totalUnread;
    booksRead.innerText = totalBooks;
    readPages.innerText = totalPages;
    return;
}