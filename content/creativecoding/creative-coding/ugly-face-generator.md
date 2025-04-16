---
title: Ugly Face Generator
description: An interactive face generator that creates unique "ugly" faces with each click using p5.js. Features adjustable line thickness and procedural generation techniques.
imageUrl: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ugly-face-generator-preview-Yx9Yx9Yx9Yx9.png
imageRatio: square
software: p5.js, JavaScript
---

# Ugly Face Generator

Clicking on the pic to generator new faces. The slider is for the thickness of the drawing.

<div class="my-8 w-full flex flex-col items-center">
  <div id="p5-container" class="border border-gray-700 rounded-lg overflow-hidden">
    <!-- P5.js sketch will be inserted here -->
  </div>
  <div id="p5-controls" class="mt-4 w-full max-w-[400px] flex items-center justify-between">
    <div id="slider-container" style="width: 200px;"></div>
    <button id="refresh-button" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
      Refresh
    </button>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // P5.js sketch
    const sketch = function(p) {
      let handle1, handle2;
      let handles = [];
      let xMin, xMax, yMin, yMax = []
      let slider;
      let facePt = 5;
      let eyePt = 5;
      let step = 0.01;
      let pointCt = 0;
      let leftEye, rightEye;
      let leftGoggle 
      let rightGoggle
      let vHair = []
      let hairC;
      let ps = []
      let vns = []
      let hairstyle = 0 
      let shadowPos = []
      let pg;
      let leftC, rightC;
      let refreshButton;
      let table;
      let tableData = [
        [90, 100, 200, 100, 150],
        [0, 100, 200, 100, 150],
        [270, 300, 400, 100, 150],
        [180, 300, 400, 300, 350],
        [90, 100, 200, 300, 350],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];

      p.setup = function() {
        p.frameRate(0);
        leftC = [p.random(0,20),p.random(176,196),p.random(0, 191)];
        rightC = [p.random(0,200),p.random(176,196),p.random(171, 191)];
        
        // Create canvas
        let canvas = p.createCanvas(400, 400);
        canvas.parent('p5-container');
        canvas.mousePressed(reFresh);
        
        // Create slider
        slider = p.createSlider(3, 10, 3);
        slider.parent('slider-container');
        slider.style('width', '100%');
        
        // Set up refresh button
        refreshButton = document.getElementById('refresh-button');
        refreshButton.addEventListener('click', reFresh);
        
        p.noFill();
        p.angleMode(p.DEGREES);
        
        //face outline
        updatePoints();

        p.background(255);
        for(let i = 0; i < handles.length-1; i ++){
          drawBezier(handles[i].returnHead(), handles[i+1].returnTail());
        }
        pg = p.createGraphics(400, 400);
        p.draw();
      };

      p.draw = function() {
        pointCt = 0;

        p.background(255, 190, 11);
        
        p.push();
        p.fill(217, 169, 41); //shadow
        p.noStroke();
        p.rect(0,200,400,200);
        p.pop();
        
        p.fill(leftC); //glass
        
        leftLookAt();
        rightLookAt();
        pg = p.createGraphics(400, 400);
        pg.rotate(-0.1);
        pg.fill(145, 110, 17);
        pg.noStroke();
        pg.beginShape();
        pg.vertex(handles[0].x1, handles[0].y1);
        for(let i = 0; i < facePt; i++){
          pg.bezierVertex(handles[i].x2, handles[i].y2, 
                     handles[i+1].x3, handles[i+1].y3, 
                     handles[i+1].x1, handles[i+1].y1);
        }
        pg.endShape();
        
        p.image(pg, -10, 180, 400, 200);
        p.push();
        p.fill(240, 237, 211); // Face Color Here
        p.noStroke();
        p.beginShape();
        p.vertex(handles[0].x1, handles[0].y1);
        for(let i = 0; i < facePt; i++){
          p.bezierVertex(handles[i].x2, handles[i].y2, 
                     handles[i+1].x3, handles[i+1].y3, 
                     handles[i+1].x1, handles[i+1].y1);
        }
        p.endShape();
        
        drawShadow();
        p.pop();
        p.circle(handles[5].x1, handles[5].y1, leftGoggle);
        p.fill(rightC);
        p.circle(handles[10].x1, handles[10].y1, rightGoggle);
        
        for(let i = 0; i < handles.length-1; i ++){
          drawBezier(handles[i].returnHead(), handles[i+1].returnTail());
        }
        drawHair();
        drawMouth();
      };

      function updatePoints(){
        hairC = p.color(p.random(180,220),p.random(180,220),p.random(180,220));
        p.strokeWeight(0);
        leftGoggle = p.random(50,80);
        rightGoggle = p.random(50, 80);
        
        handles = [];
        iniFaceOutlineHd();
        iniLeftEyeHd();
        iniRightEyeHd();
        iniNose();
        iniMouth();
        handle4 = new handle(handles[0].x1 + p.random(15), handles[0].y1 - p.random(15),
                             handles[4].zeroAngle, handles[4].distance);
        handles[4] = handle4;
      }

      function iniFaceOutlineHd(){
        for(let i = 0; i < facePt; i ++){
          iniHandle1(i);
        }
      }

      function iniHandle1(i){
        let x1 = p.random(checkTableInt(i,1), checkTableInt(i,2));
        let y1 = p.random(checkTableInt(i,3), checkTableInt(i,4));

        handle1 = new handle(x1, y1, checkTableInt(i,0), 50);
        handles.push(handle1);
      }

      function iniLeftEyeHd(){
        let yMin, yMax;
        yMin = p.lerp(handles[3].y1, handles[1].y1,0.35);
        yMax = p.lerp(handles[3].y1, handles[1].y1, 0.45);
        let xMin = p.lerp(handles[0].x1, handles[2].x1, 0.3);
        let xMax = p.lerp(handles[0].x1, handles[2].x1, 0.2);

        let center = p.createVector(p.random(xMin, xMax), p.random(yMin, yMax));
        leftEye = center;
        for(let i = 0; i < eyePt; i ++){
          
          handle1 = new handle(center.x, 
                               center.y+ Math.pow(-1,i) * i * 10, 
                               checkTableInt(i +facePt,0), 
                               15+(i*5));
          handles.push(handle1);
        }
        handle1 = new handle(center.x + 30, center.y, 
                               checkTableInt(eyePt + facePt,0), 25);
        handles.push(handle1);
      }

      function iniRightEyeHd(){
        let yMin, yMax;
        yMin = p.lerp(handles[3].y1, handles[1].y1,0.35);
        yMax = p.lerp(handles[3].y1, handles[1].y1, 0.45);
        let xMin = p.lerp(handles[0].x1, handles[2].x1, 0.7);
        let xMax = p.lerp(handles[0].x1, handles[2].x1, 0.8);

        let center = p.createVector(p.random(xMin, xMax), p.random(yMin, yMax));
        rightEye = center;
        for(let i = 0; i < eyePt-1; i ++){
          handle1 = new handle(center.x, 
                               center.y+ Math.pow(-1,i) * i * 10, 
                               checkTableInt(i +1 +eyePt+facePt,0), 
                               15+(i*5));
          handles.push(handle1);
        }
        handle1 = new handle(p.lerp(center.x , handles[5].x1,0.5), 
                             center.y, 
                             checkTableInt(eyePt + eyePt + facePt,0), 
                             25);
        handles.push(handle1);
      }

      function iniNose(){
        let handle1 = handles[facePt+ eyePt *2];
        let x = handle1.x1 + p.random(0,40);
        let y = handle1.y1 + p.random(60,75);
        let handle2 = new handle(x, y,
                                 90 + p.random(-5,65), 
                                 p.random(60,80));
        x = (handle2.x1 + handle2.x2)/2;
        y = handle2.y2 + 10;
        let handle3 = new handle(x, y,
                                 180 + p.random(-5,65), 
                                 p.random(35,55));
        handles.push(handle2);
        handles.push(handle3);
      }

      function drawHair(){
        vHair = [];
        ps = [];
        vns = [];
        
        getHairPos(handles[2].returnHead(), handles[3].returnTail(), 0.5);
        getHairPos(handles[3].returnHead(), handles[4].returnTail(), 0);
        let last = p.createVector(ps[ps.length-1].x, ps[ps.length-1].y);
        let first = p.createVector(ps[0].x, ps[0].y);
        
        p.push();
        p.strokeWeight(6);
        for(let i= 0; i < ps.length; i++){
          if(i> 0 && i < ps.length-1){
            ps[i].add((vns[i].rotate(100+30 * Math.abs(Math.sin(p.millis())))).
                      mult(p.noise(i/20+hairstyle) *100));
          }
          vHair.push(ps[i]);
        }
        p.pop();

        p.push();
        p.fill(hairC);
        p.beginShape();
        for(let i = 0; i < vHair.length; i++){
          p.vertex(vHair[i].x, vHair[i].y);
        }
        
        p.bezierVertex(p.lerp(vHair[vHair.length-1].x, vHair[0].x, 0.25), 
                     p.lerp(vHair[vHair.length-1].y, vHair[0].y, 0.25)+15,
                     p.lerp(vHair[vHair.length-1].x, vHair[0].x, 0.75), 
                     p.lerp(vHair[vHair.length-1].y, vHair[0].y, 0.75)+15,
                     vHair[0].x, vHair[0].y);
        
        p.endShape();
        p.pop();
      }

      function getHairPos(h1, h2, start){
        p.strokeWeight(2);
        let x1 = h1[0];
        let y1 = h1[1];
        let x2 = h1[2];
        let y2 = h1[3];
        let x3 = h2[0];
        let y3 = h2[1];
        let x4 = h2[2];
        let y4 = h2[3];
        let x21,y21,x22,y22,x23,y23,x31,y31,x32,y32,x41,y41;
        
        for(let t = start; t < start+0.5; t+= step){
          x21 = p.lerp(x1, x2, t);
          x22 = p.lerp(x2, x3, t);
          x23 = p.lerp(x3, x4, t);
          y21 = p.lerp(y1, y2, t);
          y22 = p.lerp(y2, y3, t);
          y23 = p.lerp(y3, y4, t);
          
          x31 = p.lerp(x21, x22, t);
          x32 = p.lerp(x22, x23, t);
          y31 = p.lerp(y21, y22, t);
          y32 = p.lerp(y22, y23, t);
            
          x41 = p.lerp(x31, x32, t);
          y41 = p.lerp(y31, y32, t);
          
          let v = p.createVector(x32-x31, y32-y31);
          v.normalize();
          let vn = p.createVector(-v.y, v.x);
          vns.push(v);
          let point = p.createVector(x41, y41);
          ps.push(point);
        }
      }

      function iniMouth(){
        let handle1, handle2;
        handle1 = handles[handles.length -1];
        let x = handle1.x1;
        handle1 = handles[handles.length -2];
        let y = handle1.y1 +55;
        
        handle2 = new handle(x, y,
                                 270 + p.random(-5,65), 
                                 p.random(35,55));
        handles.push(handle2);
        handle2.x1 -= 50;
        handles.push(handle2);
      }

      function drawMouth(){
        let handle1, handle2;
        handle1 = handles[handles.length -1];
        handle2 = handles[handles.length -2];
        
        p.push();
        p.fill(255, 0, 110);
        p.beginShape();
        
        p.vertex(handle1.x1, handle1.y1);
        
        p.bezierVertex(handle1.x2, handle1.y2,
                     handle2.x3, handle2.y3,
                     handle2.x1, handle2.y1);
        
        p.endShape();
        p.pop();
      }

      function drawShadow(){
        shadowPos = [];
        drawShape(handles[1].returnHead(), handles[2].returnTail(), 0.2, 1);
        drawShape(handles[2].returnHead(), handles[3].returnTail(), 0, 1);
        
        p.push();
        p.strokeWeight(0);
        p.fill(191, 184, 145,150);
        p.beginShape();
        for(let i = 0; i < shadowPos.length; i++){
          p.vertex(shadowPos[i].x, shadowPos[i].y);
        }
        
        p.bezierVertex(Math.max(shadowPos[shadowPos.length-1].x, shadowPos[0].x)+100, 
                     p.lerp(shadowPos[shadowPos.length-1].y, shadowPos[0].y, 0.25),
                     Math.max(shadowPos[shadowPos.length-1].x, shadowPos[0].x)+80, 
                     p.lerp(shadowPos[shadowPos.length-1].y, shadowPos[0].y, 0.75),
                     shadowPos[0].x, shadowPos[0].y);
        
        p.endShape();
        p.pop();
      }

      function drawShape(h1, h2, start, end){
        p.strokeWeight(2);
        let x1 = h1[0];
        let y1 = h1[1];
        let x2 = h1[2];
        let y2 = h1[3];
        let x3 = h2[0];
        let y3 = h2[1];
        let x4 = h2[2];
        let y4 = h2[3];
        let x21,y21,x22,y22,x23,y23,x31,y31,x32,y32,x41,y41;
        
        for(let t = start; t < end; t+= step){
          x21 = p.lerp(x1, x2, t);
          x22 = p.lerp(x2, x3, t);
          x23 = p.lerp(x3, x4, t);
          y21 = p.lerp(y1, y2, t);
          y22 = p.lerp(y2, y3, t);
          y23 = p.lerp(y3, y4, t);
          
          x31 = p.lerp(x21, x22, t);
          x32 = p.lerp(x22, x23, t);
          y31 = p.lerp(y21, y22, t);
          y32 = p.lerp(y22, y23, t);
            
          x41 = p.lerp(x31, x32, t);
          y41 = p.lerp(y31, y32, t);
          
          let point = p.createVector(x41, y41);
          shadowPos.push(point);
        }
      }

      function drawBezier(h1, h2){
        p.strokeWeight(2);
        let x1 = h1[0];
        let y1 = h1[1];
        let x2 = h1[2];
        let y2 = h1[3];
        let x3 = h2[0];
        let y3 = h2[1];
        let x4 = h2[2];
        let y4 = h2[3];
        let x21,y21,x22,y22,x23,y23,x31,y31,x32,y32,x41,y41;
        
        for(let t = 0; t < 1; t+= step){
          x21 = p.lerp(x1, x2, t);
          x22 = p.lerp(x2, x3, t);
          x23 = p.lerp(x3, x4, t);
          y21 = p.lerp(y1, y2, t);
          y22 = p.lerp(y2, y3, t);
          y23 = p.lerp(y3, y4, t);
          
          x31 = p.lerp(x21, x22, t);
          x32 = p.lerp(x22, x23, t);
          y31 = p.lerp(y21, y22, t);
          y32 = p.lerp(y22, y23, t);
            
          x41 = p.lerp(x31, x32, t);
          y41 = p.lerp(y31, y32, t);
          let v = p.createVector(x32-x31, y32-y31);
          
          v.normalize();
          let vn = p.createVector(-v.y, v.x);
          let point = p.createVector(x41, y41);
          
          p.strokeWeight(slider.value()/2 + p.noise(-p.millis()/120 + pointCt/8) *4);
          point.add(vn.mult(slider.value() + p.noise(p.millis()/150 + pointCt/8) *4));
          p.point(point.x, point.y);

          pointCt++;
        }
      }

      function leftLookAt(){
        let er = 15;
        let x = p.map(p.mouseX, leftEye.x-200, leftEye.x+200, leftEye.x - er, leftEye.x + er);
        let y = p.map(p.mouseY, leftEye.y-200, leftEye.y+200, leftEye.y - er, leftEye.y + er);
        
        x = Math.max(Math.min(leftEye.x + er, x), leftEye.x - er);
        y = Math.max(Math.min(leftEye.y + er, y), leftEye.y - er);
        let center = p.createVector(x,y);
        handles[5].x1 = x;
        handles[5].y1 = y;
        let v = p.createVector(x-leftEye.x,y-leftEye.y);
        for(let i = 0; i < eyePt; i ++){
          
          handles[facePt + i].x1 = x;
          handles[facePt + i].y1 = y+ Math.pow(-1,i) * i * 10;
        }
        handles[5].updatePos(v);
      }

      function rightLookAt(){
        let er = 15;
        let x = p.map(p.mouseX, rightEye.x-200, rightEye.x+200, rightEye.x - er, rightEye.x + er);
        let y = p.map(p.mouseY, rightEye.y-200, rightEye.y+200, rightEye.y - er, rightEye.y + er);
        
        x = Math.max(Math.min(rightEye.x + er, x), rightEye.x - er);
        y = Math.max(Math.min(rightEye.y + er, y), rightEye.y - er);
        let center = p.createVector(x,y);
        handles[10].x1 = x;
        handles[10].y1 = y;
        let v = p.createVector(x-rightEye.x,y-rightEye.y);
        for(let i = 0; i < eyePt-1; i ++){
          
          handles[facePt + eyePt +1+ i].x1 = x;
          handles[facePt + eyePt +1 +i].y1 = y+ Math.pow(-1,i) * i * 10;
        }
        handles[10].updatePos(v);
      }

      function checkTableInt(x,y){
        // Using hardcoded table data instead of loading from CSV
        if (x < tableData.length && y < tableData[x].length) {
          return tableData[x][y];
        }
        return 0;
      }

      class handle {
        constructor(x1, y1, angle, distance){
          this.x1 = x1;
          this.y1 = y1;
          this.zeroAngle = angle;
          this.angle = angle + p.random(-10, 10);
          this.distance = distance;
          this.x2 = x1+p.sin(this.angle) * this.distance;
          this.y2 = y1+p.cos(this.angle) * this.distance;
          this.x3 = x1-this.x2+x1;
          this.y3 = y1-this.y2+y1;
        }
        
        returnHead(){
          return[this.x1,this.y1,this.x2,this.y2];
        }
        
        returnTail(){
          return[this.x3,this.y3,this.x1,this.y1];
        }
        
        updatePos(v){
          this.x2 = this.x1+v.x*1.5;
          this.y2 = this.y1+v.y*1.5;
          this.x3 = this.x1-this.x2+this.x1;
          this.y3 = this.y1-this.y2+this.y1;
        }
        
        drawPt(index){
          if(index == 1){
            p.point(this.x1, this.y1);
          }else if(index == 2){
            p.point(this.x2, this.y2);
          }else if(index == 3){
            p.point(this.x3, this.y3);
          }
        }
      }

      function reFresh(){
        updatePoints();
        hairstyle++;
        leftC = [p.random(0,200),p.random(176,196),p.random(0, 191)];
        rightC = [p.random(0,200),p.random(0,196),p.random(171, 191)];
        p.draw(); 
      }
    };

    // Create a new p5 instance with the sketch
    new p5(sketch);
  });
</script>

## Design Process

I started with this sketch of face drew by one line using pen in Adobe AI;

Then I just keep adding interesting things that I thought would be fun. Things that I put in this generator:

==>Lerp, Noise, and some Vector transformations.

[Link to editor](https://editor.p5js.org/lz2729/sketches/fQI7SZM5f)
