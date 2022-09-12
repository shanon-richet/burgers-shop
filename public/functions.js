var navHeader = document.getElementById('nav-header')
var text = document.getElementById('text')
var cart = document.getElementById('cart-content')

// SCROLL
window.addEventListener('scroll', (event) => {
    let textTop = text.getBoundingClientRect().top
    let navHeight = navHeader.getBoundingClientRect().height
    let cartHeight = cart.getBoundingClientRect().height

    if (textTop <= 0 + navHeight) {
        navHeader.style.position = "fixed"
        navHeader.style.top = 0
    } 
    if (textTop >= 0 + navHeight) {
        navHeader.style.position = "static"
        navHeader.style.top = textTop + navHeight
    }
})
var shopping = document.getElementById('shopping-cart')
var close = document.getElementById('close')

let pos = 0
close.onclick = () => {
    var interval = setInterval(() => {
        if (pos === -800) {
            cart.style.right = "-800px"
            clearInterval(interval)
        }
            pos -= 50
            cart.style.right = `${pos}px`
    }, 1)

}
shopping.onclick = () => {
    var interval = setInterval(() => {
        if (pos === -50) {
            cart.style.right = '-50px'
            clearInterval(interval)
        }
            pos += 50
            cart.style.right = `${pos}px`
    }, 1)
}
