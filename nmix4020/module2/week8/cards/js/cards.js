
var cards = ["10C.jpg","10D.jpg","10H.jpg","10S.jpg","2C.jpg","2D.jpg","2H.jpg","2S.jpg","3C.jpg","3D.jpg","3H.jpg","3S.jpg","4C.jpg","4D.jpg","4H.jpg","4S.jpg","5C.jpg","5D.jpg","5H.jpg","5S.jpg","6C.jpg","6D.jpg","6H.jpg","6S.jpg","7C.jpg","7D.jpg","7H.jpg","7S.jpg","8C.jpg","8D.jpg","8H.jpg","8S.jpg","9C.jpg","9D.jpg","9H.jpg","9S.jpg","AC.jpg","AD.jpg","AH.jpg","AS.jpg","JC.jpg","JD.jpg","JH.jpg","JS.jpg","KC.jpg","KD.jpg","KH.jpg","KS.jpg","QC.jpg","QD.jpg","QH.jpg","QS.jpg"]

var deck = document.querySelector("#deck");

function shuffle() { 
    deck.innerHTML = ''
    for (var i = 0; i < 5; i++) {
        let outcome = Math.floor(Math.random() * cards.length)
        deck.innerHTML += '<img src=cards/'+cards[outcome]+'>'
        cards.splice(outcome , 1);
    }

    $(function() {
        $('img').draggable()
    })

    $(' img'). dblclick(function() {
        $(this).css("display", "none");
    })
    
}



