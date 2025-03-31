let candidateNames1 = ["Jeb Bush","Ben Carson","Lincoln Chafee","Chris Christie","Ted Cruz","Carly Fiorina","Jim Gilmore"]
let candidatePix1 = ["bush.jpg","carson.jpg","chafee.jpg","christie.jpg","cruz.jpg","fiorina.jpg","gilmore.jpg"]
let candidateNames2 = ["Lindsey Graham","Bobby Jindal","John Kasich","Lawrence Lessig","Martin O'Malley","George Pataki","Rand Paul"]
let candidatePix2 = ["graham.jpg","jindal.jpg","kasich.jpg","lessig.jpg","omalley.jpg","pataki.jpg","paul.jpg"]
let candidateNames3 = ["Rick Perry","Marco Rubio","Bernie Sanders","Rick Santorum","Donald Trump","Scott Walker","Jim Webb"]
let candidatePix3 = ["perry.jpg","rubio.jpg","sanders.jpg","santorum.jpg","trump.jpg","walker.jpg","webb.jpg"]

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
    output1.innerHTML = "<div class='cand'></div>" + candidateNames1[i] + "<br><img src=pix/" + candidatePix1[i] + "><\cand>"
    i += plusMinus

    if (i == candidateNames1.length) {
        i = 0
    }
    if (i < 0) {
        i = candidateNames1.length - 1
    }
}

function canShow2(plusMinus) {
    output2.innerHTML = "<div class='cand'></div>" + candidateNames2[j] + "<br><img src=pix/" + candidatePix2[j] + "><\cand>"
    j += plusMinus

    if (j == candidateNames2.length) {
        j = 0
    }
    if (j < 0) {
        j = candidateNames2.length - 1
    }
}

function canShow3(plusMinus) {
    output3.innerHTML = "<div class='cand'></div>" + candidateNames3[k] + "<br><img src=pix/" + candidatePix3[k] + "><\cand>"
    k += plusMinus

    if (k == candidateNames3.length) {
        k = 0
    }
    if (k < 0) {
        k = candidateNames3.length - 1
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