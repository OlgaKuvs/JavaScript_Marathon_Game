const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')

const timeList = document.querySelector('#time-list')

const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')

const colors = ['#f4587c', '#4395f1', '#67f48f', '#e6e272', '#d270f6', '#f89f87', '#e0dfdf']

let time = 0
            // счет игры 
let score = 0

startBtn.addEventListener('click', (event) => {
                                            // убираем знак # в адресной строке браузера
    event.preventDefault()
                                        // пролистываем первый экран, перейдя на второй
    screens[0].classList.add('up')

})

timeList.addEventListener('click',  event => {
                                    // если нажата кнопка time-btn, то в переменную time добавляем значение кнопки, переведенное из стринга в число
        if (event.target.classList.contains('time-btn')) {
                                    // console.log(event.target)
                                    // console.log(event.target.getAttribute('data-time'))
            time = parseInt(event.target.getAttribute('data-time'))
            startGame()
                                        // пролистываем страницу
            screens[1].classList.add('up')
        }
           
})
                            // реакция на клик по кружочку
board.addEventListener('click', event => {

    if (event.target.classList.contains('circle')) {
        score++
                                    // удаление существующего кружка
        event.target.remove()
                                    // появление нового кружка
        createRandomCircle()

                                    //console.log(event.target)
    }

})



function startGame () {   
                                            // устанавливаем интервал в 1 секунду
    setInterval(decreaseTime, 1000) 
    createRandomCircle()
                                        // вызываем функцию setTime, печатая начальное время на странице HTML
    setTime(time)    
                                        // timeEl.innerHTML=`00:${time}`
}

function decreaseTime () {
                                        // если время игры вышло
        if (time ===0) {

        finishGame()

    } else {

                                        // уменьшаем время на 1 секунду
    let current = --time
                                        // печатаем на экране в формате 00:00
    if (current <10) {
        current = `0${current}`
    }
                            // вызываем функцию setTime, печатая уменьшающийся таймер
        setTime(current)
    }

    // timeEl.innerHTML=`00:${current}`
}
                            // функция выводит на экран таймер
function setTime(value) {
    timeEl.innerHTML=`00:${value}`
}


function finishGame() {
                         // убираем c экрана "родительский" тег для time и само время (2 способа, один из них, более плавный hide, в комментах)
    timeEl.parentNode.remove()   
        // timeEl.parentNode.classList.add('hide')   

                        // убираем все с экрана и печатаем инфо о завершении игры
    board.innerHTML = (`<h2>Ваш счет: <span class=primary>${score}</span></h2>`)

}


                                        // функция генерирует случайным образом кружки
function createRandomCircle() {
                                        // функция генерирует случайным образом кружки и добавляем им класс circle
    const circle = document.createElement('div')
                                        // в константу size получаем случайный номер из функции
    const size = getRandomNumber(10, 60)
                                        // в константу получаем объект с координатами в пределах ширины и высоты
    const {width, height} = board.getBoundingClientRect()
                                        // чтобы кружок поместился в заданное поле, нужно вычесть его размер из размера поля
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height- size)

    const circleColor = setColor(circle)

    circle.classList.add('circle')
                                // получаем случайный размер кружка
    circle.style.width = `${size}px`

    circle.style.height = `${size}px`

    circle.style.top = `${y}px`

    circle.style.left = `${x}px`

    circle.style.color = circleColor  


                                // рисуем кружок заданных размеров

    board.append(circle)
}

                                // функция генерирует кружки случайного размера в пределах указанных размеров

function getRandomNumber(min, max) {
                            // округляем через round размер кружка
    return Math.round(Math.random() * (max-min) + min)


}
                             // задаем цвет кружка
function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor=color
       
}

function getRandomColor() {
    const index = Math.floor (Math.random() * colors.length)
    return colors[index]
}

                        // получаем максимальный счет (хакнув) - в консоли вызвать функцию winTheGame

function winTheGame() {    

    function kill() {
        const circle = document.querySelector('.circle')

        if(circle) {
        circle.click()
        }
    }

    setInterval(kill, 30)
}
