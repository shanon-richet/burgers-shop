var sess = localStorage.getItem('id')
const saus = ["ketchup", "mayonnaise", "andalouse", "garlic saus", "brasil", "pepper saus", "samourai", "tartare"]
fetch('data.json')
.then(res => res.json())
.then(json => {
    var data = []
    Object.entries(json).forEach(y => {
        for (const x of y[1]) {
            data.push(`
                <article id="item">
                    <h3><b>${x.name}</b></h3>
                    <img src="${x.img}">
                    <p>Price : ${x.price} $</p>
                    <aside>Ingredients : ${x.ingredients}</aside>
                </article>
            `)
        }
    })
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
            console.log(e.target.parentElement.childNodes[1].textContent)
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
