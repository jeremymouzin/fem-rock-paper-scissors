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

### Step 6: The rules modal dialog

I used the `dialog` awesomeness (with `::backdrop` pseudo-element!) to build the rules modal easily. I will check accessibility at the very end when all designs (mobile and desktop) will be integrated. I decided to use a flexbox container on the desktop version because I will need it for the mobile version too (I always check mobile and desktop designs to pick up the right structure for both).

### Step 7: Clicking on a choice

I had to do a lot of refactoring in the CSS to decouple properties from the buttons and to make classes that just generate the colored buttons and some others that put the correct image on it.

Also I had to manage toggling content when clicking on a choice to make the hexagon of choices disappears while the fight screen appears.

I didn't want the CSS to be tied to my JavaScript. For example, if the `div.fight` uses a `display: grid`, I don't want to have to write `fight.style.display = 'grid'` in my JavaScript to make it visible. Why?

Because if I change my CSS later (using flexbox for example) I'll have to update my JavaScript code! The CSS would be tied to the JavaScript and I don't like that.

That's why I pull dynamically each display types at the beginning of my script (thanks to `getComputedStyle`) and record them in a dictionary (`Map`). This way I can use later these values to make element appear / disappear properly. I built 2 little helper functions for that `makeAppear` and `makeDisappear`.

Lastly, I used `data-*` attributes to pick the correct CSS class to apply when clicking on a button to make a choice. This way I don't rely on `class` attributes as they're related to styling elements, not storing data in any way.

### Step 8: Make the house pick a choice

I added some JavaScript so that the house can pick up a choice with a quick animation of serveral non consecutive choices it takes before keeping the last one. I'll polish all animations at the very end.

### Step 9: Compute winner and loser

I wrote a bit of JavaScript to compute the winner and added the circles shadows around the winner choice.
I wanted my code to be easy to read so I took the time to write a specific function so that I can write this:

```js
...
 if (choice(userValue).beats(houseValue)) {
  resultLabelValue = 'you win'
 }
...
```

### Step 10: Update score and save it across sessions

JavaScript and localStorage to the rescue!

### Step 11: Responsive design

Making the responsive design was not so difficult as I used the correct layout from the start based on my analysis of desktop and mobile designs versions. I used the `transform: scale()` function to scale down the size of the pentagon with buttons and it works nicely.

## Author

- My JavaScript Course website - [JavaScript de Zéro](https://www.javascriptdezero.com)
- Frontend Mentor - [@jeremymouzin](https://www.frontendmentor.io/profile/jeremymouzin)
- Twitter - [@jeremymouzin](https://twitter.com/jeremymouzin)
