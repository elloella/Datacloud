//INDE 402 - Datacloud.

let socket;
let incomingData = 0; //Values for the data.
let interpIncomingData = 0;
let col = 0;

let Object1; //create for each object.
let Object2;
let Object3;
let Object4;
let Object5;
let Object6;
let Object7;
let Object8;
let Object9;
let Object10;
let Object11;
let Object12;
let Object13;
let Object14;
let Object15;


function setup() {
  var canvas = createCanvas(1280, 720); //Canvas size.
  canvas.class("myCanvas");
  canvas.parent("myContainer"); //centres the canvas
  background(8, 7, 8); //Background colour.

  socket = io(); //Setting up the socket.
  socket.on('ServerToClient', socketEvents);
  socket = io.connect('http://localhost:5000');
  socket.on('ServerToClient', socketEvents);

  Object1 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150)); //create new for each object.
  Object2 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150)); //Defining the position and size of the objects, setting them to random so it changes each time.
  Object3 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150)); //The size of each object will be between 50 and 100.
  Object4 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object5 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object6 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object7 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object8 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object9 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object10 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object11 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object12 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object13 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object14 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
  Object15 = new Circle(width/2, height/2, random(-5, 5), random(-5, 5), random(50, 150));
}

function socketEvents(data){ //Setting up the socket function.
  incomingData = data;
  console.log(incomingData); //Console log to view the data values that are coming in.
}

function draw() {
  background(8, 7, 8); //Background colour.
  Object1.moveFunction(); //Move function for each object.
  Object1.displayCircle(); //Display for each object.
  Object2.moveFunction();
  Object2.displayCircle();
  Object3.moveFunction();
  Object3.displayCircle();
  Object4.moveFunction();
  Object4.displayCircle();
  Object5.moveFunction();
  Object5.displayCircle();
  Object6.moveFunction();
  Object6.displayCircle();
  Object7.moveFunction();
  Object7.displayCircle();
  Object8.moveFunction();
  Object8.displayCircle();
  Object9.moveFunction();
  Object9.displayCircle();
  Object10.moveFunction();
  Object10.displayCircle();
  Object11.moveFunction();
  Object11.displayCircle();
  Object12.moveFunction();
  Object12.displayCircle();
  Object13.moveFunction();
  Object13.displayCircle();
  Object14.moveFunction();
  Object14.displayCircle();
  Object15.moveFunction();
  Object15.displayCircle();
}

class Circle{ //Definition of the class Circle.
  constructor(x, y, speedX, speedY, size){//Setup of class' variables.
  this.x = x; //starting co-ordinates.
  this.y = y;
  this.speedX = speedX; //setting the speed of the circles when they move.
  this.speedY = speedY;
  this.speedX0 = 0; //setting the speed to 0 for when zeros are recieved.
  this.speedY0 = 0;
  this.size = size; //changes size.
}

moveFunction(){ //Function that takes care of motion and collision.
  if (incomingData == 0){
    this.x = this.x + this.speedX0; //if 0 is recived the objects don't move.
    this.y = this.y + this.speedY0;
  } else {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY; //if 0 isn't recived the objects move.
  }

  if (this.x > width || this.x<0){ //Based on boundaries collision, reverse direction for x and y.
    this.speedX *= -1;
  }
  if (this.y > (height) || this.y<0){
    this.speedY *= -1;
  }
}

displayCircle(){ //Function that creates the ellipse.
  noStroke();
  ellipse(this.x, this.y, this.size, this.size); //Changes the postion and size of the ellipse.
  if (incomingData == 0){ //If 0 is recived the colour is red.
    fill(255, 51, 51 );
  } else {
    fill(0, 204, 0 ); //if 0 is not recieved the colour is green.
  }
}
}
