$(document).ready(fertig);

var GameStatus = 1;

function fertig() {
    $("#LeftLane").click(LeftMove);
    $("#MiddleLane").click(MiddleMove);
    $("#RightLane").click(RightMove);

    if (GameStatus == 1) {
        
        toggleColors(500);
    }
}

function LeftMove() {
    $("#LeftLane").append($("#ImageMain"));
}

function MiddleMove() {
    $("#MiddleLane").append($("#ImageMain"));
}

function RightMove() {
    $("#RightLane").append($("#ImageMain"));
}

function toggleColors(ms) {
    var isFirstColor = false;

    var interval = setInterval(function () {
        if (GameStatus !== 1) {
            clearInterval(interval);
            return;
        }

        $(".grass1").css("background-color", isFirstColor ? "rgba(23, 175, 9, 0.785)" : "rgba(55, 216, 41, 0.785)");
        $(".grass2").css("background-color", isFirstColor ? "rgba(55, 216, 41, 0.785)" : "rgba(23, 175, 9, 0.785)");
        $("#RightLane").append($("#Car1"));

        isFirstColor = !isFirstColor;
    }, ms);
}
