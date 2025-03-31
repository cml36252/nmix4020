let buildList = document.querySelector('#userInput')
for (var i = 0; i <=100; i++) {
    buildList.innerHTML += '<option value="' + i + '">' + i + '</option>'
}

let answer = document.querySelector('#userInput')
answer = answer.value
answer = Number(answer)
let reaction = document.querySelector('#response')





function compare() {
    /*console.log(answer)
    if (answer == 24) {
        reaction.innerHTML = 'That is correct!'
    } else if (answer < 24) {
        reaction.innerHTML = 'That is incorrect! The answer is higher.'
    } else if (answer > 24) {
        reaction.innerHTML = 'That is incorrect! The answer is lower.'
        
    }*/

    switch(true) {
        case (answer === 24):
            reaction.innerHTML = 'That is correct!'
            break;
        case (answer < 24):
            reaction.innerHTML = 'That is incorrect! The answer is higher.'
            break;
        case (answer > 24):
            reaction.innerHTML = 'That is incorrect! The answer is lower.'
            break;
    }
    
}