var navHeader = document.getElementById('nav-header')
var cart = document.getElementById('cart-content')
var left = document.getElementById('left')
var right = document.getElementById('right')

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
        scrollTo(0, y - navHeader.offsetHeight - 20)
    }
}
var li = navHeader.childNodes

scrollBtn(li[1], 0)
scrollBtn(li[3], document.getElementById('nav-menu').offsetTop)

li[5].onclick = () => {
    scrollTo(0, document.getElementById('contacts').offsetTop - navHeader.offsetHeight - 20)
}
/* SLIDES */

var fig_img = document.querySelector('figure img')
var left = document.querySelector('figure #left')
var right = document.querySelector('figure #right')
const srcs = ['grill.jpg', 'in-n-out.jpg', 'resto.jpg', 'service.jpg']
var index = 0

function slideRight() {
    if (index === srcs.length - 1) {
        index = 0
    } else {
        index++
    }
    fig_img.src = `img/about/${srcs[index]}`
}
setInterval( () => { slideRight() }, 5000)
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

var close_payment = document.querySelector('#section-payment div')
close_payment.onclick = () => {
    close_payment.parentElement.style.display = "none"
    document.body.style.overflowY = "auto"
}

