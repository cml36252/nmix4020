let input1 = document.querySelector("#input1");
let input2 = document.querySelector("#input2");
let additionButton = document.querySelector("#addButton");
let outputField = document.querySelector("#output");

additionButton.onClick = () => add();


function add() {
    let addition1 = Number(input1.value);
    let addition2 = Number(input2.value);
    let sum = addition1 + addition2;
    outputField.value = sum;
}