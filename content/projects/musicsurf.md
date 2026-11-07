---
title: "MusicSurf"
listTitle: "MusicSurf, Emotion Driven Music Discovery"
permalink: /project1.html
order: 2
year: 2019
category: "UX Research / Interaction Design"
summary: "Designing a new paradigm for music exploration, a network based platform that organizes songs by mood, genre, and emotion rather than playlists. Full process from user interviews to high fidelity prototype."
subtitle: "A full UX research process for a concept app that organized music by mood and emotion instead of playlists, from user interviews through to a high fidelity prototype in Adobe XD."
labels:
  - "UX Research"
  - "Interaction Design"
  - "Adobe XD"
  - "Prototyping"
cover:
  src: images/musicsurf/hero-image-musicsurf.png
  alt: "The MusicSurf wordmark beside a circular mark containing a music note over a waveform, on a gradient that runs from pale blue at the top to deep purple at the bottom, over a faint hexagon pattern."
thumb: musicsurf
regions:
  uiux: 1.0
related:
  - popified
  - salad-bar
meta:
  - label: "Role"
    value: "UX Design & Research"
  - label: "Timeline"
    value: "Sept to Dec 2019"
  - label: "Team"
    value: "Four person team, I led interaction design for the Now Playing screen"
  - label: "Context"
    value: "CPSC 481 · HCI I"
  - label: "Tools"
    value: "Adobe XD, Illustrator"
links:
  - label: "View Live Prototype"
    url: "https://colinauyeung.github.io/CPSC-481--MusicSurf/"
    style: primary
  - label: "View Documentation"
    url: "https://drive.google.com/file/d/1VT-PEbY7ctVZ7pEy-bpumrkTl9xHWFc8/view?usp=sharing"
    style: ghost
---

## The Problem

At the time, mood was something the major platforms handed you in a pre-made playlist, not something you could navigate yourself. Spotify and Apple Music surfaced songs through auto generated playlists and algorithm driven recommendations, with no transparency, no emotional context, and no real sense of exploration. You could listen, but you couldn't browse. The discovery process was happening to you, not with you.

## The Idea

MusicSurf is a concept platform where music discovery feels more like wandering than searching. Instead of playlists and albums, it maps songs spatially in a network graph by mood, speed, energy and genre, so you can follow a path based on how you feel rather than what an algorithm decides you should hear next.

Songs are connected by shared characteristics, and you move through the graph by following whatever draws your attention. The result feels personal because you're the one in control of it.

## Sketches

![Hand sketch of the MusicSurf graph menu with nodes and connecting lines](images/musicsurf/graphmenu_sketch.jpg "Graph menu, early sketch")
![Hand sketch of the MusicSurf Now Playing screen with a circular player layout](images/musicsurf/nowplaying_sketch.jpg "Now Playing, early sketch")
![Hand sketch of the MusicSurf Explore More screen showing connected song nodes](images/musicsurf/exploremore_sketch.jpg "Explore More, early sketch")

## Research & Process

This was a full end to end UX project for my Human Computer Interaction I course at the University of Calgary, from discovery through to prototype:

- Stakeholder analysis and a competitive review of existing music platforms
- End user interviews exploring how people discover and relate to music
- Sketches and paper prototypes to work out the network graph interaction model
- Low fidelity wireframes for all core screens
- High fidelity prototype built in Adobe XD with full interaction flows
- Peer and instructor critique sessions with iterated revisions

## Low Fidelity Wireframes

![MusicSurf low fidelity wireframe of the login screen](images/musicsurf/login_lowfi.jpg "Login page, low fidelity")
![MusicSurf low fidelity wireframe of the music library shown as a node graph](images/musicsurf/graphmenu_lowfi.jpg "Music library as a node graph, low fidelity")
![MusicSurf low fidelity wireframe of the Now Playing screen](images/musicsurf/nowplaying_lowfi.jpg "Now Playing, low fidelity")
![MusicSurf low fidelity wireframe of the Explore More screen](images/musicsurf/explore_lowfi.jpg "Explore More, low fidelity")

## Final Design

The colour palette draws from Spotify's dark theme conventions, and we used a rich colour range within the network graph itself to communicate mood and genre. Warm colours for energetic songs, cooler tones for ambient and melancholic tracks. You could feel the emotional shape of your library just by looking at the graph.

![MusicSurf high fidelity login and register screens on a dark background](images/musicsurf/login_hifi.jpg "Login and register pages, high fidelity")
![MusicSurf high fidelity music library shown as a coloured node graph](images/musicsurf/library_hifi.jpg "Music library, high fidelity")
![MusicSurf high fidelity Now Playing screen with radial player and song details](images/musicsurf/nowplaying_hifi.jpg "Now Playing, high fidelity")
![MusicSurf high fidelity Explore More screen showing related songs as connected nodes](images/musicsurf/explore_hifi.jpg "Explore More, high fidelity")

## What I Took Away

Running the stakeholder and competitive analysis early was the most valuable thing we did. It sharpened the focus of the design quickly and gave the team a clear point of difference to build toward. The structured critique sessions with peers and instructors mattered just as much. Learning to receive specific, direct feedback and use it rather than defend against it is a skill, and this project is where I started developing it.

If I rebuilt this today, I'd spend more time on user testing with real participants, and I'd think harder about accessibility, specifically how colour is used to communicate emotion for people with colour blindness. The emotional encoding only works if everyone can read it. The direction I'd take now is redundant encoding: carrying mood in shape, texture or position alongside hue so the meaning survives if the hue doesn't, or a palette swap mode of the kind video games ship for colour vision deficiency.

For context, this was a four month course and we were students meeting this material for the first time, so accessibility wasn't on our radar. That's the honest explanation rather than a defence. It should have been on the list from the start, and the lesson only landed later, when I built a graph of my own and made a version of the same mistake again.
