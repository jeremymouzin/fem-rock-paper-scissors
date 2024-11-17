# My Rock, Paper, Scissors, Lizard, Spock solution

This is my solution to the BONUS version of [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH).

> [!IMPORTANT]
> I did this challenge with the free subscription so I did NOT have the Figma file. I used a browser extension called Pixel Perfect Pro to superimpose the design images over the site to make a pixel perfect integration because I'm a details oriented person (nobody's perfect!)
> I built the BONUS challenge version of this game with Lizard and Spock which is harder than the original version.

## Table of contents

- [The challenge](#the-challenge)
- [Video](#video)
- [Links](#links)
- [Technologies used](#technologies-used)
- [Thoughts process](#thoughts-process)
  TODO: Update links here
- [Author](#author)

## The challenge

Users are able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors, Lizard, Spock against the computer
- Maintain the state of the score after refreshing the browser

## Video

![](./video.mp4)

TODO: Put a video here if possible instead of a screenshot

## Links

TODO: Update links here

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [https://jeremymouzin.github.io/fem-rock-paper-scissors/](https://jeremymouzin.github.io/fem-rock-paper-scissors/)

## Technologies used

- Semantic HTML5 markup
- CSS custom properties with Flexbox
- Vanilla JavaScript
- Desktop-first workflow
- Google fonts

## Thoughts process

### Step 1: Quick look at the designs

I checked the desktop and mobile designs and decided that the structure would allow me to approach integration as usual with a top-bottom approach and desktop-first.

I start from the top of the design and build each piece one by one until I reach the bottom... starting with the header.

### Step 2: The header

After putting the background gradient to the body I started with the header. A logo at the left and the score at the right, flexbox with space-between will do the job nicely.

I had to adjust the logo position and paddings in the header because they're not exactly the same and I do pixel perfect designs you know. So I throwed a `position: relative; top: 4px;` on the logo to fit perfectly the design.

Also I had to add a `h1` tag for best practices so I decided to put one that is invisible (because nothing on the design seems relevant to be a title). I didn't add `aria-hidden` attribute so that ARIA technologies can use this information. I'm not an expert on accessibility, I'm still learning so feel free to correct me if I'm wrong.

### Step 3: The buttons group

I started by adding the pentagon SVG image on the background of the div that will contain all buttons by using the `background-image` property. I centered everything according to the design using a combination of `margin-inline: auto` and `padding-block-start`. Nothing difficult here.

But then I looked further to the design and started wondering how the hell I'm gonna do these colored circles around each possible choice... with the shadows etc.

That's going to be a little challenge for me...

### Step 4: The GODAMN buttons

OK I spent waaaayy too much time on this, I'm sure having the Figma file would have helped the process a lot. Anyway, after playing with stacking `background` properties, trying to use `radial-gradient`and stuff I just used a simple `box-shadow` (with `inset`) and a `::before` pseudo-element to make it happen.

> Don't be fooled sometimes the easiest ways of doing things take a lot of time to figure out!

I heavily used CSS variables to make the thing more robust to change: for example, if you want to change the thickness of the colored border of the buttons for example, you just have to change one value `--thickness`.

I manually adjusted all icons to fit the design perfectly. I did this using Google Chrome Sources tab with workspaces folders feature which speeds up the process a lot by saving immediately to the file all your changes in the Chrome editor. I did tweet about this trick recently: [Tweet with video](https://x.com/JeremyMouzin/status/1857407654181707779).

### Step 5: The rule button

No difficulty here to make and place the button.

## Author

- My JavaScript Course website - [JavaScript de Zéro](https://www.javascriptdezero.com)
- Frontend Mentor - [@jeremymouzin](https://www.frontendmentor.io/profile/jeremymouzin)
- Twitter - [@jeremymouzin](https://twitter.com/jeremymouzin)
