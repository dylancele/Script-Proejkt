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

    const gameArea = $("#game-area");

    // Get initial position when page loads (to avoid jumping behavior)
    const car = document.getElementById("ImageMain");
    let carPosition = 50; // Initial position in percentage (matches CSS `left: 50%`)

document.addEventListener("keydown", function (event) {
    if (event.key === "a" || event.key === "A") {
        if (carPosition > -95) { // Prevent moving out of bounds
            carPosition -= 15; // Move left by 10%
            car.style.left = carPosition + "%";
        }
    } else if (event.key === "d" || event.key === "D") {
        if (carPosition < 189) { // Prevent moving out of bounds
            carPosition += 15; // Move right by 10%
            car.style.left = carPosition + "%";
        }
    }
});

setInterval(checkCollision, 50);
}

function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

function checkCollision() {
    const playerCar = document.getElementById("ImageMain");
    const trafficCars = document.querySelectorAll("#drive, .traffic-car");

    trafficCars.forEach((trafficCar) => {
        if (isColliding(playerCar, trafficCar)) {
            GameStatus = 0;
            console.log("Collision detected! Game over.");
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
    // Get all the divs in the grid container
    const grassDivs = $(".grid-container > div");
    let currentIndex = 1; // Start at the second div (index 1, assuming tree1 starts in the second div)

    // Move the tree each time the grass changes color
    const treeInterval = setInterval(function () {
        if (GameStatus !== 1) {
            clearInterval(treeInterval);
            return;
        }

        // Remove the tree from the current div
        $("#tree1").detach();

        // Check if the tree has reached the last div
        if (currentIndex >= grassDivs.length) {
            clearInterval(treeInterval); // Stop the interval
            return; // Exit the function
        }

        // Move the tree to the next div
        $(grassDivs[currentIndex]).append($("#tree1"));
        currentIndex++; // Increment the index
    }, 250); // Adjust the interval time as needed
}
