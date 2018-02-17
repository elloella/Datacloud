//Creates a series of cubes to fade in then out
function createCubePattern(source, axisX, axisY) {
  let pos = createVector(source.x, source.y, source.z);
  let count = parseInt(random(2, 10));
  //let initVec = createVector(width/2, height/2, 0);
  //newCube = new Cube(initVec, frameCount+4);

  for (let x = 0; x < count; x++) {
    let delayOffset = frameCount+4*x;
    let initVec = createVector(pos.x, pos.y, pos.z);
    //newCube[x] = new Cube(initVec, delayOffset);
    //newCube = new Cube(initVec, frameCount+4);
    let newCube = [];
    newCube = new Cubes(initVec, frameCount+4);
    cubes.push(newCube);
    let axis = [axisX, axisY];
    let dir = axis[int(random(axis.length))];

    let val;
    if (parseInt(random(2)) == 0) {
      val = cubeSize*2;
    } else {
      val = -cubeSize*2;
    }

    if (dir == "x") {
      pos.x += val;
    } else if (dir == "y") {
      pos.y += val;
    } else {
      pos.z += val;
    }
  }
}

class Cubes {
  constructor(_pos, _startFrame) {
    this.active = true;
    this.startFrame = 0;
    this.color1 = color(255, 255, 255, 0);
    this.color2 = color(255, 255, 255, 30);
    this.pos = _pos;
    this.startFrame = _startFrame;
    this.blendValue;
  }

 display() {
    if (! this.active) {
      return;
    }

    if (frameCount > this.startFrame) {
      this.blendValue = sin((frameCount-this.startFrame)*0.05);

      // Mark it as inactive once it fades out
      if (this.blendValue < 0) {
        this.active = false;
        return;
      }

      let currentColor = lerpColor(this.color1, this.color2, this.blendValue);

      noFill();
      stroke(currentColor);
      strokeWeight(3);

      push();
      translate(this.pos.x-widthOffset, this.pos.y-heightOffset, this.pos.z-depthOffset);
      box(cubeSize*2);
      pop();
    }
  }

  destroy(){
    return this.blendValue;
  }
}
