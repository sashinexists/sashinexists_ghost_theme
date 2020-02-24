const BOOKS_ISBN = [];
const BOOKS_DATA = [];
const API_KEY = "AIzaSyDklm5z7_hEWzu0UI32nST3N4-Fiw2a1rk";

const GET_BOOKS = async (startFrom) => {
    return fetch(`https://www.googleapis.com/books/v1/users/113934123220440811674/bookshelves/0/volumes?&key=AIzaSyDklm5z7_hEWzu0UI32nST3N4-Fiw2a1rk&fields=items(volumeInfo,%20searchInfo)&startIndex=${startFrom}&maxResults=40`)
                .then(response=>response.json())
                .then(parsed=>parsed.items);
}

const GET_VOLUME_COUNT = async() => {
    return fetch(`https://www.googleapis.com/books/v1/users/113934123220440811674/bookshelves/0?&key=AIzaSyDklm5z7_hEWzu0UI32nST3N4-Fiw2a1rk&fields=volumeCount`)
        .then(response=>response.json())
        .then(parsed=>parsed.volumeCount);
}

async function getAllBooks() {
    const BOOKS_1 = await GET_BOOKS(0);
    const BOOKS_2 = await GET_BOOKS(40);
    const BOOKS_3 = await GET_BOOKS(80);
    return BOOKS_1.concat(BOOKS_2).concat(BOOKS_3);
}

async function initBooks()  {
    const VOLUME_COUNT = await GET_VOLUME_COUNT();
    const LOCAL_BOOKS = localStorage.books ? JSON.parse(localStorage.books) : [];
    if(LOCAL_BOOKS.length !== VOLUME_COUNT) {
        console.log("Locked and loaded!");
        const BOOKS = await getAllBooks();
        localStorage.books = JSON.stringify(BOOKS);
    }
    return localStorage.books;
}


const BOOK_SEARCH_TEMPLATE = (book) => `
    <section class="book-search-display">
        <img class="book-cover book-search-cover" src="${book.volumeInfo.imageLinks.thumbnail}"/>
        <div class="book-information">
            <i class="fas fa-book book-icon device-only"></i>
            <h3 class="book-search-title">${book.volumeInfo.title}</h3>
            <h4 class="book-author">${book.volumeInfo.authors ? book.volumeInfo.authors[0] :""}</h4>
            <p class="book-snippet">${book.volumeInfo.description ? book.volumeInfo.description :"This book has no description."}</p>
        </div>
    </section>
`;

const BOOK_INFO_TEMPLATE = (book) => `
    <a href="${book.volumeInfo.previewLink}" class="book">
        <img class="book-cover" height="180px" width="200px" src="${book.volumeInfo.imageLinks.thumbnail}"/>
        <div class="book-information">
            <h3 class="book-title">${book.volumeInfo.title}</h3>
            <h4 class="book-author">${book.volumeInfo.authors ? book.volumeInfo.authors[0] :""}</h4>
            <p class="book-snippet">${book.volumeInfo.description ? book.volumeInfo.description :"This book has no description."}</p>
            <button class="book-google-info"><span>More Info</span><i class="fab fa-google"></i></button>
        </div>
    </a>
`;

const BOOK_LIST_ITEM_TEMPLATE = (book) => `
        <img class="book-cover" height="180px" width="200px" src="${book.volumeInfo.imageLinks.thumbnail}"/>
        <div class="book-information">
            <h3 class="book-title">${book.volumeInfo.title}</h3>
            <h4 class="book-author">${book.volumeInfo.authors ? book.volumeInfo.authors[0] :""}</h4>
            <p class="book-snippet">${book.volumeInfo.description ? book.volumeInfo.description :"This book has no description."}</p>
        </div>
`;

const RENDER_BOOK = () => {
    renderBooks(BOOK_INFO_TEMPLATE);
}

const RENDER_BUTTONS = () => {
    const BUY_BOOK = document.querySelector(".buy-book-amazon");
    BUY_BOOK.setAttribute("href",`https://amzn.to/${BUY_BOOK.id.slice(6)}`);

    const ABOUT_AUTHOR = document.querySelector(".about-author");
    ABOUT_AUTHOR.setAttribute("href", `/tag/${ABOUT_AUTHOR.id.toLowerCase().split(" ").join("-")}`);
}

const RENDER_SEARCH = () => {
    renderBooks(BOOK_SEARCH_TEMPLATE);
}

const RENDER_BOOKLIST = () => {
    renderBooks(BOOK_LIST_ITEM_TEMPLATE);
}

async function renderBooks(template) {
    await initBooks();
    const BOOKS = JSON.parse(localStorage.books);
    const ISBN_LIST = [].slice.call(document.querySelectorAll(".book")).map(node=>node.id.slice(6));
    displayBooks(getBooksByISBNList(BOOKS, ISBN_LIST), template);
}

function getBooksByISBNList(books, isbnList) {
    return isbnList.map(isbn => getBookByISBN(books, isbn));
}


function getBookByISBN(books, isbn) {
    return books.find(book=>book.volumeInfo.industryIdentifiers.find(id => id.type==="ISBN_13").identifier===isbn);
}

function displayBooks(books, template) {
    books.forEach(book=>displayBook(book, template));
}

function displayBook(book, template) {
    const BOOK_ID = book.volumeInfo.industryIdentifiers.find(id => id.type==="ISBN_13").identifier;
    document.getElementById("#ISBN-"+BOOK_ID).innerHTML = template(book);
}