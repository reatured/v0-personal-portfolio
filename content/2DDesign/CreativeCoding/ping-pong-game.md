---
title: Ping Pong Game
description: A web-based ping pong game with 3D projection onto 2D canvas, created by a former professional ping pong player with 20+ years of experience.
imageUrl: https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/ba6206fa-a0a0-4dc1-a154-666695762c63/FPP_Table_Tennis_Game_cropped.gif?format=2500w
imageRatio: landscape
software: JavaScript, Canvas
---

# Ping Pong Game

## Game Description

It's pretty straightforward. You just play the Ping Pong game with your mouse. I choose to make this game because playing ping pong is in my entire life. I play ping pong for more than 20 years and almost 10 years in the professional league in China. For me, a large portion of my life is playing competitions, losing competitions, and practicing more. I always lose because, for each competition, there would only be one person who doesn't lose. Competitions are cruel and I just kept practicing to win more.

## The Challenging Parts

- Making 3D projection onto 2D canvas without using WebGL
- Organize codes for game design and future extension

<div class="image-grid-2column">
<div style="padding-top: 30px;">
   <iframe src="https://editor.p5js.org/lz2729/full/t0642p3hV" width="600px" height="600px"></iframe>
</div>
<div>
<h2>Play Tips</h2>

1. Click to serve
2. You don't need to click to return the ball
3. The capsule shows your hitting area, hit the ball inside that area

</div>

</div>

## Development Process

### Prototyping Sketch

I started with sketches to plan out the game mechanics and visual elements:

- Initial game concept and layout
- Physics calculations for ball movement
- Player interaction mechanics
- UI elements and feedback systems

### Prototyping Game Physics and 3D Projection

One of the most challenging aspects was implementing 3D projection onto a 2D canvas without using WebGL. This required custom mathematics to simulate depth and perspective.

### Custom Collision Detection

I made my own capsule collider to detect if the ball is hit. This was implemented using mathematical formulas to calculate the distance between the ball and the player's paddle area.

## Reflection From this Project

This is a huge project for me. Thanks to my previous experience with Unity, I had an idea of how game engines work. I had a lot of iterations for this project mainly because I didn't organize my JS files like a game engine. It's hard to expand a player's skill set if this game is not written like a formal game engine. Thus, I spent almost two days reorganizing my codes, so that I can add detection and game mechanics there.

The last version is pretty organized and it's very flexible for adding new skills for players to use. My original idea is to incorporate cool things from the Prince of Tennis. Apparently, I don't have enough time for that, and debugging took so much time.

## Technical Achievements

For this Project, I tried a lot of (new) things:

1. **Writing scene managers:**  
   It now makes sense to me how it's really working behind Unity. I didn't use switch here because my game is a little bit too complex to use "switch" to organize my file. I use "switch" at other places though.

2. **Writing Capsule Collider:**  
   Not really a new thing for me. This is like a revision. I used to write shaders with raymarching to make a 3D capsule, so it's not too challenging for me here. The math is simple here.

3. **Writing Basic Physics:**  
   This is also an interesting but not so challenging part.

4. **Use of Class:**  
   First time really using a lot of classes in my project. I find a lot of new ways to use the class. It's awesome.

5. **Adding Sound Effects:**  
   Sound effects are always cool to add to a game. I really like the sounds here.

## Personal Achievement

My experience with ping pong extends beyond this digital project. I've competed in tournaments and even won a championship in Columbia's Tournament, bringing my real-world expertise into this virtual implementation.
\`\`\`
