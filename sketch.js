var ballOne;
var database, position;

function setup(){

    database = firebase.database();
    createCanvas(500,500);
    ballOne = createSprite(250,250,10,10);
    ballOne.shapeColor = "red";

    var ballOnePosition = database.ref('ball/position');
    ballOnePosition.on("value",readPosition ,showError);
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
    
    // ballOne.x = ballOne.x + x;
    // ballOne.y = ballOne.y + y;
}

function readPosition(data){
    position = data.val();
    ballOne.x = position.x;
    ballOne.y = position.y;
}

function showError(){

    console.log("!!!ERROR WRITING INTO DATABASE!!!")

}