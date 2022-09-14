var navHeader = document.getElementById('nav-header')
var text = document.getElementById('text')
var cart = document.getElementById('cart-content')
var header = document.querySelector('header')
var about = document.getElementById('about')
var left = document.getElementById('left')
var right = document.getElementById('right')

var shopping = document.getElementById('shopping-cart')
var close = document.getElementById('close')

let pos = -800
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

var li = navHeader.childNodes
li[1].onclick = () => {
    scrollTo(0, 0)
}
li[3].onclick = () => {
    scrollTo(0, about.offsetTop - navHeader.offsetHeight)
}
li[5].onclick = () => {
    scrollTo(0, navFood.offsetTop - navHeader.offsetHeight)
}
var slides = document.getElementsByClassName('slides')
var index = 0

right.style.top = 
right.onclick = () => {
    // var interval = setInterval(() => {

    // })
    slides[index].style.display = "none"
    slides[index].style.visibility = "hidden"
    if (index === slides.length - 1) {
        index = 0
    } else {
        index++
    }
    slides[index].style.display = "flex"
    slides[index].style.visibility = "visible"
}
left.onclick = () => {
    slides[index].style.display = "none"
    slides[index].style.visibility = "hidden"
    if (index === 0) {
        index = slides.length - 1
    } else {
        index--
    }
    slides[index].style.display = "flex"
    slides[index].style.visibility = "visible"
}

// SCROLL
// window.addEventListener('scroll', (event) => {
//     let textTop = text.offsetTop
//     let navHeight = navHeader.offsetHeight
//     if (textTop <= 0 + navHeight) {
//         navHeader.style.position = "fixed"
//         navHeader.style.top = 0
//     } 
//     if (textTop >= 0 + navHeight) {
//         navHeader.style.position = "static"
//         navHeader.style.top = textTop + navHeight
//     }
// })