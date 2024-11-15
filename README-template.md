# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

I built the BONUS challenge version of this game with Lizard and Spock which is harder than the original version.

### The challenge

Users are able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors, Lizard, Spock against the computer
- Maintain the state of the score after refreshing the browser

### Video

![](./video.mp4)

TODO: Put a video here if possible instead of a screenshot

### Links

TODO: Update links here

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [https://jeremymouzin.github.io/fem-rock-paper-scissors/](https://jeremymouzin.github.io/fem-rock-paper-scissors/)

## How I thought about developing this game

### First, the technologies

- Semantic HTML5 markup
- CSS custom properties with Flexbox
- Vanilla JavaScript
- Desktop-first workflow
- Google fonts

### Steps breakdown

## Step 1: Quick look at the designs

I checked the desktop and mobile designs and decided that the structure would allow me to approach integration as usual with a top-bottom approach and desktop-first.

I start from the top of the design and build each piece one by one until I reach the bottom... starting with the header.

## Step 2: The header

After putting the background gradient to the body I started with the header. A logo at the left and the score at the right, flexbox with space-between will do the job nicely.

I had to adjust the logo position and paddings in the header because they're not exactly the same and I do pixel perfect designs you know. So I throwed a `position: relative; top: 4px;` on the logo to fit perfectly the design.

Also I had to add a `h1` tag for best practices so I decided to put one that is invisible (because nothing on the design seems relevant to be a title). I didn't add `aria-hidden` attribute so that ARIA technologies can use this information. I'm not an expert on accessibility, I'm still learning so feel free to correct me if I'm wrong.

## Author

- My JavaScript Course website - [JavaScript de Zéro](https://www.javascriptdezero.com)
- Frontend Mentor - [@jeremymouzin](https://www.frontendmentor.io/profile/jeremymouzin)
- Twitter - [@jeremymouzin](https://twitter.com/jeremymouzin)
