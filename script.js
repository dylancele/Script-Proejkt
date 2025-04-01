$(document).ready(fertig);

function fertig() {
    $("#LeftLane").click(move);
    $("#RightLane").click(move2);
    $("#MiddleLane").click(move3);
}

function move() 
{
    $("#LeftLane").append($("#imageMAIN"));
}

function move2() 
{
    $("#RightLane").append($("#imageMAIN"));
}

function move3() 
{
    $("#MiddleLane").append($("#imageMAIN"));
}
