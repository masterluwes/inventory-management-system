const mongoose = require('mongoose');
const Item = require('../../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/item-db')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    })

// List of All Items
exports.items = async(req, res) => {
    const items = await Item.find({});
    res.render('index', {items});
}

// Add Item Form
exports.addItemForm = (req, res) => {
    res.render('new-item');
}

// Create Item
exports.addItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        // Redirect to items list with success query
        res.redirect('/items?success=true');
    } catch (err) {
        console.error("Error adding item:", err);
        // Redirect to items list with failure query
        res.redirect('/items?success=false');
    }
};

// View Specific Item
exports.viewItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('show-item', {item});
}

// Update Item Form
exports.editItemForm = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit-item', {item});
}

// Update Item
exports.updateItem = async (req, res) => {
    const { id } = req.params;
    try {
        await Item.findByIdAndUpdate(id, { ...req.body });
        // Redirect to the show-item page with success=true
        res.redirect(`/items/${id}?success=true`);
    } catch (err) {
        console.error("Error updating item:", err);
        // Redirect to the edit page with an error message
        res.redirect(`/items/${id}/edit?error=UpdateFailed`);
    }
};

// Delete Item
// Delete Item
exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await Item.findByIdAndDelete(id);
        res.redirect('/items?deleteSuccess=true'); // Redirect with success parameter
    } catch (err) {
        console.error("Error deleting item:", err);
        res.redirect('/items?deleteSuccess=false'); // Redirect with failure parameter if needed
    }
};
