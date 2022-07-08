let url = 'http://localhost:3001'
axios.get(url + '/users')
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            reload(res.data)
        }
    })
axios.get(url + '/newItems')
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            sliderSetUp(res.data)
        }
    })
// _____________________________Work with web started_________________________
const goUpBtn = document.querySelector('.level__links-goUp__logo')
let dotBox = document.querySelector('.screen__four__heading-selector')
goUpBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
let selectorContainer = document.querySelector('.screen__four__heading-selector')
let itemContainer = document.querySelector('.screen__four-content-container')
function sliderSetUp(arr) {
    // ________________________This is slider__________________________
    selectorContainer.innerHTML = ''
    itemContainer.innerHTML = ''
    let dotsContent = []
    for (let dots = 0; dots <= arr.length - 1; dots++) {
        let dot = document.createElement('div')
        dot.classList.add('selector-checkbox')
        dotBox.append(dot)
        dotsContent.push(dot)
    }
    for (let item of arr) {
        let box = document.createElement('div')
        let boxScreen = document.createElement('div')
        let boxScreenImg = document.createElement('img')
        let boxContent = document.createElement('div')
        let boxItem = document.createElement('a')
        let itemPrice = document.createElement('span')
        box.classList.add('screen__four__content-item')
        boxScreen.classList.add('content__item-screen')
        boxScreenImg.src = item.img
        itemPrice.innerHTML = "$" + item.price
        boxContent.classList.add('content__item-description')
        boxItem.innerHTML = item.title
        boxItem.href = '#'
        box.append(boxScreen, boxContent)
        boxScreen.append(boxScreenImg)
        boxContent.append(boxItem, itemPrice)
        itemContainer.append(box)
    }
    // ______________________Events_____________________________________
    let boxes = document.querySelectorAll('.screen__four__content-item')
    let arrRight = document.querySelector('.arrowRight')
    let arrLeft = document.querySelector('.arrowLeft')
    let ind = 0
    // ________________________________Funtions for changing slider_____________________________
    changeSlider(boxes, ind)
    arrRight.onclick = () => {
        if (ind < boxes.length - 1) {
            ind++
        } else {
            ind = 0
        }
        changeSlider(boxes, ind)
    }
    arrLeft.onclick = () => {
        if (ind <= 0) {
            ind = boxes.length - 1
        } else {
            ind--
        }
        changeSlider(boxes, ind)
    }
    function changeSlider(slides, ind) {
        slides.forEach(slide => {
            slide.style.display = 'none'
            slide.style.opacity = '0'
        });
        dotsContent.forEach(dot => {
            dot.classList.remove('selector-checkbox-selected')
        })
        dotsContent[ind].classList.add('selector-checkbox-selected')
        slides[ind].style.display = 'flex'
        slides[ind].style.opacity = '1'
    }
}
// _________________________________Funtion for showing members of site_________________________
let memberContainer = document.querySelector('.screen__seven-content')
function reload (users) {
    memberContainer.innerHTML = ''
    for (let user of users) {
        let card = document.createElement('div')
        let cardHead = document.createElement('div')
        let userImg = document.createElement('img')
        let cardDes = document.createElement('div')
        let userName = document.createElement('h4')
        let userInfo = document.createElement('span')
        card.classList.add('member__card')
        cardHead.classList.add('member__card-person')
        userImg.src = user.img
        cardDes.classList.add('member__card-person__info')
        userName.innerHTML = user.name
        userInfo.innerHTML = user.description
        card.append(cardHead, cardDes)
        cardHead.append(userImg)
        cardDes.append(userName, userInfo)
        memberContainer.append(card)
    }
}
