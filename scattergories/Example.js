const book_data = require('data-store')({ path: process.cwd() + '/data/example.json' });

class Example {

    constructor (id, title, price, authors) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.authors = authors;
    }

    update () {
        book_data.set(this.id.toString(), this);
    }

    delete () {
        book_data.del(this.id.toString());
    }
}

Example.getAllIDs = () => {
    return Object.keys(book_data.data).map((id => {return parseInt(id);}));
}

module.exports = Example;