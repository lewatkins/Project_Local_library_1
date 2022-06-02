function getTotalBooksCount(books) {
    let totalBookCount = 0;
    for (let book in books) {
        totalBookCount += 1;
    }
    return totalBookCount;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    let borrowedCount = 0;
    books.forEach(book => {
        if (book.borrows[0].returned === false) {
            borrowedCount += 1;
        }
    });

    return borrowedCount;
}


function getMostCommonGenres(books) {
    let allGenresArr = [];

    books.map((book) => {
        let allGenresObj = {};
        allGenresObj.name = book.genre
        allGenresArr.push(allGenresObj);
    })

    let tempArr = [];
    for (let i = 0; i < allGenresArr.length; i++) {
        let tempObj = {
            name: null,
            count: null,
        };
        let index = tempArr.findIndex((genre) => genre.name === allGenresArr[i].name);
        if (index === -1) {
            tempObj.name = allGenresArr[i].name;
            tempObj.count = 1;
            tempArr.push(tempObj);
        } else {
            tempArr[index].count += 1;
        }
    }
    tempArr.sort((a, b) => {
        return b.count - a.count
    });
    tempArr.length = 5;
    return tempArr;
}

function getMostPopularBooks(books) {
    let mostPopularBooks = []
    books.forEach(book => {
        let currentBook = {};
        currentBook.name = book.title;
        currentBook.count = book.borrows.length;
        mostPopularBooks.push(currentBook);
    });

    mostPopularBooks.sort((a, b) => {
        return b.count - a.count
    });

    if (mostPopularBooks.length > 5) {
        mostPopularBooks.length = 5;
    }
    return mostPopularBooks;

}

function getMostPopularAuthors(books, authors) {
    let mostPopularAuthors = []

    authors.forEach(author => {
        books.forEach(book => {
            if (book.authorId === author.id) {
                let currentAuthor = {};
                currentAuthor.name = author.name.first + " " + author.name.last;
                currentAuthor.count = book.borrows.length;
                mostPopularAuthors.push(currentAuthor);
            }

        })
    });

    const selectedAuthors = selectPopularAuthors(mostPopularAuthors);
    return selectedAuthors;
}

// Helper Function

function selectPopularAuthors(mostPopularAuthors) {
    mostPopularAuthors.sort((a, b) => {
        return a.name - b.name;
    });

    const selectedAuthors = Object.values(
        mostPopularAuthors.reduce((acc, item) => {
            acc[item.name] = acc[item.name] ? {...item, count: item.count + acc[item.name].count } : item;
            return acc;
        }, {})
    );

    selectedAuthors.sort((a, b) => {
        return b.count - a.count;
    });

    if (selectedAuthors.length > 4) {
        selectedAuthors.length = 5;
    }

    return selectedAuthors;
}


module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};