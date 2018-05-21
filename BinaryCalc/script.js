upper = [];
middle = [];
lower = [];
upperCont = [];
middleCont = [];
lowerCont = [];
upperNumbers = [];
middleNumbers = [];
lowerNumbers = [];
upperContLabels = [];
middleContLabels = [];
lowerContLabels = [];

startDest = 250;
lowerStartDest = 210;

function randomNumber(min,max){
      return Math.floor(Math.random()*(max -min)+min);
}

function init(){
	stage = new createjs.Stage('canvas');
	stage.mouseMoveOtside = true;

for(var i = 0; i < 8; i++){
		upper[i] = new createjs.Shape();
		upper[i].graphics.setStrokeStyle(2).beginStroke('black').beginFill('white').rect(0,0,40,40);
		upperCont[i] = new createjs.Container();
		upperCont[i].setBounds(0,0,40,40);
		upperCont[i].x = startDest += upperCont[i].getBounds().width;
		upperCont[i].y = 100;
		upperContLabels[i] = new createjs.Text(0, '36px sans-serif', '#000000');
		upperContLabels[i].textAlign = 'center';
		upperContLabels[i].x = +20;
		upperNumbers[i] = Number(upperContLabels[i].text);
		upperCont[i].addChild(upper[i],upperContLabels[i]);

		middle[i] = new createjs.Shape();
		middle[i].graphics.setStrokeStyle(2).beginStroke('black').beginFill('white').rect(0,0,40,40);
		middleCont[i] = new createjs.Container();
		middleCont[i].setBounds(0,0,1,1);
		middleCont[i].x = startDest += middleCont[i].getBounds().width -1;
		middleCont[i].y = 140;
		middleContLabels[i] = new createjs.Text(0, '36px sans-serif', '#000000');
		middleContLabels[i].textAlign = 'center';
		middleContLabels[i].x = +20;
		middleNumbers[i] = Number(middleContLabels[i].text);
		middleCont[i].addChild(middle[i], middleContLabels[i]);
		
		stage.addChild(middleCont[i],upperCont[i]);
		stage.update();
	}

	for(var j = 0; j < 9; j++){
		lower[j] = new createjs.Shape();
		lower[j].graphics.setStrokeStyle(2).beginStroke('black').rect(0,0,40,40);
		lowerCont[j] = new createjs.Container();
		lowerCont[j].setBounds(0,0,1,1);
		lowerCont[j].x = lowerStartDest  += lowerCont[j].getBounds().width +39;
		lowerCont[j].y = 180;
		lowerContLabels[j] = new createjs.Text(0, '36px sans-serif', '#000000');
		lowerContLabels[j].textAlign = 'center';
		lowerContLabels[j].x = +20;
		lowerNumbers[j] = Number(lowerContLabels[j].text);
		lowerCont[j].addChild(lower[j], lowerContLabels[j]);
		stage.addChild(lowerCont[j]);
		stage.update();
	}

	upperContLabels.forEach(function(obj,index){
		obj.parent.addEventListener('pressup', function(){
			if(obj.text === 0){
				obj.text = 1;
				lowerContLabels[index+1].text = obj.text + middleContLabels[index].text;
				if(lowerContLabels[index+1].text == 2){
					upperContLabels[index-1].text =1;
					lowerContLabels[index+1].text = obj.text + middleContLabels[index].text;
					lowerContLabels[index+1].text = 0;
					stage.update();
				}
					stage.update();

			}else{
				obj.text = 0;
				lowerContLabels[index+1].text = obj.text + middleContLabels[index].text;
				stage.update();
			}
			
		});
	});

	middleContLabels.forEach(function(obj,index){
		obj.parent.addEventListener('pressup', function(){
			if(obj.text === 0){
				obj.text = 1;
				lowerContLabels[index+1].text = obj.text + upperContLabels[index].text;
				if(lowerContLabels[index+1].text == 2){
					upperContLabels[index-1].text = 1;
					lowerContLabels[index+1].text = 0;
					stage.update();
				} else {
					upperContLabels[index-1].text = 0;
					stage.update();
				}

			}else{
				obj.text = 0;
				lowerContLabels[index+1].text = obj.text + upperContLabels[index].text;
				stage.update();
			}
		});
	});

numbers = new createjs.Text(randomNumber(100, 500), '40px sans-serif', '#0080ff');
numbers.x = 415;
numbers.y = 50;
stage.addChild(numbers);

stage.update();
resultNum = new createjs.Text(123, '40px sans-serif', '#0080ff');
resultNum.x = 415;
resultNum.y = 230;
stage.addChild(resultNum);
stage.update();
};

//console.log(index, middleContLabels[index].text, lowerContLabels[index+1].text);