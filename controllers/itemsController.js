//itemsController.js
const pool = require('../db/pool');
const { validationResult } = require('express-validator')

getItems = async (req, res) => {
    const category = req.query.category;
    const allItems = await pool.query("SELECT * FROM inventory");
    let filtered;

    if (!category || category === 'all') {
        filtered = allItems.rows;
    } else {
        const result = await pool.query("SELECT * FROM inventory WHERE category = $1", [category]);
        filtered = result.rows;
    }
    res.render('index', {items: filtered});
}

searchItem = async (req, res) => {
    const { id, item, category } = req.query;
    let searched;    
    let result;

    if(id) {
        result = await pool.query("SELECT * FROM inventory WHERE id = $1", [id]);
        searched = result.rows;
    } else if (item) {
        result = await pool.query("SELECT * FROM inventory WHERE item ILIKE $1", [`%${item}%`]);
        searched = result.rows;
    } else if (category) {
        result = await pool.query("SELECT * FROM inventory WHERE category = $1", [category]);
        searched = result.rows;
    }
    res.render('search', { 
        title: "Search Item",
        items: searched,
        id,
        item: item,
        category,
     });
}

addItemGet = async (req, res) => {
    res.status(200).render('addItem', {
        title: "Add Item",
        errors: [],
    })
}

addItemPost = async (req, res) => {
    const {item, category, quantity, price} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).render('addItem', {
            title: "Add Item",
            errors: errors,
        })
    }

    await pool.query(
        "INSERT INTO inventory (item, category, quantity, price) VALUES ($1, $2, $3, $4)", 
        [item, category, quantity, price]
    );
    res.redirect('/');
}

editItemGet = async (req, res) => {
    const {id} = req.params;
    const result = await pool.query("SELECT * FROM inventory WHERE id = $1", [id]);
    const item = result.rows[0];

    res.render('editItem', {
        title: "Edit Item",
        item: item,
        errors: [],
    })
}

editItemPost = async (req, res) => {
    const {id} = req.params;
    const {item, category, quantity, price} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).render('editItem', {
            title: "Edit Item",
            errors: errors,
        })
    }

    await pool.query("UPDATE inventory SET item = $1, category = $2, quantity = $3, price = $4 WHERE id = $5", 
        [item, category, quantity, price, id]
    );
    res.redirect('/');
}

deleteItem = async (req, res) => {
    const {id} = req.params;
    await pool.query("DELETE FROM inventory WHERE id = $1", [id]);
    res.redirect('/');
}

module.exports = {
    getItems,
    searchItem,
    addItemGet,
    addItemPost,
    editItemGet,
    editItemPost,
    deleteItem,
}