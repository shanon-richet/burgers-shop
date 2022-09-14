var choice = document.getElementById('choice')
var nav = document.getElementById('food-nav')
var close = document.getElementById('close-choice')

close.onclick = () => {
    choice.style.display = "none"
}

fetch('http://localhost:5000/api/products')
.then(res => res.json())
.then(json => {
    var burgers = []
    var sides = []
    var desserts = []
    for (const x of json) {
        var html = `
        <article id="item">
            <h3><b>${x.nom}</b></h3>
            <img src="${x.img}">
            <p>Prix : ${x.prix} $</p>
            <aside>Ingrédients : ${x.ingredients}</aside>
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
                        ${burgers}
                    </section>
                    <h2>SIDES</h2>
                    <section class="items" id="sides">
                        ${sides}
                    </section>
                    <h2>DESSERTS</h2>
                    <section class="items" id="desserts">
                        ${desserts}
                    </section>
                </section>
            `
        }
    }
    customElements.define('menu-content', Menu)
    const items = document.querySelectorAll('#item')

    items.forEach(function(x) {
        x.onclick = (e) => {
            var add_form = document.getElementById('add')
            let t = e.target.parentElement.childNodes
            let price = t[5].textContent.match(/[0-9]+/g)
            choice.style.display = "block"
            choice.style.top = `${window.pageYOffset + 200}px`

            /* HTML */
            let inner = []
            inner.push(`                        
                <img src="${t[3].src}">
                <form id="add-form" method="post" action="/add">
                    <input id="add-nom" type="text" name="nom" value="${t[1].textContent}">
                    <div><label for="quantity">Quantité :</label>
                    <input id="moins" type="button" value="-"><input id="quantity" name="quantity" type="number" value="1"><input id="plus" type="button" value="+">
            `)
            if (e.target.parentElement.parentElement.getAttribute('id') !== "desserts") {
                inner.push(`                                
                <div><label for="sauce">Sauce : </label>
                <select id="sauces" name="sauce">
                    <option value="ketchup">Ketchup</option>
                    <option value="mayonnaise">Mayonnaise</option>
                    <option value="brasil">Brasil</option>
                    <option value="samourai">Samourai</option>
                    <option value="barbecue">Barbecue</option>
                </select></div>
                `)
            }
            inner.push(`
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
            }

            /* QUANTITY */
            var plus = document.getElementById('plus')
            var moins = document.getElementById('moins')
            var quantity = document.getElementById('quantity')
            var add = document.getElementById('submit')
            plus.onclick = () => {
                quantity.value = Number(quantity.value)+1
                add.value = `add ${Number(quantity.value) * price} $`
            }
            moins.onclick = () => {
                if (Number(quantity.value) > 1) {
                    quantity.value = Number(quantity.value)-1
                    add.value = `add ${Number(quantity.value) * price} $`

                }
            }
        }
    })
})

fetch('http://localhost:5000/basket')
.then(res => res.json())
.then(json => {
    var html = []
    var total = 0
    for (const x of json) {
        html.push(`
        <tr>
            <td id="td">${x.quantity}</td>
            <td id="td-nom">${x.nom}</td>
            <td id="td">${x.prix} $</td>
        </tr>
        `)
        total += x.prix * x.quantity
    }
    class basket extends HTMLElement {
        connectedCallback() {
            this.innerHTML= `
                <h2>Panier</h2>
                <table id="basket">
                    ${html}
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>${total} $</td>
                    </tr>
                </table>
                <button id="pay">Commander</button>
            `
        }
    }
    customElements.define('my-basket', basket)
})

class Payment extends HTMLElement {
    connectedCallback() {
        this.innerHTML= `
            <form id="form-payment" method="post" action="/pay">
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

                <label for="first_name">First Name :</label>
                <input name="first_name" required> 
                <label for="last_name">Last Name :</label>
                <input name="last_name" required> 

                <label for="email">Email :</label>
                <input name="email" required>
                <label for="phone">Phone :</label>
                <input name="phone" required>

                <label for="rue">Rue :</label>
                <input name="rue" required>
                <label for="no">Numéro :</label>
                <input name="no" required>
                <label for="postcode">Code postal :</label>
                <input name="postcode" required>
                <label for="rue">Rue :</label>
                <input name="rue" required>

                <label for="message">Message(optionnel) : </label>
                <input name="message">
                
                <label for="payment">Payment method :</label>
                <select>
                   <option value="bancontact">Bancontact</option>
                   <option value="cash">Cash</option>
                   <option value="paypal">Paypal</option>
                   <option value="creditcard">Carte de crédit</option>
                </select>
            </form>
        `
    }
}
customElements.define('form-payment', Payment)