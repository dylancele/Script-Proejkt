$(document).ready(fertig);

var GameStatus = 1;

function fertig() {
    $("#LeftLane").click(LeftMove);
    $("#MiddleLane").click(MiddleMove);
    $("#RightLane").click(RightMove);

    if (GameStatus == 1) {
        toggleColors(250);
        Traffic();
        Tree();
    }

    const car = $("#ImageMain");
    let carPosition = 50; // in percent

    document.addEventListener("keydown", function (event) {
        if (event.key === "a" || event.key === "A") {
            if (carPosition > -95) {
                carPosition -= 15;
                car.stop().animate({ left: carPosition + "%" }, 200);
            }
        } else if (event.key === "d" || event.key === "D") {
            if (carPosition < 189) {
                carPosition += 15;
                car.stop().animate({ left: carPosition + "%" }, 200);
            }
        }
    });
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

        isFirstColor = !isFirstColor;
    }, ms);
}

function Traffic() {
    var car = $("#drive");
    $("#drive").css("z-index", 10);
    $("#drive").animate({ top: 725 }, 2500, function () {
        $(car).remove();
    });
}

function Tree() {
    const grassDivs = $(".grid-container > div");
    let currentIndex = 1;

    const treeInterval = setInterval(function () {
        if (GameStatus !== 1) {
            clearInterval(treeInterval);
            return;
        }

        $("#tree1").detach();

        if (currentIndex >= grassDivs.length) {
            clearInterval(treeInterval);
            return;
        }

        $(grassDivs[currentIndex]).append($("#tree1"));
        currentIndex++;
    }, 250);
}
