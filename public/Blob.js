class Blob {
  constructor(_x, _y, _z, _speed) {
    this.pos = createVector(_x, _y, _z);
    this.dir = p5.Vector.random3D();
    this.dir.normalize();
    this.speed = _speed;
  }

  move() {
    //console.log(this.dir.x);
    this.pos.x += this.dir.x * this.speed;
    this.pos.y += this.dir.y * this.speed;
    this.pos.z += this.dir.z * this.speed;
  }

  keepInBounds() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.dir.x *= -1;
      createCubePattern(this.pos, "y", "z");
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.dir.x *= -1;
      createCubePattern(this.pos, "y", "z");
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.dir.y *= -1;
      createCubePattern(this.pos, "x", "z");
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.dir.y *= -1;
      createCubePattern(this.pos, "x", "z");
    }

    if (this.pos.z < 0) {
      this.pos.z = 0;
      this.dir.z *= -1;
      createCubePattern(this.pos, "x", "y");
    } else if (this.pos.z > depth) {
      this.pos.z = depth;
      this.dir.z *= -1;
      createCubePattern(this.pos, "x", "y");
    }
  }

  // Get number of close enough blobs
  getNeighbors(threshold) {
    let proximityBlobsN = [];
    let otherBlob = [blobArray.length];

    for (let i=0; i<blobArray.length; i++){
      otherBlob[i] = blobArray[i];

      if (this == otherBlob[i]) {
        continue;
      }
      let distance = dist(this.pos.x, this.pos.y, this.pos.z, otherBlob[i].pos.x, otherBlob[i].pos.y, otherBlob[i].pos.z);
      if (distance < threshold) {
        proximityBlobsN.push(otherBlob[i]);
      }
    }
    return proximityBlobsN;
  }

  draw() {
    let proximityBlobs = [];
    proximityBlobs = this.getNeighbors(120);
    //console.log(proximityBlobs.length);

    if (proximityBlobs.length > 0) {
      let blendValue = constrain(map(proximityBlobs.length, 0, 6, 0.0, 1.0), 0.0, 1.0);
      let smallColor = color(0, 255, 255, 50);
      let bigColor = color(255, 0, 0, 180);
      let currentColor = lerpColor(smallColor, bigColor, blendValue);

      // Draw line
      stroke(currentColor);
      strokeWeight(proximityBlobs.length/8);

      let otherBlob = [blobArray.length];
      for (let i=0; i<proximityBlobs.length; i++){
        otherBlob[i] = proximityBlobs[i];
        line(this.pos.x-widthOffset, this.pos.y-heightOffset, this.pos.z-depthOffset, otherBlob[i].pos.x-widthOffset, otherBlob[i].pos.y-heightOffset, otherBlob[i].pos.z-depthOffset);
      }

      //Draw Blob
      //Outside
      stroke(150, 150, 200, 10);
      strokeWeight(proximityBlobs.length*10);
      fill(currentColor);
      push();
        //scale(10);
        translate(this.pos.x-widthOffset, this.pos.y-heightOffset, this.pos.z-depthOffset);
        beginShape(POINTS);
        vertex(0, 0);
        endShape(CLOSE);
        //sphere(2);
      pop();

      //Inside
      noFill();
      stroke(currentColor);
      strokeWeight(proximityBlobs.length*3);
      push();
        translate(this.pos.x-widthOffset, this.pos.y-heightOffset, this.pos.z-depthOffset);
        sphere(2);
      pop();

      //stroke(255);
      //strokeWeight(proximityBlobs.length);
      //push();
      //translate(this.pos.x-widthOffset, this.pos.y-heightOffset, this.pos.z-depthOffset);
      //sphere(20);
      //pop();
      //noSmooth();
    }

    stroke(255);
    strokeWeight(1);
    push();
    translate(this.pos.x-widthOffset, this.pos.y-heightOffset, this.pos.z-depthOffset);
    sphere(2);
    pop();

    // Blobs with too many neighbours slow down, otherwise speed it up
    if (proximityBlobs.length > 2) {
      this.speed *= 0.5;
    } else {
      this.speed *= 1.01;
    }
    this.speed = max(0.25, min(this.speed, 6));
  }
}
