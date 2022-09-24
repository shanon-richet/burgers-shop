
var choice = document.getElementById('choice')
var nav = document.getElementById('food-nav')
var close = document.getElementById('close-choice')

close.onclick = () => {
    choice.style.display = "none"
}

fetch('https://love-burgers.herokuapp.com/api/products')
.then(res => res.json())
.then(json => {
    var burgers = []
    var sides = []
    var desserts = []
    for (const x of json) {
        var html = `
        <article id="item">
        <img src="${x.img}">
            <div>
            <h3><b>${x.nom}</b></h3>
            <p>Prix : ${x.prix} €</p>
            <aside>Ingrédients : ${x.ingredients}</aside>
            </div>
        <button id="add-btn">ADD</button>
        </article>
        `
        if (x.categorie === 'burgers') {
            burgers.push(html)
        }
        if (x.categorie === 'snacks') {
            sides.push(html)
        }
        if (x.categorie === 'desserts') {
            desserts.push(html)
        }
    }
    class Menu extends HTMLElement {
        connectedCallback() {
            this.innerHTML= `
                <section id="menu-items">
                    <h2>BURGERS</h2>
                    <section class="items" id="burgers">
                        ${burgers.join('')}
                    </section>
                    <h2>SIDES</h2>
                    <section class="items" id="sides">
                        ${sides.join('')}
                    </section>
                    <h2>DESSERTS</h2>
                    <section class="items" id="desserts">
                        ${desserts.join('')}
                    </section>
                </section>
            `
        }
    }
    customElements.define('menu-content', Menu)

    const items = document.querySelectorAll('#item')
    items.forEach(function(x) {
        x.onclick = (e) => {
            const reg = /[0-9]+/g
            var add_form = document.getElementById('add')
            let t = e.target.parentElement.childNodes
            let price = t[3].childNodes[3].textContent.match(reg)
            choice.style.display = "block"
            choice.style.top = `${window.pageYOffset + 200}px`

            /* HTML */
            let inner = []
            inner.push(`                        
            <form id="add-form" method="post" action="/add">
                <img src="${t[1].src}">
                <input id="food-name" type="text" name="nom" value="${t[3].childNodes[1].textContent}" readonly>
            `)
            if (e.target.parentElement.parentElement.getAttribute('id') !== "desserts") {
                inner.push(`                                
                <div><label for="sauce">Sauce : </label>
                <select id="sauces" name="sauce">
                    <option value="null">Sans sauce</option>
                    <option value="ketchup">Ketchup</option>
                    <option value="mayonnaise">Mayonnaise</option>
                    <option value="brasil">Brasil</option>
                    <option value="samourai">Samourai</option>
                    <option value="barbecue">Barbecue</option>
                </select></div>
                `)
            }
            if (e.target.parentElement.parentElement.getAttribute('id') === "burgers") {
                inner.push(`                                
                <div><label for="boisson">Boisson (+2,5 €) :</label>
                <input id="add-drink" type="button" name="boisson" value="+">
                <select id="boisson" name="boisson" hidden>
                    <option value="null"></option>
                    <option value="coca-cola">Coca-Cola</option>
                    <option value="coca-zero">Coca-Cola Zero</option>
                    <option value="fanta">Fanta</option>
                    <option value="fanta-zero">Fanta Zero</option>
                    <option value="ice-tea">Ice-Tea Pêche</option>
                </select></div>
                `)     
            }
            inner.push(`
                <div id="div-quantity"><input id="moins" type="button" value="-"><input id="quantity" name="quantity" value="1"><input id="plus" type="button" value="+"></div>
                    <input id="submit" type="submit" value="add ${price} $">
                </form>
            `)
            if (add_form !== null) {
                var child = add_form.firstElementChild
                while(child) {
                    child.remove()
                    child = add_form.lastElementChild
                }
                add_form.innerHTML = inner.join('')
                changeOpacity()
            } else {
                class Form extends HTMLElement {
                    connectedCallback() {
                        this.innerHTML=  `
                            <section id="add">
                            ${inner}
                            </section>
                        `
                    }
                }
                customElements.define("form-menu", Form)
                changeOpacity()
            }

            function changeOpacity() {
                var add_form = document.getElementById('add')
                let op = 0
                var interval = setInterval(() => {
                    op += 0.1
                    add_form.style.opacity = op
                    if (op == 1) {
                        op = 0
                        add_form.style.opacity = 1
                        clearInterval(interval)
                    }
                }, 10)
            }
            /* QUANTITY */
            var plus = document.getElementById('plus')
            var moins = document.getElementById('moins')
            var quantity = document.getElementById('quantity')
            var add = document.getElementById('submit')
            var add_drink = document.getElementById('add-drink')
            var select_drink = document.getElementById('boisson')
            plus.onclick = () => {
                let once = Number(add.value.match(reg).join('.')) / quantity.value
                quantity.value = Number(quantity.value)+1
                add.value = `add ${once * quantity.value} €`
            }
            moins.onclick = () => {
                if (Number(quantity.value) > 1) {
                    quantity.value = Number(quantity.value)-1
                    add.value = `add ${Number(quantity.value) * price} $`
                }
            }
            add_drink.onclick = () => {
                select_drink.firstElementChild.remove()
                select_drink.style.display = "block"
                add_drink.style.display = "none"
                add.value = `add ${Number(add.value.match(reg).join('.')) + 2.5 * Number(quantity.value)} €`
            }

        }
    })
})

fetch('https://love-burgers.herokuapp.com/basket')
.then(res => res.json())
.then(json => {
    console.log(json)
    var html = []
    var total = 0
    for (const x of json) {
        html.push(`
        <tr>
            <td id="td"><input name="quantity" value="${x.quantity}"></td>
            <td id="td-nom"><input name="nom" value="${x.nom}"></td>
            <td id="td"><input name="prix" value="${x.prix}€"></td>
            <td><input type="submit" id="delete" value="X" form="form-delete"></td>
        </tr>
        `)
        total += x.prix * x.quantity
    }
    class Basket extends HTMLElement {
        connectedCallback() {
            this.innerHTML= `
                <h2>Panier</h2>
                <form id="form-delete" method="post" action="/delete"></form>
                <table id="basket">
                        ${html.join('')}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>${total} $</td>
                        </tr>
                </table>
                <form action="/command" method="post">
                    <input id="command" value="Commander">
                </form>
                </form>
            `
        }
    }
    customElements.define('my-basket', Basket)
})

class Payment extends HTMLElement {
    connectedCallback() {
        this.innerHTML= `
            <form id="form-payment" method="post" action="/pay">

                <label for="infos">Informations personnelles</label> 
                <label for="first_name">First Name :</label>
                <input name="first_name" required> 
                <label for="last_name">Last Name :</label>
                <input name="last_name" required> 
                <label for="email">Email :</label>
                <input name="email" required>
                <label for="phone">Phone :</label>
                <input name="phone" required>
            
            <label for="mode">Mode de livraison</label>
                <label for="emporter">
                <input type="radio" name="radio" value="emporter">
                   A emporter
                </label>
                <label for="domicile">
                <input type="radio" name="radio" value="domicile">
                   Livraison à domicile
                </label>
                <label for="place">
                <input type="radio" name="radio" value="place">
                   Sur place
                </label>

                <label for="">Adresse de livraison :</label>
                <label for="rue">Rue :</label>
                <input name="rue" required>
                <label for="no">Numéro de maison :</label>
                <input name="no" required>
                <label for="postcode">Code postal :</label>
                <input name="postcode" required>
                <label for="rue">Ville :</label>
                <input name="rue" required>

                <label for="message">Message(optionnel) : </label>
                <input name="message">

                <input type="submit" value="Paiement">
            </form>
        `
    }
}
customElements.define('form-payment', Payment)
