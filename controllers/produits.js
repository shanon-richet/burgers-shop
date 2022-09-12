import pool from '../db.mjs'

const products = await pool.query('SELECT * FROM produits ORDER BY id ASC;')

const getProducts = (async(req, res) => {
    res.status(200).json(products.rows)
})

const getProduct = (async(req, res) => {
    const id = req.params.id
    console.log(id)
    const product = products.rows.find(product => product.id == id)
    res.status(200).json(product)
})


export {getProduct, getProducts}