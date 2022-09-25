var navHeader = document.getElementById('nav-header')
var text = document.getElementById('text')
var cart = document.getElementById('cart-content')
var header = document.querySelector('header')
var about = document.getElementById('about')
var left = document.querySelector('#text #left')
var right = document.querySelector('#text #right')

var shopping = document.querySelector('svg')
var close = document.getElementById('close')

let pos = -1200
shopping.onclick = () => {
    var interval = setInterval(() => {
        if (pos === -50) {
            cart.style.right = '-50px'
            clearInterval(interval)
        }
        else {
            pos += 50
            cart.style.right = `${pos}px`
        }
    }, 1)
}
close.onclick = () => {
    var interval = setInterval(() => {
        if (pos === -1200) {
            cart.style.right = "-1200px"
            clearInterval(interval)
        }
        else {
            pos -= 50
            cart.style.right = `${pos}px`
        }
    }, 1)

}

/* SCROLL */
export default function scrollBtn(x, y) {
    x.onclick = () => {
        scrollTo(0, y)
    }
}

var li = navHeader.childNodes
var menu = document.getElementById('menu')
var contact = document.getElementById('contacts')

scrollBtn(li[1], 0)
scrollBtn(li[3], about.offsetTop - navHeader.offsetHeight)
scrollBtn(li[5], menu.offsetTop - navHeader.offsetHeight)
scrollBtn(li[7], contact.offsetTop - navHeader.offsetHeight)


/* SLIDES */

var fig_img = document.querySelector('figure img')
var left = document.querySelector('figure #left')
var right = document.querySelector('figure #right')
const srcs = ['grill.jpg', 'food.jpg', 'in-n-out.jpg', 'resto.jpg', 'service.jpg']
var index = 0

function slideRight() {
    if (index === srcs.length - 1) {
        index = 0
    } else {
        index++
    }
    fig_img.src = `img/about/${srcs[index]}`
}

var interval = setInterval(() => {
    slideRight()
}, 5000)

right.onclick = () => {
    slideRight()
}
left.onclick = () => {
    if (index === srcs.length - 1) {
        index = 0
    } else {
        index--
    }
    fig_img.src = `img/about/${srcs[index]}`

}