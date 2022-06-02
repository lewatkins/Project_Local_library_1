function findAccountById(accounts, id) {
    const authorInfo = accounts.find(element => element.id === id);
    return authorInfo;
}

function sortAccountsByLastName(accounts) {
    accounts.sort(function(a, b) {
        const nameA = a.name.last.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.last.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    return accounts;
}

function getTotalNumberOfBorrows(account, books) {
    let timesBorrowed = 0;
    for (let i = 0; i < books.length; i++) {
        for (j = 0; j < books[i].borrows.length; j++) {
            if (account.id === books[i].borrows[j].id) {
                timesBorrowed += 1;
            }
        }
    }
    return timesBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
    let borrowedBooks = [];
    books.forEach(book => {
        for (let i = 0; i < book.borrows.length; i++) {
            if (book.borrows[i].id === account.id) {
                let borrowedBookObj = {};
                if (!book.borrows[i].returned) {
                    borrowedBookObj.id = book.id;
                    borrowedBookObj.title = book.title;
                    borrowedBookObj.authorId = book.authorId;
                    borrowedBookObj.author = authors[book.authorId];
                    borrowedBookObj.borrows = book.borrows;
                    borrowedBooks.push(borrowedBookObj);
                }
            }
        }
    })
    return borrowedBooks;
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
};