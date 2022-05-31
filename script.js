let overlay = document.querySelector('.overlay');
let container = document.querySelector('.container');
let cardTemplate = document.querySelector('.card.hidden');
let addButton = document.querySelector('.add-btn');
let readButton = document.queryCommandIndeterm('.read-btn')
let library = [];

init();

function init() {
    let form = document.querySelector('form');
    form.addEventListener('click', e => e.stopPropagation());
    overlay.addEventListener('click', closeForm);

    readButton.addEventListener('click', e => {
        console.log(e);
    });
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + " pages";
    if(book.read) read.classList.add('true');
    else read.textContent = "Not read";

    newCard.classList.remove('hidden');
    container.appendChild(newCard);
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
    while (container.lastElementChild != addButton) {
        container.removeChild(container.lastElementChild);
    }
}