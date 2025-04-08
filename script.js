$(document).ready(fertig);

var GameStatus = 1;

function fertig() {
    $("#LeftLane").click(LeftMove);
    $("#MiddleLane").click(MiddleMove);
    $("#RightLane").click(RightMove);
    if (GameStatus == 1) 
    {
        toggleColors(250);
    }
    if (GameStatus == 1)
    {
        Traffic();
        Tree();
    }
}

function LeftMove() 
{
    $("#LeftLane").append($("#ImageMain"));
}

function MiddleMove() 
{
    $("#MiddleLane").append($("#ImageMain"));
}

function RightMove() 
{
    $("#RightLane").append($("#ImageMain"));
}

function toggleColors(ms) 
{
    var isFirstColor = false;

    var interval = setInterval(function () {
    if (GameStatus !== 1) 
    {
    clearInterval(interval);
    return;
    }

    $(".grass1").css("background-color", isFirstColor ? "rgba(23, 175, 9, 0.785)" : "rgba(55, 216, 41, 0.785)");
    $(".grass2").css("background-color", isFirstColor ? "rgba(55, 216, 41, 0.785)" : "rgba(23, 175, 9, 0.785)");

         isFirstColor = !isFirstColor;
    }, ms);
    // var grass1 = $(".grass1"); 
    // var grass2 = $(".grass2");
    // $(grass1).animate({top:500}, 2500);
    // $(grass2).animate({top:500}, 2500);
}

function Traffic() 
{
    var car = $("#drive");
    $("#drive").css("z-index", 10);  
    $("#drive").animate({top: 725}, 2500, function() 
    {
        $(car).remove();  
    });
}

function Tree()
{
    var tree = $("#Tree1");  
    var currentLane = 1;

    function moveTreeDown() 
    {
        
    }
     
}
