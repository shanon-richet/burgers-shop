CREATE TABLE products
    (id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    img TEXT NOT NULL
);