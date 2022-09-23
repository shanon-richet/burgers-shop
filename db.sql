CREATE TABLE produits(
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    categorie TEXT NOT NULL,
    prix INT NOT NULL,
    img TEXT NOT NULL,
    ingredients TEXT NOT NULL
);

INSERT INTO produits(nom, categorie, prix, img, ingredients)
VALUES
('Hamburger', 'burgers', 7, 'img/burgers/burger1.png', 'burger de boeuf, tranche de cheddar, tomate, salade, oignon'),
('Double Hamburger', 'burgers', 10, 'img/burgers/burger2.png', '2 burgers de boeuf, 2 tranches de cheddar, tomate, salade, oignon'),
('Chicken Burger', 'burgers', 7, 'img/burgers/burger3.png', 'poulet pané, tranche de cheddar, tomate, salade, oignon'),
('Double Chicken', 'burgers', 10, 'img/burgers/burger4.png', '2 poulet pané, 2 tranches de cheddar, tomate, salade, oignon'),
('Fish Burger', 'burgers', 6, 'img/burgers/burger5.png', 'poisson pané, tranche de cheddar, tomate, salade, oignon'),
('Frites', 'snacks', 5, 'img/snacks/fries.png', 'patates'),
('Nuggets', 'snacks', 6, 'img/snacks/nuggets.png', 'poulet'),
('Oignons frits', 'snacks', 6, 'img/snacks/onion-rings.png', 'oignon'),
('Brownies', 'desserts', 5, 'img/desserts/dessert1.png', 'cake au chocolat, ganache au chocolat'),
('Muffin', 'desserts', 5, 'img/desserts/dessert2.png', 'cake nature, pépite de chocolat'),
('Tiramisu', 'desserts', 5, 'img/desserts/dessert3.png', 'biscuits, crème, cacao');
CREATE TABLE additionnal(
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    categorie TEXT NOT NULL,
    prix INT NOT NULL
)

INSERT INTO additionnal(nom, categorie, prix)
VALUES
    ('Coca', 'boissons', 2.5),
    ('Coca Zero', 'boissons', 2.5),
    ('Fanta', 'boissons', 2.5),
    ('Fanta Zero', 'boissons', 2.5),
    ('Lipton', 'boissons', 2.5),
    ('Ketchup', 'sauces', 1),
    ('Mayonnaise', 'sauces', 1),
    ('Brasil', 'sauces', 1),
    ('Barbecue', 'sauces', 1),
    ('Samourai', 'sauces', 1),
    ('Tartare', 'sauces', 1);

CREATE TABLE sauce(
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    prix INT NOT NULL
);

CREATE table card(
    id SERIAL PRIMARY KEY
);

create TABLE basket(
    card_id TEXT NOT NULL,
    id_produit INT NOT NULL,
    quantity INT NOT NULL,
    sauce TEXT
);
insert into basket(card_id, id_produit, quantity, sauce) 
VALUES (1, 1, 2, 'ketchup');

ALTER TABLE basket ADD FOREIGN KEY (id_produit) REFERENCES produits(id);

select nom, prix, img, quantity from basket INNER JOIN produits ON produits.id = id_produit WHERE id_produit = 1;