---
title: Just Another Day
description: A thesis game project in Unity featuring puzzle mechanics and procedural tools within a narrative-driven experience.
imageUrl: https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/a6bb8867-4eff-423a-8fd0-adeb4702dcb5/Menu+Scene+2.jpg?format=2500w
imageRatio: landscape
software: Game Development
---

# Just Another Day

## Overview
It has been my daily routine for quite a while but why? Experience just this another day to find out.

## Project Status
Thesis Game Project in Progress — March 14th

- Building Game Environment
- Developing puzzle game mechanics
- Composing narrative stories
- Making procedural tools such as stitching tears on any model

[GitHub Link](https://github.com/reatured/Just-Another-Day)

## Game Walk Through (Spoiler Alert)

<div class="video-container my-8 flex items-center justify-center">
  <video controls class="w-full rounded-lg">
    <source src="https://example.com/videos/walkthrough.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Early Prototype

<div class="video-container my-8 flex items-center justify-center">
  <video controls class="w-full rounded-lg">
    <source src="https://example.com/videos/prototype.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Procedural Stitching Mechanics

### Update on Feb 12

#### Prototype 1: Vertices Dragger
The assets (represented by the capsules in the video) can be placed near the vertices that you want to drag.
Then in the run time, you can drag the vertices by mouse or simply move the capsule.

#### Prototype 2: Rope
The physics is not reliable, so I programmatically made the rope attached to the vertices draggers when they collide.
There is also a check mechanism to tighten the wire between two draggers.

#### Prototype 3: Implement on Any Mesh
I imported a teddy bear model that I made. I put a tear on the model for stitching.
Combining the two prototypes above, we get this rough stitching mechanism.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <div class="relative flex items-center justify-center">
    <img src="/placeholder.svg?height=400&width=600&query=Unity%20game%20development%20stitching%20mechanic" alt="Stitching Mechanic Prototype" class="w-full h-auto object-contain rounded-lg" />
  </div>
  <div class="relative flex items-center justify-center">
    <img src="/placeholder.svg?height=400&width=600&query=Unity%20teddy%20bear%20model%20with%20tear" alt="Teddy Bear Model with Tear" class="w-full h-auto object-contain rounded-lg" />
  </div>
</div>
