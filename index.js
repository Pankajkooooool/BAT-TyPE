const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quotedispElement = document.getElementById('quoteDisplay')
const quoteInpElement = document.getElementById('quoteInput')
const timerEle = document.getElementById('timer')  

quoteInpElement.addEventListener('input', ()=>{
    const arrayQuote =quotedispElement.querySelectorAll('span')
    const arrayValue = quoteInpElement.value.split('')
    let correct = true

    arrayQuote.forEach((characterSpan , index) => {
        const character = arrayValue[index]
        if (character == null ) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct= false
        }
    });
    if (correct) renderNewQuote()
})

function getRandomQuote () {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quotedispElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText= character
        quotedispElement.appendChild(characterSpan)
    });
    quoteInpElement.value = null
    startTimer();

}
let startTime
function startTimer(){
    timerEle.innerText= 0 ;
    startTime = new Date();
    setInterval(() => {
       timerEle.innerText = getUpdatedTime()
    }, 1000);
}
function getUpdatedTime(){
     return Math.floor((new Date()- startTime) /1000)
}

renderNewQuote()

//This is the end of the word game and the begining of the untouched mouse button

const evilbutton = document.querySelector('.evil-button')
const OFFSET = 45 

evilbutton.addEventListener('click', ()=>{
    alert('NICE TRY DOing It Faster next time')
    window.close()
})

document.addEventListener('mousemove',(e)=>{
    const x = e.pageX
    const y = e.pageY
    const buttonbox = evilbutton.getBoundingClientRect()
    const horizontaldistanceFrom = distancefromcentre(buttonbox.x , x, buttonbox.height)
    const verticaldistanceFrom = distancefromcentre(buttonbox.y , y, buttonbox.width)
    const horizontalOffset = buttonbox.width/2 + OFFSET
    const verticalOffset = buttonbox.height/2 + OFFSET
    if (Math.abs(horizontaldistanceFrom)<= horizontalOffset && (verticaldistanceFrom)<= verticalOffset){
        setButtonPosition(
            buttonbox.x + horizontalOffset/horizontaldistanceFrom *10,
            buttonbox.y + verticalOffset/verticaldistanceFrom *10
        )
    }
})

function setButtonPosition(left,top){

    const windowbox = document.body.getBoundingClientRect()
    const buttonbox = evilbutton.getBoundingClientRect()
    if(distancefromcentre(left,windowbox.left,buttonbox.width) < 0){
        left= windowbox.right -buttonbox.width- OFFSET
    }
    if(distancefromcentre(left,windowbox.right,buttonbox.width) > 0){
        left= windowbox.left + OFFSET
    }
    if(distancefromcentre(top,windowbox.top,buttonbox.height) < 0){
        top= windowbox.bottom - buttonbox.height-OFFSET
    }
    if(distancefromcentre(top,windowbox.bottom, buttonbox.height) > 0){
        top= windowbox.top +OFFSET
    }

    evilbutton.style.left =`${left}px`
    evilbutton.style.top =`${top}px`
}

function distancefromcentre(boxpositon, mousepos, boxsize){
    return boxpositon - mousepos + boxsize/2
}