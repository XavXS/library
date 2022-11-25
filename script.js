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

    let title = form.elements.title;
    let author = form.elements.author;
    let numpg = form.elements.numpg;

    title.addEventListener('input', () => { title.setCustomValidity(''); });
    if(title.validity.valueMissing) title.setCustomValidity('You must enter title!');
    else title.setCustomValidity('');
    if(!title.reportValidity()) return;

    author.addEventListener('input', () => { author.setCustomValidity(''); })
    if(author.validity.valueMissing) author.setCustomValidity('You must enter author!');
    else author.setCustomValidity('');
    if(!author.reportValidity()) return;

    numpg.addEventListener('input', () => { numpg.setCustomValidity(''); })
    if(numpg.validity.valueMissing) numpg.setCustomValidity('You must enter number of pages!');
    else if(numpg.validity.rangeUnderflow) numpg.setCustomValidity('Number of pages must be greater than 0')
    else if(numpg.validity.rangeOverflow) numpg.setCustomValidity('Number of pages must be less than 100,000');
    else numpg.setCustomValidity('');
    if(!numpg.reportValidity()) return;
    
    let read = form.elements.read;
    let book = new Book(title.value, author.value, numpg.value, read.checked);

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