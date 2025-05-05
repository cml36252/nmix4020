let rosterPix1 = ["brock.webp", "channing.webp", "darnell.webp", "george.webp", "jalen.webp", "james.webp"] 
let rosterPix2 = ["jordan.webp", "kelee.webp", "kendall.webp", "kenny.webp", "ladd.webp", "lewis.webp"]
let rosterPix3 = ["nakobe.webp", "nolan.webp", "sedrick.webp", "stetson.webp", "tate.webp", "travon.webp"]
let rosterNames1 = ["Brock Bowers", "Channing Tindall", "Darnell Washington", "George Pickens", "Jalen Carter", "James Cook"]
let rosterNames2 = [ "Jordan Davis", "Kelee Ringo", "Kendall Milton", "Kenny McIntosh", "Ladd McConkey", "Lewis Cine"]
let rosterNames3 = ["Nakobe Dean", "Nolan Smith", "Sedrick Van Pran", "Stetson Bennett", "Tate Ratledge", "Travon Walker"]



let output1 = document.querySelector('#slide1')
let output2 = document.querySelector('#slide2')
let output3 = document.querySelector('#slide3')
let next1 = document.querySelector('#add1')
let next2 = document.querySelector('#add2')
let next3 = document.querySelector('#add3')
let previous1 = document.querySelector('#minus1')
let previous2 = document.querySelector('#minus2')
let previous3 = document.querySelector('#minus3')

let i = 0
let j = 0
let k = 0

function canShow1(plusMinus) {
    output1.innerHTML = "<div class='cand'></div>" + rosterNames1[i] + "<br><img src=roster/" + rosterPix1[i] + "><\cand>"
    i += plusMinus

    if (i == rosterNames1.length) {
        i = 0
    }
    if (i < 0) {
        i = rosterNames1.length - 1
    }
}

function canShow2(plusMinus) {
    output2.innerHTML = "<div class='cand'></div>" + rosterNames2[j] + "<br><img src=roster/" + rosterPix2[j] + "><\cand>"
    j += plusMinus

    if (j == rosterNames2.length) {
        j = 0
    }
    if (j < 0) {
        j = rosterNames2.length - 1
    }
}

function canShow3(plusMinus) {
    output3.innerHTML = "<div class='cand'></div>" + rosterNames3[k] + "<br><img src=roster/" + rosterPix3[k] + "><\cand>"
    k += plusMinus

    if (k == rosterNames3.length) {
        k = 0
    }
    if (k < 0) {
        k = rosterNames3.length - 1
    }
}

next1.onclick = function() {
    canShow1(1)
}
previous1.onclick = function() {
    canShow1(-1)
}

next2.onclick = function() {
    canShow2(1)
}
previous2.onclick = function() {
    canShow2(-1)
}

next3.onclick = function() {
    canShow3(1)
}
previous3.onclick = function() {
    canShow3(-1)
}

canShow1(0)
canShow2(0)
canShow3(0)