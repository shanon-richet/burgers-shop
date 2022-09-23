var navHeader = document.getElementById('nav-header')
var text = document.getElementById('text')
var cart = document.getElementById('cart-content')
var header = document.querySelector('header')
var about = document.getElementById('about')
var left = document.querySelector('#text #left')
var right = document.querySelector('#text #right')

var shopping = document.querySelector('svg')
var close = document.getElementById('close')

let pos = -800
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
        if (pos === -800) {
            cart.style.right = "-800px"
            clearInterval(interval)
        }
        else {
            pos -= 50
            cart.style.right = `${pos}px`
        }
    }, 1)

}

var li = navHeader.childNodes
li[1].onclick = () => {
    scrollTo(0, 0)
}
li[3].onclick = () => {
    scrollTo(0, about.offsetTop - navHeader.offsetHeight)
}
var menu = document.getElementById('menu')
li[5].onclick = () => {
    scrollTo(0, menu.offsetTop - navHeader.offsetHeight)
}
var contact = document.getElementById('contacts')
li[7].onclick = () => {
    scrollTo(0, contact.offsetTop - navHeader.offsetHeight)
}
var fig_imgs = document.querySelectorAll('figure img')
var left = document.querySelector('figure #left')
var right = document.querySelector('figure #right')

var index = 0
for (let i = 0; i < fig_imgs.length; i++) {
    fig_imgs[i].style.display = "none"
    if (index == i) {
        fig_imgs[i].style.display = "block"
    }
}

right.onclick = () => {
    fig_imgs[index].style.visibility = "hidden"
    if (index === fig_imgs.length - 1) {
        index = 0
    } else {
        index++
    }
    fig_imgs[index].style.display = "flex"
    fig_imgs[index].style.visibility = "visible"
}
left.onclick = () => {
    fig_imgs[index].style.display = "none"
    fig_imgs[index].style.visibility = "hidden"
    if (index === 0) {
        index = fig_imgs.length - 1
    } else {
        index--
    }
    fig_imgs[index].style.display = "flex"
    fig_imgs[index].style.visibility = "visible"
}
