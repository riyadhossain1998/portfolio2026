---
title: "Humming Salad Bar"
listTitle: "Humming Salad Bar, Sound as Interaction"
permalink: /project3.html
order: 4
year: 2021
category: "Interaction Design / Creative Development"
summary: "Designing a playful, wordless interaction where users hum a tune to generate a personalized salad recipe. A creative HCI challenge exploring sound as a non traditional input modality."
subtitle: "A mobile web app where you hum a tune into your microphone and it generates a personalized salad recipe. The brief was to design a unique interaction using sound, with no words allowed."
labels:
  - "Interaction Design"
  - "Creative UX"
  - "HTML/CSS/JS"
  - "Illustrator"
cover:
  src: images/saladtime/hero-image-salad-bar.png
  alt: "Humming Salad Bar preferences screen on a green background with coral stripes, framed by illustrated vegetables. The title is hand lettered with a bee on a dotted flight path. It asks \"Do you have any food preferences?\" with an Omnivore dropdown, checkboxes for Allergic To Nuts and Lactose Intolerant, and a coral Lemme Singgg!!! button."
thumb: salad-bar
regions:
  uiux: 0.7
  programming: 0.6
related:
  - musicsurf
meta:
  - label: "Role"
    value: "Interaction Design, Full Stack"
  - label: "Timeline"
    value: "Feb to Mar 2021"
  - label: "Context"
    value: "CPSC 581 · HCI II"
  - label: "Tools"
    value: "HTML/CSS/JS, Bootstrap, Illustrator"
links:
  - label: "View on GitHub"
    url: "https://github.com/riyadhossain1998/Salad-Time"
    style: primary
---

## Problem Statement

For my Human Computer Interaction II course at the University of Calgary, the problem was to design a novel interaction where sound was the primary input mechanism. The catch was that the sound couldn't be words. No speech recognition, no commands, no language at all. The challenge was to take something as raw and informal as a hum, a tap, a whistle, and turn it into a meaningful interaction that a person could understand and respond to.

I explored a few directions early on, including a cat game controlled by meowing and a rhythm based cricket game, before landing on the one that felt the most genuinely surprising: a salad bar that listens to you hum. It's a bit absurd, and that's exactly why it works.

## The Concept

You open the app, set your dietary preferences, and then hum into your microphone. Based on the characteristics of the hum, pitch, duration and pattern, the app generates a personalized salad bowl recipe. The same song hummed at a different pitch produces a completely different salad, so the interaction rewards curiosity and repeat plays in a way a conventional input never would.

The delight is partly in the absurdity and partly in the fact that it actually works. You feel like your input is doing something real, even if the logic connecting humming to salad ingredients is intentionally playful.

## Sketches

![Hand sketch of a salad bowl generator concept with ingredient labels around the bowl](images/saladtime/salad.jpg "Salad bowl generator concept, early sketch")
![Hand sketch of the overall website layout showing home screen and navigation structure](images/saladtime/saladbar1.jpg "Website layout, early sketch")
![Hand sketch of the recipe information panel showing ingredient list and nutritional details](images/saladtime/saladbar2.jpg "Recipe information panel, early sketch")
![Hand sketch of the humming input screen with a microphone icon and pitch visualizer](images/saladtime/saladbar4.jpg "Humming input screen, early sketch")

## Final Design

I went with a light green palette and hand drawn Illustrator assets. The visual identity had to communicate the tone before anyone read a single word: this is playful, this is a bit weird, and that's intentional. If the design felt too polished or too serious it would have undercut the whole premise.

![Humming Salad Bar homepage with green hand drawn illustration style and a start button](images/saladtime/st-home.jpg "Homepage")
![Food preferences screen with dietary restriction toggles before the humming step](images/saladtime/saladbarss2.png "Food preferences tab")
![Humming countdown screen showing a timer and microphone indicator while the user hums](images/saladtime/saladbarss3.png "Humming countdown")
![Recipe result panel showing the generated salad bowl with a list of ingredients](images/saladtime/saladbarss4.PNG "Recipe result")

## What I Took Away

The biggest tension in this project was between randomness and meaning. Too much randomness and the app feels like a novelty with no reason to come back to. Too little, and the connection between humming and salad feels completely arbitrary. Making the relationship between input and output legible without making it mechanical took real work, because the moment it becomes predictable the surprise is gone.

The broader thing I took away was how much a constraint can open things up. The no words rule pushed me into territory I wouldn't have gone near with an open brief, and the result was far more interesting than any conventional recipe generator I could have designed. I think about that whenever a brief feels restrictive.
