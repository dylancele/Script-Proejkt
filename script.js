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
}

function isColliding(element1, element2) {
    if (!element1 || !element2) {
        console.error("One or both elements are missing:", element1, element2);
        return false;
    }

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
    console.log("Running checkCollision"); // Just to see it's working at all
    const playerCar = document.getElementById("ImageMain");
    const trafficCars = document.querySelectorAll("#drive, .traffic-car");

    if (!playerCar) {
        console.error("Player car (#ImageMain) not found!");
        return;
    }

    if (trafficCars.length === 0) {
        console.warn("No traffic cars found!");
        return;
    }

    trafficCars.forEach((trafficCar) => {
        if (isColliding(playerCar, trafficCar)) {
            console.log("Collision detected between player car and traffic car!");
            GameStatus = 0;
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

        $(".grass1, .Topgrass1, .Topgrass3, .Topgrass6, .Topgrass8").css("background-color", isFirstColor ? "rgba(23, 175, 9, 0.785)" : "rgba(55, 216, 41, 0.785)");
        $(".grass2, .Topgrass2, .Topgrass4, .Topgrass5, .Topgrass7").css("background-color", isFirstColor ? "rgba(55, 216, 41, 0.785)" : "rgba(23, 175, 9, 0.785)");

        isFirstColor = !isFirstColor;
    }, ms);
}

function Traffic() {
    if (GameStatus !== 1) return;

    const lanes = [".FirstLane1", ".SecondLane1", ".ThirdLane1"];
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    const speed = Math.random() * 1000 + 1500; // Random speed between 1500 and 2500 ms

    // Randomly pick a traffic image
    const trafficImages = ["Traffic1.png", "Traffic2.png", "Traffic3.png", "Traffic4.png"];
    const randomImage = trafficImages[Math.floor(Math.random() * trafficImages.length)];

    // Create and style the traffic car
    const $newCar = $(`<img src="${randomImage}" class="traffic-car" />`).css({
        position: "absolute",
        top: "0px",
        height: "120px",
        width: "120px",
        transform: "rotate(180deg)",
        zIndex: 10,
    });

    $(randomLane).append($newCar); // Add the car to the random lane

    // Animate the car moving down
    $newCar.animate(
        { top: "725px" },
        speed,
        "linear",
        function () {
            $(this).remove(); // Remove the car when it reaches the bottom
        }
    );

    // Spawn cars at random intervals
    if (GameStatus === 1) {
        setTimeout(Traffic, Math.random() * 800 + 700); // Spawn every 700–1500ms
    }
}

function selectCar(number) {
    // Save choice to localStorage immediately
    localStorage.setItem("selectedCar", number);
    
    // Optional: give some visual feedback to the user that car is selected
    alert("Car " + number + " selected!");
  }
  




