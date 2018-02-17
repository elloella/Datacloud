/*
Virus network 3d
https://www.openprocessing.org/sketch/387531

 Author:
 Jason Labbe

 Site:
 jasonlabbe3d.com

 Controls:
 - Hold left-click to rotate camera.
 - Hold middle-click to move camera.
 - Hold right-click to zoom or scroll mouse wheel to zoom.
 */

//var client  = mqtt.connect('wxs://test.mosquitto.org')

let depth = 800;

let widthOffset;
let heightOffset;
let depthOffset;

let blobArray = [];
let blobArraySize = 100;

let cubes = [];
let cubeSize = 20;

//let mouseClick;
let posStart;
let rotStart;
let zoomStart = 0;
let cameraPos;
let cameraRot;
let cameraZoom = -800;
let angleX = 0; //circular motion - angle
let angleY = 0;
let xCircular = 0;
let yCircular = 0;

//sockets
let socket;

function setup() {
  createCanvas(1280, 720, WEBGL);
  setAttributes('antialias', true);

  socket = io.connect('http://localhost:3000');
  socket.on('ServerToClient', socketEvents);

  //mouseClick = createVector(width/2, height/2);
  posStart = createVector(width/2, height/2);
  rotStart = createVector(width/2, height/2);
  posStart = createVector(width/2, height/2);
  cameraPos = createVector(width/2, height/2);
  cameraRot = createVector(width/2, height/2);

  for (let i=0; i<blobArraySize; i++){
    blobArray[i] = new Blob(random(0.0, width), random(0.0, height), random(0.0, depth), random(0.1, 1.0));
  }
  let initVec = createVector(width/2, height/2, 0);

  for (let i=0; i<1; i++){
    cubes[i] = new Cubes(initVec, frameCount+4);
  }

  //MQTT setup
  //client = new MQTTClient(this);
  //client.connect("mqtt://broker.i-dat.org:80", "processing");
  //client.subscribe("homeNR/light");

  //hint(DISABLE_DEPTH_TEST);

  widthOffset = width/2;
  heightOffset = height/2;
  depthOffset = depth/2;

  //for (let i = 0; i < Count; i++) {
    //blobs.add(new blobBlob(random(0.0, width), random(0.0, height), random(0.0, depth), random(0.5, 2.0)));
  //}
}

function draw() {
  background(0, 20, 30);
  makeCircularMotion();

  push();
    translate(-width/2+100, -300, 400);
    translate(cameraPos.x, cameraPos.y, cameraZoom);
    rotateY(radians(cameraRot.x));
    rotateX(radians(-cameraRot.y));

    for (let i=0; i< blobArray.length; i++) {
      blobArray[i].move();
      blobArray[i].keepInBounds();
      blobArray[i].draw();
    }

    for (let x = 0; x < cubes.length; x++) {
      cubes[x].display();
      if (cubes[x].destroy() <= 0) {
        cubes.splice(x,1);
      }
    }
  pop();
}

//Initializes camera controls
function makeCircularMotion() {
  angleX += 0.2;
  angleY += 0.22;
  xCircular = angleX % 360;
  yCircular = angleY % 360;

  rotStart.set(cameraRot.x, cameraRot.y);
  posStart.set(cameraPos.x, cameraPos.y);
  //mouseClick.set(xCircular, yCircular);
  cameraRot.x = xCircular;
  cameraRot.y = yCircular;
}
