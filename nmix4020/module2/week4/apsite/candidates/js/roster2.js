let rosterPix = ["brock.webp", "channing.webp", "darnell.webp", "george.webp", "jalen.webp", "james.webp", "jordan.webp", "kelee.webp", "kendall.webp", "kenny.webp", "ladd.webp", "lewis.webp", "nakobe.webp", "nolan.webp", "sedrick.webp", "stetson.webp", "tate.webp", "travon.webp", "warren.webp"]
let rosterNames = ["Brock Bowers", "Channing Tindall", "Darnell Washington", "George Pickens", "Jalen Carter", "James Cook", "Jordan Davis", "Kelee Ringo", "Kendall Milton", "Kenny McIntosh", "Ladd McConkey", "Lewis Cine", "Nakobe Dean", "Nolan Smith", "Sedrick Van Pran", "Stetson Bennett", "Tate Ratledge", "Travon Walker", "Warren Brinson"]

let i = 0
    

let output = document.querySelector('#alsoRan')
let next = document.querySelector('#next')
let previous = document.querySelector('#previous')

function canShow(plusMinus) {
    output.innerHTML = "<div class='dawg'></div>" + rosterNames[i] + "<br><img src=roster/" + rosterPix[i] + "><\dawg>"
    i += plusMinus

    if (i == rosterNames.length) {
        i = 0
    }
    if (i < 0) {
        i = rosterNames.length - 1
    }
}

next.onclick = function() {
    canShow(1)
}
previous.onclick = function() {
    canShow(-1)
}
