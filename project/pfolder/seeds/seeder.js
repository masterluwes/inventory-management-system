const mongoose = require('mongoose');
const Item = require('../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/item-db')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    })

const seedDb = async () => {
    const items = new Item({
        name: 'Fantech Thor X9',
        category: 'Mouse',
        quantity: 5,
        price: 399,
        description: 'Gaming Mouse',
    })
    await items.save();
}

seedDb().then(() => {
    mongoose.connection.close();
})