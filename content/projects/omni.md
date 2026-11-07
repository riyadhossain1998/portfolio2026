---
title: "Omni, Order Management Redesign"
pageTitle: "Omni | Riyad Hossain"
listTitle: "Omni, Order Management Redesign"
permalink: /project2.html
order: 3
year: 2022
category: "UX Design / UX Research"
summary: "Identifying and solving real world pain points in a retail fulfilment system. Grounded in first hand experience, this redesign prioritized efficiency, clarity, and ease of adoption for frontline employees."
subtitle: "I used this tool every shift at BuyBuy Baby for months. By the time I sat down to redesign it, I already knew exactly what was broken and why."
labels:
  - "UX Design"
  - "UX Writing"
  - "Figma"
  - "UX Research"
cover:
  src: images/oms/distribution.png
  alt: "Omni redesigned distribution screen showing order items, shelf locations and status indicators"
thumb: omni
regions:
  uiux: 1.0
related: []
meta:
  - label: "Role"
    value: "UX Design, Research & Writing"
  - label: "Timeline"
    value: "Nov to Dec 2022"
  - label: "Context"
    value: "Personal Project"
  - label: "Tools"
    value: "Figma"
links:
  - label: "View Figma Prototype"
    url: "https://www.figma.com/proto/JqpwI8pwnJbz3soo7jZLRB/Omni-V3?node-id=7-30&starting-point-node-id=7%3A30"
    style: primary
  - label: "View Documentation"
    url: "https://docs.google.com/document/d/1stKvlE_hEpRjjQwAVDRXpUSw4QFUAgt26g5kU6eHwU0/edit?usp=sharing"
    style: ghost
---

## The Problem

I worked as a Fulfilment Associate at BuyBuy Baby and used a tool called Omni every single shift. After a few months of that I started noticing the same friction points coming up over and over, for me and for my coworkers: shelf location data that was buried and inconsistent, order information spread across multiple screens, confirmation steps in the packing workflow that added no value, a visual design that was dense and low contrast, and no clear entry point for new employees trying to learn the system.

The tool got the job done, but it worked against you rather than with you. In retail, where speed and accuracy directly affect the customer standing at the counter, a poorly designed tool isn't just frustrating, it's a risk.

## Research & Discovery

My research advantage here was unusual: I was the user. I didn't need to recruit participants or run formal sessions because I was already living inside the problem every shift. Over several months I kept informal notes on where things slowed down, where I made errors, and where I caught myself doing unnecessary work. I also talked to coworkers regularly, which mattered just as much. Their frustrations overlapped with mine in some areas and diverged in others, and the points where we consistently agreed were the ones I treated as the real signal.

Five themes came out of that process:

- Finding where an item lived on the shelf required too many steps, and the location data itself was sometimes missing or wrong
- A single order's information was fragmented across multiple screens, so you were constantly navigating back and forth to get a complete picture
- The packing workflow included confirmation prompts that served no purpose and added friction to a task associates were doing dozens of times a shift
- There was no intuitive starting point, which made the onboarding experience for new employees much harder than it needed to be
- The overall visual design was too dense and lacked contrast, which made it slow to scan quickly under pressure

## Sketches & Planning

![Hand drawn user flow diagram mapping the most frequently used features in Omni](images/oms/planning_sketch5.jpg "User flow diagram, most used features")
![Sketch comparing the original Prepare Shipments screen to the proposed redesign side by side](images/oms/prep_shipments_sketch1.jpg "Prepare Shipments, original versus proposed redesign")
![Sketch showing the redesigned picklist layout for the Prepare Shipments flow with annotations](images/oms/prep_shipments_sketch4.jpg "Prepare Shipments, picklist redesign")
![Sketch comparing the original Pack Shipments screen to the proposed redesign side by side](images/oms/pack_shipments_sketch3.jpg "Pack Shipments, original versus proposed redesign")

## Wireframes

![Omni wireframe showing the overall flow from home through to completed orders](images/oms/wireframe1.jpg "Flow overview, wireframe")
![Omni wireframe showing the detail view of an individual order with item list and shelf locations](images/oms/wireframe2.jpg "Order detail view, wireframe")

## Final Design

The redesign focused on three core workflows: Prepare Shipments, Pack Shipments, and Completed Orders. Each one was rebuilt with a cleaner information hierarchy, more contextual data visible at a glance without extra navigation, and a visual language that used the BuyBuy Baby brand colours associates were already familiar with.

![Omni redesigned homepage showing a clear dashboard with order counts and quick access to core workflows](images/oms/home.png "Redesigned homepage")
![Omni redesigned Prepare Shipments screens showing order items with shelf locations visible inline](images/oms/ps12.png "Prepare Shipments, redesigned")

## What I Took Away

Being the user gave me research depth that would have been hard to get any other way. I had months of daily context before I drew a single wireframe. But it also created blind spots. I kept assuming shared knowledge that newer employees didn't have: things that felt obvious to me after months on the floor weren't obvious at all to someone in their first week. It was a reminder to design for the full range of experience levels in a user group, not just the one you happen to be at.

The bigger lesson was about what good retail UX means. When someone is using a tool like this on the floor, their attention should be on the customer in front of them, not on figuring out where to click next. Every extra second spent navigating the interface is a second the customer is waiting. So the measure of success isn't whether the design is beautiful or clever, it's whether associates stop noticing it at all because it works the way they expect.
