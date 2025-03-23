let familyGuy = {

    "peter": "Peter Griffin",
    "lois" : "Lois Griffin",
    "chris" : "Chris Griffin",
    "meg" : "Meg Griffin",
    "stewie" : "Stewie Griffin",
    "brian" : "Brian Griffin"
}

//let familyGuyArray = ["peter","lois","chris","meg","stewie","brian"]

function fg(name) {

    if (familyGuy.hasOwnProperty(name)){
        document.querySelector('#name').innerHTML = familyGuy[name];
    }

}