---
title: Cartoon Shader
description: A creative exploration of toon shading techniques in Blender, showcasing custom shader development for stylized 3D models.
imageUrl: https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/a0fc2f8f-c051-45b2-be66-1af75ae39598/Wnad+Demo+GIF.gif?format=2500w
imageRatio: square
software: Blender
---

# Cartoon Shader

## Overview

Modelling and coloring with a custom toon shader in Blender.

## Process

1. **Base Modeling**: Created the base 3D models.
2. **Shader Development**: Developed a custom toon shader using Blender's shader nodes.
3. **Material Application**: Applied the toon shader to various objects.
4. **Lighting Setup**: Configured lighting to complement the toon shading style.
5. **Animation**: Added simple animation to showcase the shader in action.

## Technical Details

The toon shader was built using Blender's node system, combining key elements such as:

- **Shader Nodes**: Using nodes like Diffuse BSDF, Shader to RGB, and ColorRamp.
- **ColorRamp with Constant Interpolation**: To create distinct color bands for shadows and highlights, achieving the characteristic flat shading of cartoons.
- **Fresnel Effect**: Incorporated to enhance edge lighting and add subtle rim highlights.
- **Customizable Parameters**: Including line thickness, color saturation, and shadow softness for artistic control.
- **Outline Creation**: Added outlines by applying a Solidify modifier with a separate outline material that uses backface culling and flipped normals to simulate cartoon-style edges.

## Tools Used

- Blender 3.0
- Custom shader nodes
- Animation tools

## Media Gallery
<div class="image-grid-2column">
  <div class="relative flex items-center justify-center">
    <img 
      src="https://github.com/reatured/public-assets/blob/main/3d-design/project2-magicwand/WandDemoGIF7.gif?raw=true" 
      alt="Wand Demo GIF"
      class="" 
    />
  </div>
  <div class="relative flex items-center justify-center">
    <img 
      src="https://github.com/reatured/public-assets/blob/main/3d-design/project2-magicwand/CakeDemoGIF7.gif?raw=true" 
      alt="Cake Demo GIF"
      class="" 
    />
  </div>
  <div class="relative flex items-center justify-center">
    <iframe 
      src="https://player.vimeo.com/video/595566707" 
      width="100%" 
      height="360" 
      frameborder="0" 
      allow="autoplay; fullscreen; picture-in-picture" 
      allowfullscreen
      class="rounded-lg"
      title="Cartoon Shader Demo Video 1"></iframe>
  </div>
  <div class="relative flex items-center justify-center">
    <iframe 
      src="https://player.vimeo.com/video/595566536" 
      width="100%" 
      height="360" 
      frameborder="0" 
      allow="autoplay; fullscreen; picture-in-picture" 
      allowfullscreen
      class="rounded-lg"
      title="Cartoon Shader Demo Video 2"></iframe>
  </div>
</div>
