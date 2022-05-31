let overlay = document.querySelector('.overlay');
let container = document.querySelector('.container');
let cardTemplate = document.querySelector('.card.hidden');
let addButton = document.querySelector('.add-button');
let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(book) {
    library.push(book);
}

function displayBooks() {
    removeAllChild(container);

    library.forEach(book => {
        let newCard = cardTemplate.cloneNode(true);
        let title = newCard.querySelector('.title');
        let author = newCard.querySelector('.author');
        let pages = newCard.querySelector('.pages');
        let read = newCard.querySelector('.read');

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages + " pages";

        newCard.classList.remove('hidden');
        container.appendChild(newCard);
    })
}

function removeAllChild(container) {
    while (container.lastElementChild != addButton) {
        container.removeChild(container.lastElementChild);
    }
}

function submitForm() {
    let form = document.forms.newbook;
    if(!form.reportValidity()) return;

    let title = form.elements.title.value;
    let author = form.elements.author.value;
    let numpg = form.elements.numpg.value;
    let read = form.elements.read.value;
    let book = new Book(title, author, numpg, read);

    addBook(book);
    displayBooks();

    form.elements.title.value = '';
    form.elements.author.value = '';
    form.elements.numpg.value = '';
    form.elements.read.value = false;

    overlay.classList.add('hidden');
}

function openForm() {
    overlay.classList.remove('hidden');
}