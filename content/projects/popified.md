---
title: "Popified Networks"
listTitle: "Popified Networks, Collaboration Network Visualizer"
permalink: /project4.html
order: 1
year: 2026
category: "Product Design / Full Stack"
summary: "An interactive map of which artists have made songs together, built from a Spotify playlist. I built nine playlist graphs ahead of time covering 1,649 unique artists, so anyone can explore it without logging in."
subtitle: "A Spotify playlist becomes a visual map of real, credited collaborations. Every connection links back to the actual tracks, and every discovery is one click from playing."
labels:
  - "Product Design"
  - "D3.js"
  - "Flask"
  - "Spotify API"
cover:
  src: images/featurenet/popified-hero.jpg
  alt: "Popified Networks fullscreen view of the EDM Hits collaboration network showing hundreds of artist nodes and the connections between them on a dark background"
thumb: popified
regions:
  programming: 0.9
  uiux: 0.7
related:
  - musicsurf
meta:
  - label: "Role"
    value: "Solo, product design, UX, front end and back end"
  - label: "Built"
    value: "Concept 2019, prototypes 2020 and 2023, rebuilt 2026"
  - label: "Type"
    value: "Personal project"
  - label: "Tools"
    value: "Python, Flask, D3.js, Spotify API"
links:
  - label: "View Live Demo"
    url: "https://riyadhossain1998.github.io/Spotified"
    style: primary
  - label: "View Source"
    url: "https://github.com/riyadhossain1998/Spotified"
    style: ghost
---

## The short version

Popified Networks turns a Spotify playlist into a map of which artists have made songs together. I designed and built it alone in Python, Flask, D3.js and the Spotify API.

Underneath the music it's a general structure: take a set of entities, derive their connections from the events they share, and make the resulting shape explorable and provable. Here the entities are artists and the shared events are songs. Two artists credited on the same track become a connection; artists who have recorded together repeatedly become a thick one. The same pattern fits authors and papers, actors and films, companies and contracts, or contributors and repositories. Any domain where the relationships already sit in the records but nobody has assembled them into something you can look at.

Music was a deliberate choice for the first test domain. The data is public, and the relationships are dense enough to make a graph worth looking at.

Spotify caps apps in Development Mode at five users, so I precomputed nine playlist graphs and serve them as static JSON: 1,649 unique artists and 3,540 unique connections, explorable without an account.

I shared it with friends for five days as a smoke test: 59 page views, 96 artist clicks, 21 song clicks, 6 Spotify opens. The drop off from artist clicks to song clicks is what I'd look at next, though a sample this small and friendly can't tell me why.

## Where It Started

The idea goes back to 2019, and I kept returning to it as my skills caught up with it.

**Fall 2019: MusicSurf.** MusicSurf was a four person team project in CPSC 481, my Human Computer Interaction course at the University of Calgary. We ran a full UX process together, including user interviews, paper prototypes, and a high fidelity Adobe XD prototype. I led the interaction design for the Now Playing screen and contributed screens and interactions to the node graph menu. The sketches below are mine. It organized songs by mood, genre and emotion into a network structure instead of playlists, and that's where the nodes and connections model came from.

![MusicSurf hand sketch of the node graph menu concept, 2019](images/musicsurf/graphmenu_sketch.jpg "MusicSurf, original sketch of the node graph menu, 2019.")
![MusicSurf low fidelity wireframe showing the music library as a connected node graph](images/musicsurf/graphmenu_lowfi.jpg "MusicSurf, library as a connected node graph, low fidelity wireframe. This is the same structural idea as Popified Networks.")

![MusicSurf high fidelity design of the Library screen](images/musicsurf/library_hifi.jpg "MusicSurf, Library screen, high fidelity")
![MusicSurf high fidelity Now Playing screen with radial player and genre tag labels](images/musicsurf/np.jpg "MusicSurf, Now Playing screen, high fidelity")

**Spring 2020: Exploring the Spotify API.** Not a proper project, more casual tinkering on evenings and weekends. I wanted to know whether collaboration credits could be pulled from the API. They could. The earliest sketches already had shared song counts on the connections and the track list behind each one, and both ideas still anchor the product today.

![Features Visualizer earliest concept showing plain circles labelled Eminem, Jay-Z, Drake and Lil Wayne with shared song counts on each edge](images/featurenet/prototype-graph.png "&quot;Features Visualizer&quot;, the earliest concept. Plain circles as nodes, with the shared song counts already there.")
![Features Visualizer modal showing Eminem and Lil Wayne songs including No Love, Drop The World and Forever with release years](images/featurenet/prototype-feature-data.png "The track list behind the Eminem and Lil Wayne connection.")

**2023: First working web build.** I assembled the pieces into a Flask app running locally. Artist photographs replaced the plain circles as nodes, and that's the point where it started to feel like a product. Then I set it aside again.

![2023 build showing Eminem, Lil Wayne and Drake as circular artist photo nodes connected by edges on a dark background](images/featurenet/react-graph.jpg "2023, artist photos replacing plain circles as nodes.")
![Local prototype at 127.0.0.1:5000 showing Lil Uzi Vert's collaboration network with artist photo nodes and browser toolbar visible](images/featurenet/working-prototype.jpg "Running locally at 127.0.0.1:5000, Lil Uzi Vert's network with photo nodes. The browser toolbar is visible because this was still a local prototype.")

**2026: The current product.** A focused rebuild: a structured Flask app, a D3.js front end, the nine precomputed graphs, and a lightweight analytics setup so I could see whether anyone used it. It's the 2019 concept, executed properly against a live API.

## The Problem

A playlist is a vertical list, and a list can only communicate order. It can't show relationship. Two artists can sit 40 rows apart, have made six songs together, and nothing in the interface will ever surface that.

Every connection in this graph represents actual work. A session, a deadline, a budget, somebody's decision to put two names on one recording. An artist who has built up 15 collaborators over a decade did not do that passively. Rendered as a vertical playlist, that effort is invisible. Rendered as a graph, it looks like what it is.

That's the argument for this project. The record of who worked with whom already exists as credits on individual tracks, and that data is accurate and complete. It's just structurally invisible, so the question gets answered by memory or a manual discography trawl. Putting the credits into a shape you can look at is a way of seeing an industry's collaborative labour that didn't previously exist.

What got me started was one conversation. A friend who releases music described tracing his own collaborative history by scrolling his discography one release at a time, because there was no other way to do it. That's why I built this. It's also one conversation, so I'd call it motivation rather than evidence.

I can imagine this being useful to people who work with catalogues professionally, labels, managers, a music journalist tracing an artist's lineage. But that stayed a hypothesis. I don't have access to that circle and I never tested it with them.

## The Constraints I Had to Work Around

Getting from "the collaboration data technically exists" to "someone can open a link and explore it" meant working around hard platform limits. Each one shaped a design decision.

- **Spotify apps are capped at five users in Development Mode.** My response was to precompute all nine graphs so the product delivers real value without an account. I go into why the cap can't be lifted under "Why There's No Login Wall" below.
- **Spotify has no "who has this artist worked with" endpoint.** The core question the product answers can't be asked directly. My response was to derive it: walk every track in a playlist, extract the credited artists, and build edges from shared track credits.
- **Genre data is only exposed at the artist level, not per track**, so grouping a diverse playlist by artist genre collapsed it into around three buckets and made a shipped feature useless. I removed it, and explain that below.
- **Rate limits and batch size caps** on metadata lookups caused naive fetching to fail on larger catalogues. My response was to batch requests, add retry logic with backoff, and cache the results.

The reframe that made everything possible was treating any playlist as the unit of analysis, instead of asking Spotify for a collaboration graph it can't produce. A full discography, a label roster, a whole scene, any of those can be expressed as a playlist and therefore graphed. The limitation became the interface.

One precision worth stating plainly. Every connection in this graph is a **performing** credit: two artists credited on the same track, either as the primary artist or as a feature. Production and songwriting credits are not in the graph at all. Those are real collaborations, often the ones that shaped a record most, but Spotify's API doesn't expose them, so they can't be derived from this source. A producer with credits across a whole era of records is invisible here unless they also performed on something. That's a genuine limit on what this graph can claim to show, not a detail.

## How It Compares to What Else Exists

The music discovery landscape splits into two kinds of data. Credit data is a fact: these two names appear on this recording. Similarity data is an inference: these two names sound or feel adjacent. The first can't be derived from the second, and that distinction decides whether a product could ever answer the question this one is asking.

MusicBrainz and Discogs do hold collaboration data, and MusicBrainz models it as a first class relationship type. They also hold the production and songwriting credits Spotify doesn't expose, so what they can count as a collaboration is wider than what I can derive. But both present it as hyperlinked text, navigated one hop at a time. The data exists. What nobody has done is join it to a visual structure where the shape itself is the information.

Spotify was the right choice for three practical reasons. First, it returns artist photographs in the same API response as the credit data, which is the only reason using artist photos as nodes works at all. Second, it offers playback, so discovery can end in listening rather than a dead end. Third, batch endpoints can resolve hundreds of artists in a handful of requests.

Something else I relied on has since expired. Until February 2026, the Spotify API would return the contents of any public playlist by ID, which made the "any playlist becomes the dataset" design possible. Spotify's changelog states that playlists owned by other accounts now return metadata only, not contents. When I hit the endpoint my app relied on, it came back 403. Either way, the app can't graph someone else's playlist any more. Logged in, you can still graph any playlist in your own library, including a copy of someone else's, and that path works fine. But login is capped at five users, so essentially every visitor sees the precomputed graphs instead. The original decision was correct when I made it. The platform changed underneath it.

## Why There's No Login Wall

Spotify caps apps in Development Mode at five manually approved users. Lifting that cap requires Extended Quota, which needs a registered business entity and at least 250k monthly active users. Since May 2025 extended access has been reserved for established, scalable services, which in practice rules out an individual developer. A product that required login to start would have been usable by five people on earth. So login couldn't be the front door.

Nine playlists are built offline in advance by a Python script and published as static JSON. A visitor lands on the EDM Hits default, a 369-artist graph with 527 connections, with no account, no redirect and no quota. Login is available for the few who qualify, but it's a bonus rather than a requirement.

<figure class="project-figure reveal">
  <svg class="diagram-svg" viewBox="0 0 300 480" role="img" aria-labelledby="pipeline-title pipeline-desc">
    <title id="pipeline-title">How a Spotify playlist becomes a graph</title>
    <desc id="pipeline-desc">A five step flow running top to bottom. One, a Spotify playlist. Two, a script reads every track and extracts the credited artists. Three, artists become nodes and shared tracks become connections. Four, nine graphs are saved as data files. Five, the browser renders the graph with D3. A branch on the right lets you log in and graph your own playlist instead, joining the flow at the render step. Event analytics hangs off the browser as a side branch.</desc>
    <rect class="d-box" x="8" y="10" width="284" height="40" rx="8"/>
    <text class="d-label" x="150" y="35" text-anchor="middle">Spotify playlist</text>
    <line class="d-line" x1="150" y1="50" x2="150" y2="66"/>
    <polygon class="d-head" points="145,66 155,66 150,72"/>
    <rect class="d-box" x="8" y="74" width="284" height="56" rx="8"/>
    <text class="d-label" x="150" y="98" text-anchor="middle">Script reads every track and</text>
    <text class="d-label" x="150" y="116" text-anchor="middle">extracts the credited artists</text>
    <line class="d-line" x1="150" y1="130" x2="150" y2="146"/>
    <polygon class="d-head" points="145,146 155,146 150,152"/>
    <rect class="d-box" x="8" y="154" width="284" height="56" rx="8"/>
    <text class="d-label" x="150" y="178" text-anchor="middle">Artists become nodes, shared</text>
    <text class="d-label" x="150" y="196" text-anchor="middle">tracks become connections</text>
    <line class="d-line" x1="150" y1="210" x2="150" y2="226"/>
    <polygon class="d-head" points="145,226 155,226 150,232"/>
    <rect class="d-box" x="8" y="234" width="284" height="40" rx="8"/>
    <text class="d-label" x="150" y="259" text-anchor="middle">Nine graphs saved as data files</text>
    <line class="d-line" x1="150" y1="274" x2="150" y2="358"/>
    <polygon class="d-head" points="145,358 155,358 150,364"/>
    <rect class="d-branch" x="176" y="288" width="116" height="64" rx="8"/>
    <text class="d-sub" x="234" y="310" text-anchor="middle">Or log in and</text>
    <text class="d-sub" x="234" y="326" text-anchor="middle">graph your own</text>
    <text class="d-sub" x="234" y="342" text-anchor="middle">playlist</text>
    <line class="d-dash" x1="176" y1="320" x2="150" y2="320"/>
    <rect class="d-box" x="8" y="366" width="284" height="40" rx="8"/>
    <text class="d-label" x="150" y="391" text-anchor="middle">Browser renders the graph with D3</text>
    <line class="d-dash" x1="221" y1="406" x2="221" y2="424"/>
    <polygon class="d-head" points="216,424 226,424 221,430"/>
    <rect class="d-branch" x="150" y="432" width="142" height="36" rx="8"/>
    <text class="d-sub" x="221" y="455" text-anchor="middle">Event analytics</text>
  </svg>
  <figcaption>How a playlist becomes a graph. The dashed branches are optional: logging in to graph your own playlist, and the event analytics fired by the browser.</figcaption>
</figure>

The nine graphs as published:

<div class="data-table-wrap reveal">
  <table class="data-table">
    <thead>
      <tr>
        <th scope="col">Playlist</th>
        <th scope="col">Artists</th>
        <th scope="col">Connections</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">Lil Wayne</th><td>484</td><td>1,001</td></tr>
      <tr><th scope="row">EDM Hits <span class="data-table-note">default</span></th><td>369</td><td>527</td></tr>
      <tr><th scope="row">2010&ndash;2015 Billboard Hits</th><td>339</td><td>304</td></tr>
      <tr><th scope="row">Pitbull</th><td>305</td><td>778</td></tr>
      <tr><th scope="row">2016&ndash;2020 Billboard Hits</th><td>293</td><td>310</td></tr>
      <tr><th scope="row">Eminem</th><td>192</td><td>386</td></tr>
      <tr><th scope="row">Drake</th><td>170</td><td>291</td></tr>
      <tr><th scope="row">The Weeknd</th><td>116</td><td>165</td></tr>
      <tr><th scope="row">Taylor Swift</th><td>54</td><td>59</td></tr>
    </tbody>
    <tfoot>
      <tr><th scope="row">Unique across all nine</th><td>1,649</td><td>3,540</td></tr>
    </tfoot>
  </table>
</div>

Counted from the published graph payloads and cross-checked against the app's own interface. The nine lists sum to 2,322 artist entries and 3,821 connections; removing the artists and pairs that appear on more than one playlist leaves 1,649 unique artists and 3,540 unique connections.

![Popified Networks showing Taylor Swift's network with the playlist picker row listing EDM Hits, 2016-2020, 2010-2015, Taylor Swift, The Weeknd, Drake, Lil Wayne, Eminem and Pitbull](images/featurenet/current-webpage.jpg "Nine playlists built ahead of time, switchable with one click. No sign in required.")

## Designing the Graph

The central visual decision was to use the artist's photograph as the node, because faces are much faster to process than names. Node size encodes song count on the playlist. Connection thickness encodes shared song count, so a thicker line signals a denser collaboration. A green ring marks the main artist on discography playlists, which gives an anchor point before anything is clicked.

I chose a dark palette because the graph's content is artist photography, up to 484 simultaneous images on the largest graph, and a dark canvas lets the photos carry the colour while the interface recedes. The design system lives as CSS custom properties, and a build script copies the app's real CSS into the published static demo so both front ends share one source and can't drift apart.

![Popified Networks showing Justin Bieber selected in the 2010-2015 Billboard Hits network, connections highlighted green, song list panel open with 8 tracks including Baby and Beauty And A Beat](images/featurenet/popified-justin.jpg "Justin Bieber selected in the 2010-2015 Billboard Hits graph, 8 collaborators highlighted and the full track list in the panel.")

## Accessibility, Honestly

I close the MusicSurf case study by naming colour accessibility as that project's main weakness, because an emotional encoding built out of hue only works if everyone can read the hue. Seven years later I shipped a graph where selection state is a green ring and green connections and nothing else. I made a version of the same mistake I had already written down. That's the most useful thing I can say about accessibility here.

Two things are genuinely right, though I'd be overclaiming if I called them deliberate. Node size and connection thickness are non-colour channels, so the two most important quantities in the graph survive even if colour doesn't reach the viewer. I built redundant visual encoding without framing it that way at the time.

The rest is a list of things that are wrong, each with the fix I'd apply:

- **Selection is carried by hue alone.** Clicking an artist draws a green ring and turns their connections green. There is no second channel. The fix is stroke weight on the selected node and its connections, or dimming everything unconnected so that selection reads as contrast rather than colour. Either one survives a viewer who can't separate that green from the artwork behind it.
- **A force directed SVG graph is effectively invisible to a screen reader.** I never built a text alternative for it, so the entire product is unusable without sight. The fix is a text alternative generated from the same JSON the graph already loads: a table of artist, collaborators, and the tracks they share. That's cheap, because the data is already in the right shape, which makes not having built it harder to defend rather than easier.
- **There is no keyboard navigation between nodes.** The graph is mouse and touch only. Arrow key traversal between connected artists would suit the structure, and shipping the table view would also solve it by giving keyboard users a complete path through the same data.
- **The force simulation animates on load with no *prefers-reduced-motion* handling.** Nodes fly into position every time a graph opens, and I never wrote the media query that would let a system level setting turn that off.
- **Mobile tap targets may be too small.** Node size varies with song count, so the smallest nodes on a dense graph likely fall below the 44 by 44 pixel minimum. I haven't measured it, so I'm flagging it as probable rather than confirmed.

None of these fixes are implemented. Writing the list is not the same as shipping it, and the distance between identifying this problem in one project and repeating it in the next is the part of this case study I'd most expect to be asked about.

## What the Data Showed

This was a smoke test, not a study. I sent the link to friends to confirm the instrumentation was recording and to see whether anyone clicked anything without being told to. Over five days it recorded 59 page views, 96 artist clicks, 21 song clicks and 6 Spotify opens.

That works out to 1.6 artist clicks per page view, 22% of artist clicks leading to a song click, and 29% of song clicks leading to playback.

The limits are worth stating plainly. The sample is tiny, the audience was warm and wanted the project to work, these are event counts rather than unique sessions, and I didn't record a mobile versus desktop split. My first explanation was mobile: a tap landing off screen. My own CSS ruled that out. At phone widths the panel is a bottom sheet pinned over the canvas and the page is locked to viewport height, so it's on screen by design the moment anything is selected. I don't have an explanation for the drop off. Six playback events can't support one. To conclude anything I'd need moderated sessions plus a few hundred unprompted ones from people who don't know me.

![Popified Networks on a phone showing the Taylor Swift graph as it loads, playlist picker row above with Taylor Swift selected, a header reading 54 artists, 59 connections and 412 tracks, artist photo nodes radiating from Taylor Swift at the centre, and the How to read this graph legend below the graph](images/featurenet/popified-mobile-graph.png "The default mobile view: playlist picker, counts, graph, legend. This is the whole screen before anything is tapped.")
![Popified Networks on a phone with David Guetta selected in the EDM Hits graph, his connections highlighted green across the upper half of the screen and the detail panel filling the lower half, reading 28.6M followers, 41 collaborators, main artist, above a list of 24 songs beginning with Where Them Girls At, Hey Mama and Sweat that runs past the bottom edge](images/featurenet/popified-mobile-selected.png "David Guetta tapped in the EDM Hits graph. The panel opens as a bottom sheet pinned over the canvas rather than stacking beneath it.")

## Killing a Feature That Worked

I wanted to add a genre mode: the same graph, but with nodes clustered by genre instead of by a force directed layout. Spotify's genre data kept coming back blank at the track level. The workaround was to pull genre from the artist instead, which introduced a different problem. Artists pivot. Drake has made house music. Grouping a diverse playlist by artist genre collapsed everything into around three broad buckets, which made the visual unreadable and the clustering meaningless. This wasn't a platform change I got caught out by. Spotify's genre data has always been shaped this way, so the limitation was permanent, which made this a decision rather than a delay.

I removed it. Based on my competitive analysis, per track genre data does exist elsewhere, MusicBrainz and Discogs both hold it, and getting it from one of those platforms is the path I'd take if I revisited this. The feature isn't impossible. It just can't be built on top of what Spotify exposes today. Removing something that runs but delivers nothing is a harder call than removing something that's broken, and it's the decision in this project I'd most want to talk through.

## Where This Goes

Music was a forgiving first domain precisely because I already knew most of the answers. That made it easy to spot when the graph was wrong, and it makes music a weak test of the idea. What I want to do next is extend this into a general relationship mapping tool and run it against a domain where the answer isn't already in my head.

Two things I'd change if I started over. I'd run five moderated usability sessions before touching any code, and I'd make it clearer from the first interaction that the connections are clickable, because the most interesting content in the product lives there and nothing in the current UI makes that obvious.

One more thing worth saying plainly. All the behavioural data I have came from 59 page views of people I know. Finding out whether people who work with catalogues professionally see what I see in this is the first thing I'd do next.

## References

Sources for the Spotify platform claims made above. All links verified 25 September 2026.

- **Development Mode is capped at 5 users.** Spotify for Developers, "Quota modes": "Up to 5 authenticated Spotify users can use an app that is in development mode." [developer.spotify.com/documentation/web-api/concepts/quota-modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes)
- **Extended Quota requires a registered business entity and at least 250k MAU.** Spotify for Developers, "Quota modes", which lists "Established Business Entity (legally registered business or organisation)" and "Maintaining a minimum of active users (at least 250k MAUs)" among its requirements. [developer.spotify.com/documentation/web-api/concepts/quota-modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes)
- **Extended access narrowed in May 2025.** Spotify for Developers blog, "Updating the Criteria for Web API Extended Access", posted 15 April 2025: "Starting May 15, 2025, extended Web API access will be reserved for apps with established, scalable, and impactful use cases." The post doesn't mention individual developers explicitly. That an individual can't realistically qualify is my own reading of the eligibility criteria on the quota modes page above, which require an established business entity. [developer.spotify.com/blog/2025-04-15-updating-the-criteria-for-web-api-extended-access](https://developer.spotify.com/blog/2025-04-15-updating-the-criteria-for-web-api-extended-access)
- **Playlists owned by other accounts stopped returning their contents in February 2026.** Spotify for Developers, "Web API Changelog — February 2026": the API "will only return an *items* object for the user's playlist, other playlists will only provide metadata (not the contents of the playlist) in the response." The changelog documents the policy; the 403 described above is my own observation against the endpoint this app relied on. [developer.spotify.com/documentation/web-api/references/changes/february-2026](https://developer.spotify.com/documentation/web-api/references/changes/february-2026)

The nine source playlists, all public on Spotify. Artist and connection counts for each are in the table above.

- Lil Wayne — [open.spotify.com/playlist/0v9px6Cs3zoFa8tFXJBE5z](https://open.spotify.com/playlist/0v9px6Cs3zoFa8tFXJBE5z)
- EDM Hits — [open.spotify.com/playlist/7MKnQHlRCz4PuvPswuTrRG](https://open.spotify.com/playlist/7MKnQHlRCz4PuvPswuTrRG)
- 2010–2015 Billboard Hits — [open.spotify.com/playlist/4GoxCryYMMDApadgKn0Y2k](https://open.spotify.com/playlist/4GoxCryYMMDApadgKn0Y2k)
- Pitbull — [open.spotify.com/playlist/189ho85sqkpAxJqCRt0tHx](https://open.spotify.com/playlist/189ho85sqkpAxJqCRt0tHx)
- 2016–2020 Billboard Hits — [open.spotify.com/playlist/3h66uGHxm1TlW2BRo4NfDC](https://open.spotify.com/playlist/3h66uGHxm1TlW2BRo4NfDC)
- Eminem — [open.spotify.com/playlist/6nhhC3GZ0OkZnejAaAupDE](https://open.spotify.com/playlist/6nhhC3GZ0OkZnejAaAupDE)
- Drake — [open.spotify.com/playlist/0YojRN4lZwHnCtukJsX33H](https://open.spotify.com/playlist/0YojRN4lZwHnCtukJsX33H)
- The Weeknd — [open.spotify.com/playlist/46LUnqZwMf4BpDDEc1dMcu](https://open.spotify.com/playlist/46LUnqZwMf4BpDDEc1dMcu)
- Taylor Swift — [open.spotify.com/playlist/0eV9RgyyvSFjhCbhWCU5G6](https://open.spotify.com/playlist/0eV9RgyyvSFjhCbhWCU5G6)
