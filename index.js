$(document).ready(function () {
    $(".toggle-nav").click(function (){
        $(".desktop-nav").slideToggle();

    });

});
$(document).ready(function(){
    $('#region').change(function(){
        var selectedValue = $(this).val();

        // Scroll to the selected section
        $('html, body').animate({
            scrollTop: $('#' + selectedValue).offset().top
        }, 1000);
    });
});

//detecting button press

function log(message) {
    if (console && console.log) {
        console.log(message)
    }
}

const numberOfButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfButtons; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function () {

        let buttonInnerHtml = this.innerHTML.toLowerCase();

        // log(buttonInnerHtml)

        makesound(buttonInnerHtml);
        buttonAnimation(buttonInnerHtml);

    });
}

//detecting keyboard press
document.addEventListener("keydown", function (event) {
    makesound(event.key);
    buttonAnimation(event.key);
});


function makesound(key) {

    switch (key) {
        case "a":
            var crash = new Audio("sounds/correctSound")
            crash.play();
            break;

        case "b":
            var kick = new Audio("sounds/incorrectSound")
            kick.play();
            break;

        default:
            console.log("Unhandled key: " + key);
    }


}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);

    if (activeButton){
        activeButton.classList.add("pressed");

        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 100);
    }
}

const acc = document.getElementsByClassName("accordion");
for ( let i = 0; i < acc.length; i++) {
    acc [i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

    });
}


