// number1

var number1 = (Math.floor (Math.random() * 6 ) + 1);
if (number1 ===1) {
    document.getElementById("img1").setAttribute("src","images/dice1.png")
}
else if (number1 ===2) {
    document.getElementById("img1").setAttribute("src","images/dice2.png")
}
else if (number1 ===3) {
    document.getElementById("img1").setAttribute("src","images/dice3.png")
}
else if (number1 ===4) {
    document.getElementById("img1").setAttribute("src", "images/dice4.png")
}
else if (number1 ===5) {
    document.getElementById("img1").setAttribute("src","images/dice5.png")
}
else {
    document.getElementById("img1").setAttribute("src","images/dice6.png")
}

// number2

var number2 = (Math.floor (Math.random() * 6 ) + 1);
if (number2 ===1) {
    document.getElementById("img2").setAttribute("src","images/dice1.png")
}
else if (number2 ===2) {
    document.getElementById("img2").setAttribute("src","images/dice2.png")
}
else if (number2 ===3) {
    document.getElementById("img2").setAttribute("src","images/dice3.png")
}
else if (number2 ===4) {
    document.getElementById("img2").setAttribute("src", "images/dice4.png")
}
else if (number2 ===5) {
    document.getElementById("img2").setAttribute("src","images/dice5.png")
}
else {
    document.getElementById("img2").setAttribute("src","images/dice6.png")
}

// text big//

if(number1 > number2) {
    document.getElementById("text").textContent = "🚩Player 1 wins!"
}
else if(number1 < number2) {
    document.getElementById("text").textContent = "Player 2 wins!🚩"
}
else {
    document.getElementById("text").textContent = "Draw!"
}