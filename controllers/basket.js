import pool from '../db.mjs'
import cookie from 'cookie'
import {v4 as uuidv4} from 'uuid'


const getBasket = (async(req, res) => {
    const basket = await pool.query(`SELECT card_id, nom, prix, quantity, sauce FROM basket INNER JOIN produits ON produits.id = id_produit WHERE card_id = ('${req.cookies.burger}');`)
    res.status(200).json(basket.rows)
})

const addToBasket = (async(req, res) => {
    if (req.cookies.burger == undefined) {
        res.cookie('burger', uuidv4())
    }
    const id = await pool.query(`SELECT id from produits WHERE nom = ('${req.body.nom}');`)
    const query = {
        text: `INSERT INTO basket(card_id, id_produit, quantity, sauce) VALUES($1, $2, $3, $4) RETURNING *`,
        values: [`${req.cookies.burger}`, `${id.rows[0].id}`, `${req.body.quantity}`, `${req.body.sauce}`]
    }
    console.log('Cookie', req.cookies)
    pool.query(query, (err, r) => {
        if (err) {
            throw err
        } else {
            res.redirect('/')
        }
    }) 
})

const deleteFromBasket = (async(req, res) => {

})

export {getBasket, addToBasket, deleteFromBasket}