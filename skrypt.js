//autor: Patrycja Paradowska
//nr indexu: 244952

var canvas = document.getElementById("turtleGraphic");
var context = canvas.getContext("2d");
var instrukcje = document.getElementById("instructionsList")
let kat = 0;
let poczatkowaPozycjaX = 200;
let poczatkowaPozycjaY = 250;
let obecnaPozycjaX = 0;
let obecnaPozycjaY = 0;
const minX = 0;
const maxX = 800;
const maxY = 500;
const minY = 0;

//Funkcja inicjalizująca naszego żółwia
function inicjalizacjaZolwia() {
    context.clearRect(minX, minY, maxX, maxY)
    kat = 0;
    context.moveTo(poczatkowaPozycjaX, poczatkowaPozycjaY);
    obecnaPozycjaY = poczatkowaPozycjaY
    obecnaPozycjaX = poczatkowaPozycjaX
}
//Funkcja sprawdzająca poprawność pozycji żółwia
function sprY(d){
    if(obecnaPozycjaY + d > maxY || obecnaPozycjaY + d< minY){
        console.error("Pozycja poza ramką!");
        return false
    }else {return true}
}

//Funkcja sprawdzająca poprawność pozycji żółwia
function sprX(d){
    if(obecnaPozycjaX + d > maxX || obecnaPozycjaX + d < minX){
        console.error("Pozycja poza ramką!");
        return false
    }else{return true}
}

//Funkcja odpowiadająca za poruszanie się żółwia
function ruch(r){
    var radians = kat *  Math.PI / 180.0;
    var dy = r * Math.cos(radians)
    var dx = r * Math.sin(radians)
    if(sprY(dy) && sprX(dx) ){
        context.moveTo(obecnaPozycjaX,obecnaPozycjaY);
        obecnaPozycjaY = obecnaPozycjaY + dy
        obecnaPozycjaX = obecnaPozycjaX + dx
        context.lineTo(obecnaPozycjaX, obecnaPozycjaY);
    }
}

function startRysunku(){
    context.beginPath()
}

//Funkcja odpowiadająca za wybieranie koloru
function ustawKolor(k) {
    switch (k) {
        case "RED":
            context.strokeStyle = "#d32f2f";
            break;
        case "GREEN":
            context.strokeStyle = "#4CAF50";
            break;
        case "BLUE":
            context.strokeStyle = "#2196F3";
            break;
        case "YELLOW":
            context.strokeStyle = "#FFEB3B";
            break;
        case "ORANGE":
            context.strokeStyle = "#FF9800";
            break;
    }
}

//Funkcja odpowiadająca za rys. okręgu
function drawCircle(radius){
    context.arc(obecnaPozycjaX,obecnaPozycjaY,radius,0,2*Math.PI);
}

//Funkcja odpowiadająca za rotację w lewo o dany kąt
function rotacjaLEWO(l){
    kat = (kat - l) % 360;
}

//Funkcja odpowiadająca za rotację w prawo o dany kąt
function rotacjaPRAWO(p){
    kat = (kat + p) % 360;
}

function koniecRysunku(){
    context.stroke();
}

//Funkcja odpowiadająca za czyszczenie planszy
function wyczysc(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    inicjalizacjaZolwia()
}

//Funkcja odpowiadająca za wykonywanie podanych przez użytkownika poleceń dla żółwia
function wykonajPolecenie(polecenie){
    polecenie = polecenie.split(" ");
    switch (polecenie[0]) {
        case "FORWARD":
            ruch(parseInt(polecenie[1]));
            break;
        case "COLOR":
            ustawKolor(polecenie[1]);
            break;
        case "BACK":
            ruch(-parseInt(polecenie[1]));
            break;
        case "RIGHT":
            rotacjaPRAWO(parseInt(polecenie[1]));
            break;
        case "LEFT":
            rotacjaLEWO(parseInt(polecenie[1]));
            break;
        case "START":
            startRysunku();
            break;
        case "END":
            koniecRysunku();
            break;
        default:
            break;
    }
}
//Funkcja odpowiadająca za uruchomienie programu
function uruchom() {
    let t = instrukcje.value.split("\n");
    t.forEach(wykonajPolecenie);
    instrukcje.value = "";
}
//Funkcja odpowiadająca za uruchomienie przykładowego programu
function uruchomProgram(command){
    command.forEach(wykonajPolecenie)
}

inicjalizacjaZolwia();