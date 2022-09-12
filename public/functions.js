var navHeader = document.getElementById('nav-header')
var text = document.getElementById('text')
var cart = document.getElementById('cart-content')
var header = document.querySelector('header')
var about = document.getElementById('about')
var navFood = document.getElementById('food-nav')
var li = navHeader.childNodes

let cartHeight = cart.offsetHeight

// SCROLL
window.addEventListener('scroll', (event) => {
    let textTop = text.getBoundingClientRect().top
    let navHeight = navHeader.getBoundingClientRect().height

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

let pos = -800
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
li[1].onclick = () => {
    scrollTo(0, 0)
}
li[3].onclick = () => {
    scrollTo(0, about.offsetTop - navHeader.offsetHeight)
}
li[5].onclick = () => {
    scrollTo(0, navFood.offsetTop - navHeader.offsetHeight)
}
