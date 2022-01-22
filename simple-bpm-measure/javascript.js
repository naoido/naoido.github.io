var count = 0;
var counter = 0;
var counter2 = 0;
var b1 = false;
var rKey = "x";
var lKey = "z";
var sec = 10;
var pressKey = null;

document.addEventListener("keydown",event =>{
    if (b1) {
        pressKey = event.key;
        pressKey = pressKey.toLowerCase();
        if (pressKey === lKey){
            count++;
        } else if (pressKey === rKey){
            count++;
        }
        document.getElementById("counter").innerHTML = "Count : " + count;
    }
});

function start() {

    count = 0;
    counter = 0;
    counter2 = 0;
    sec = document.getElementById("sec").value;
    sec = Number(sec);

    console.log(typeof(sec))

    if(typeof(sec) != "number"){
        sec = 10;
        document.getElementById("sec").value = "10";
    }

    console.log(typeof(sec))

    lKey = document.getElementById("l-key").value;
    rKey = document.getElementById("r-key").value;

    lKey = lKey.toLowerCase();
    rKey = rKey.toLowerCase();

    document.getElementById("counter").innerHTML = 3;
    document.getElementById("gauge2").style.width = "0%";
    document.getElementById("start").disabled = true;

    var timer2 = setInterval(function () {
        if (counter >= 3) {
            counter2++;
            document.getElementById("gauge2").style.width = ((counter2 / 100) / sec)*100+"%";
        }
    },10)

    var timer = setInterval(function(){
        counter++;
        const i = 3;
        if (counter < 3){
            document.getElementById("counter").innerHTML = i - counter;
        } else if (counter === 3){
            document.getElementById("counter").innerHTML = "Start";
            b1 = true;
        } else if (counter >= (sec + 3)){
            b1 = false;
            result();
            clearInterval(timer);
            clearInterval(timer2);
            document.getElementById("start").disabled = false;
        }
    },1000);
}

function result() {

    var bpm = 0;
    var pps = 0;

    pps = count / sec;

    if (document.getElementById("c-1").checked) {
        bpm = count/4*(60/sec);
    } else {
        bpm = count*60/sec;
    }
    document.getElementById("result").innerHTML = "bpm : " + Math.round(bpm * 100) / 100 + "<br>Press/sec : "+Math.round(pps * 100) / 100;

}