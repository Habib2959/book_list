// UI
let form = document.querySelector('#form');
let tableBody = document.querySelector('tbody');


// Classes
class Book{
    constructor(name, author, isbn){
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    static createList(books){
        let tableBody = document.querySelector('tbody');
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${books.name}</td>
            <td>${books.author}</td>
            <td>${books.isbn}</td>
            <td><a href="#" id="cancel-btn">X</a></td>
        `;
        tableBody.appendChild(row);
    }

    static clearFields(){
        document.getElementById('book-title').value= '',
        document.getElementById('book-author').value ='',
        document.getElementById('isbn').value = '';
    }

    static removeBook(target){
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBooksLs(target.parentElement.previousElementSibling.textContent.trim());
        }
    }

    static showAlert(className, message){
        let container = document.querySelector('#container');
        let form = document.querySelector('#form');
        let div = document.createElement('div');
        div.className = `${className}`;
        div.innerText = message;
        container.insertBefore(div, form);

        setTimeout(()=>{
            document.querySelector(`.${className}`).remove();
        },1000);
    }
}

class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooksLs(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks(){
        let books = Store.getBooks();
        
        books.forEach( book => {
            UI.createList(book);
        });
    }

    static removeBooksLs(isbn){
        let books = Store.getBooks();
        
        books.forEach((book, index) => {
            if (book.isbn == isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// add eventlistener
form.addEventListener('submit', addBooks);
tableBody.addEventListener('click', removeBooks);
document.addEventListener('DOMContentLoaded', Store.displayBooks());




// functions
function addBooks(e){
    let bookTitle = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let isbn = document.getElementById('isbn').value;

    if (bookTitle == '' || author == '' || isbn == '') {
        alert('please fill up the form');
    } else {
        let books = new Book(bookTitle, author, isbn);
        UI.createList(books);
        UI.clearFields();
        UI.showAlert("sucess", "Book added");
        Store.addBooksLs(books);
    
    }



    e.preventDefault();
}

function removeBooks(e){
    UI.removeBook(e.target);
    UI.showAlert("error", "Book Removed");
}