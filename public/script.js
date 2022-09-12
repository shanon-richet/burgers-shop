var sess = localStorage.getItem('id')
var choice = document.getElementById('choice')
var nav = document.getElementById('food-nav')
var close = document.getElementById('close-choice')
close.onclick = () => {
    choice.style.display = "none"
}
fetch('http://localhost:5000/api/products')
.then(res => res.json())
.then(json => {
    var data = []
    for (const x of json) {
            data.push(`
                <article id="item">
                    <h3><b>${x.nom}</b></h3>
                    <img src="${x.img}">
                    <p>Price : ${x.prix} $</p>
                    <aside>Ingredients : ${x.ingredients}</aside>
                </article>
            `)
    }
    class Menu extends HTMLElement {
        connectedCallback() {
            this.innerHTML= `
                <section id="menu-items">
                    ${data}
                </section>
            `
        }
    }
    customElements.define('menu-content', Menu)

    const items = document.querySelectorAll('#item')
    items.forEach(function(x) {
        x.addEventListener('click', add)
        function add(e) {
            let t = e.target.parentElement.childNodes
            console.log()
            let price = t[5].textContent.match(/[0-9]+/g)
            choice.style.display = "block"
            choice.style.top = `${window.pageYOffset + 200}px`
            class Form extends HTMLElement {
                connectedCallback() {
                    this.innerHTML=  `
                        <section id="add">
                            <img src="${t[3].src}">
                            <form id="add-food">
                                <input id="add-nom" type="text" name="nom" value="${t[1].textContent}">
                                <div><label for="quantity">Quantité :</label>
                                <input id="moins" type="button" value="-"><input id="quantity" type="number" value="1"><input id="plus" type="button" value="+"></form>
                                <div><label for="sauce">Sauce : </label>
                                <select id="sauces" name="sauces">
                                    <option value="ketchup">Ketchup</option>
                                    <option value="mayonnaise">Mayonnaise</option>
                                    <option value="brasil">Brasil</option>
                                    <option value="samourai">Samourai</option>
                                    <option value="barbecue">Barbecue</option>
                                </select></div>
                                <input id="submit" type="submit" value="add ${price} $">
                            </form>
                        </section>
                    `
                }
            }
            customElements.define("form-menu", Form)

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

fetch('cart.json')
.then(res => res.json())
.then(json => {

    class shoppingCart extends HTMLElement {
        connectedCallback() {
            this.innerHTML= `
                <section id="shopping_cart">
    
                </section>
            `
        }
    }
    customElements.define('shopping-cart', shoppingCart)
})
