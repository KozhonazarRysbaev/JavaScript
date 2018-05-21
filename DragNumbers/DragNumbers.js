var stage,shapes,containers,labels,box,destination,startDest,resultl,nums;

nums = [];
shapes = [];
containers = [];
labels = [];
startDest = -50;
result = 0;


function randomNumber(min,max){
      return Math.floor(Math.random()*(max -min)+min);
}

function randomColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
}

function init(){
    stage = new createjs.Stage('myCanvas');
    stage.mouseMoveOutside = true;
    for(var i = 0; i < 5; i++){
        shapes[i] = new createjs.Shape();
        shapes[i].graphics.setStrokeStyle(2).beginStroke('black')
        .beginFill(randomColor()).drawCircle(0,0,50);

        labels[i] = new createjs.Text(randomNumber(5,50), '60px Tahoma', '#FFFFFF');
        labels[i].textAlign = 'center';
        labels[i].y = -37;
        nums[i] = Number(labels[i].text);
        containers[i] = new createjs.Container();
        containers[i].setBounds(0,0,100,100);
        containers[i].x = startDest += containers[i].getBounds().width + 17;
        containers[i].y = 60;
        containers[i].id = i;
        containers[i].name = 'OUT';

        containers[i].addChild(shapes[i], labels[i]);
        stage.addChild(containers[i]);
        stage.update();
    }

    box = new createjs.Shape();
    box.graphics.setStrokeStyle(2).beginStroke('green').rect(0,0,100,100);
    destination = new createjs.Container();
    destination.x = 250;
    destination.y = 490;
    destination.setBounds(250,490,105,105);
    destination.addChild(box);
    stage.addChild(destination);


    containers.forEach(function(dragShape, index){
        var reX, reY;
        dragShape.on('pressmove', function(event){
            event.currentTarget.x = event.stageX;
            event.currentTarget.y = event.stageY;
            if(intersect(event.currentTarget, destination)){
            dragShape.x = destination.x + 50;
            dragShape.y = destination.y + 50;}
            stage.setChildIndex(dragShape, stage.getNumChildren()-1);
            stage.update();
        });

        dragShape.addEventListener("pressup", function(e) {
            if(intersect(dragShape, destination)){
                dragShape.x = destination.x + 50;
                dragShape.y = destination.y + 50;
                if(dragShape.name == 'OUT') {
                    result = result + Number(dragShape.children[1].text);
                    dragShape.children[1].text = result;
                }
                stage.setChildIndex(dragShape, stage.getNumChildren()-1);
                dragShape.name = 'IN';
            } else {
                if(dragShape.name == 'IN') {
                    dragShape.children[1].text = nums[dragShape.id];
                    result = result - Number(dragShape.children[1].text);
                     dragShape.name = 'OUT';
                }
            }
            stage.update();
        });
});


    function intersect(obj1, obj2){
        var objBounds1 = obj1.getBounds().clone();
        var objBounds2 = obj2.getBounds().clone();

        var pt = obj1.globalToLocal(objBounds2.x, objBounds2.y);

        var h1 = -(objBounds1.height / 2 + objBounds2.height);
        var h2 = objBounds2.width / 2;
        var w1 = -(objBounds1.width / 2 + objBounds2.width);
        var w2 = objBounds2.width / 2;


        if(pt.x > w2 || pt.x < w1) return false;
        if(pt.y > h2 || pt.y < h1) return false;

        return true;
    }
    stage.update();
}