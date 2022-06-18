let overlay = document.querySelector('.overlay');
let container = document.querySelector('.container');
let cardTemplate = document.querySelector('.card.hidden');
let addBtn = document.querySelector('.add-btn');
let library = [];
let currentBookID = 0;

init();

function init() {
    let form = document.querySelector('form');
    form.addEventListener('click', e => e.stopPropagation());
    overlay.addEventListener('click', closeForm);
}

class Book {
    constructor(title, author, pages, read) {
        this.bookID = currentBookID++;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBook(book) {
    library.push(book);
    appendBook(book);
}

function appendBook(book) {
    let newCard = cardTemplate.cloneNode(true);
    let title = newCard.querySelector('.title');
    let author = newCard.querySelector('.author');
    let pages = newCard.querySelector('.pages');
    let read = newCard.querySelector('button');
    let del = newCard.querySelector('.delete');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + 
                        ((book.pages != 1) ?
                            ' pages' : ' page');

    if(book.read) readBook(read);
    read.id = book.bookID;

    read.addEventListener('click', e => toggleRead(e.target));
    del.addEventListener('click', e => deleteCard(e.target));

    newCard.classList.remove('hidden');
    container.appendChild(newCard);
}

function toggleRead(button) {
    let book = library.find(book => book.bookID == button.id)

    if(book.read) unreadBook(button);
    else readBook(button);

    book.read = !book.read;
}

function unreadBook(button) {
    button.classList.remove('true');
    button.textContent = 'Not read';
}

function readBook(button) {
    button.classList.add('true');
    button.textContent = 'Read';
}

function deleteCard(button) {
    button.parentElement.parentElement.remove();
}

function submitForm() {
    let form = document.forms.newbook;
    if(!form.reportValidity()) return;

    let title = form.elements.title.value;
    let author = form.elements.author.value;
    let numpg = form.elements.numpg.value;
    let read = form.elements.read.checked;
    let book = new Book(title, author, numpg, read);

    addBook(book);
    closeForm();
}

function openForm() {
    overlay.classList.remove('hidden');
}

function closeForm() {
    document.forms.newbook.reset();
    overlay.classList.add('hidden');
}

function refreshBooks() {
    removeAllChild(container);
    library.forEach(book => appendBook(book));
}

function removeAllChild(container) {
    while (container.lastElementChild != addBtn
    ) {
        container.removeChild(container.lastElementChild);
    }
}