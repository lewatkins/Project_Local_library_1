function findAuthorById(authors, id) {
    return authors.find(author => author.id === id);
}

function findBookById(books, id) {
    return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
    let booksPartitionedByStatus = [];
    const borrowedBooks = books.filter(book => book.borrows[0].returned);
    const returnedBooks = books.filter(book => !book.borrows[0].returned);
    booksPartitionedByStatus.push(returnedBooks);
    booksPartitionedByStatus.push(borrowedBooks);
    return booksPartitionedByStatus;
}

function getBorrowersForBook(book, accounts) {
    let bookBorrowers = [];

    book.borrows.forEach(borrowedBook => {
        accounts.forEach(account => {
            if (borrowedBook.id === account.id) {
                let returnedAccounts = {};
                if (bookBorrowers.length < 10) {
                    returnedAccounts.id = account.id;
                    returnedAccounts.returned = borrowedBook.returned;
                    returnedAccounts.picture = account.picture;
                    returnedAccounts.age = account.age;
                    returnedAccounts.name = account.name;
                    returnedAccounts.company = account.company;
                    returnedAccounts.email = account.email;
                    returnedAccounts.registered = account.registered;
                    bookBorrowers.push(returnedAccounts);
                }
            }
        })
    })
    return bookBorrowers;
}

module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
};