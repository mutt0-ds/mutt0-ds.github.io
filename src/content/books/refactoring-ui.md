---
title: Refactoring UI
author: Adam Wathan, Steve Schoger
image: https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1544555766i/43190966.jpg
badges:
- "💻 IT"
score: "⭐️⭐️⭐️⭐️"
finished: '2022-09-12'
summary: Tailwind's patterns will help you create pleasant designs without overcomplicating things
showInHome: false
---

Recommended by Gitbar and very well done, the creators of Tailwind wrote a solid refactoring book focused on the user interface. Reading it soon for my dashboards, and I'll recommend it at work. Site: https://www.refactoringui.com/

Nice, with many design tips I also see in Tailwind. It can be useful for beginners who want to throw together a quick mockup. I'm not convinced it justifies the 70-euro price, though. A good read you can finish in a couple of hours.

# Notes

That's a very nice book by the creators of TailwindCSS, comparing good and bad UI like Fowler's The Art of Refactoring did. It's evident that their dogmas are implemented in Tailwind; many passages felt familiar since I've already applied them in practice.

## Start with a feature, not a layout

- Design mockups with a big Sharpie, avoiding obsessing over details and colors
- Be pessimistic: don't focus on advanced features at first, expect it to be hard to build. If part of a feature is a 'nice-to-have', design it later
- Colors are important: (safe choice, luxury, fun). Border radius: the rounder, the more playful
- Systematize everything in advance (which Tailwind does well): use 6-10 colors and defined font sizes/weights, borders, margins, etc., and stick to your palette without exceptions
## Hierarchy is Everything

Not all elements are equal; they must have hierarchical importance that will impact when, where, and how they are seen by the reader. When everything in the interface is fighting for attention, the result is noisy.

- Don't rely too much on font size (the content may become too big or small). Be flexible and use weights and colors too
- Basic tools for text: three colors (dark primary, grey secondary, lighter grey tertiary) and two weights (400/500 for most text, 600/700 for emphasis)
- No greys on colored backgrounds. Make text closer to the background color if you want it to feel secondary
- Emphasize your focused element by de-emphasizing others instead
- Avoid labels (Bedrooms: 3 → 3 Bedroom; In stock: 12 → 12 left in stock) and emphasize the value, not the label. It depends, though, for example in technical cards
- Style buttons by hierarchy, not semantics. Primary (e.g., Publish) should be obvious, secondary (e.g., Edit) clear but not prominent, tertiary (e.g., Delete) discoverable but unobtrusive. Even destructive actions shouldn't grab more attention; add a confirmation step
### Layout and Spacing

- Give text room to breathe. Start by adding plenty of space, then reduce it, not the other way around
- Don't use linear scales: the difference between 12px and 16px is 33%, while between 500px and 520px it's 4% and rarely noticeable. You need something simple, decided in advance and easily scalable that keeps the same ratio (like Tailwind does)
- Don't fill the whole screen if you don't need to. It's fine to leave empty lateral space if your central element/menu is simple
- Grids are overrated, especially for responsive design. Proportions can become unnatural. It's often better to fix elements like the sidebar and navigation bar and avoid issues when the screen shrinks too much. Don't use percentages unless you really want it to scale
- Relative sizing doesn't scale well: avoid rem for titles; they can scale poorly on mobile
- Avoid ambiguous spacing by adapting spacing to separate different sections (e.g., in form fields, bullets, or headings)
## Designing Text

- Have a rigid font system, not linear but modular (4:5, 2:3, or 1.618), starting at 16px (the browser default). Avoid em; use px or rem
- Fonts: play it safe with a system font stack (apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue;), or pick popular fonts with 10+ weights (or borrow from sites you like)
- Keep line length between 45 and 75 characters (20-35 em) for readability
- A line-height of ~1.5 is fine, but with long paragraphs pushing to 2 can help the eye find the next line, and around 1 for headings often works
- Not every link should be colored; you can enable color on hover if it's not important
- For numbers, left-align them. For the rest, centering is often the best solution, but with long paragraphs or cards, left alignment is fine too
- You shouldn't tweak letter-spacing much, but for headlines it can be effective to slightly increase it
## Working with Color

- Use HSL instead of hex (hex is less intuitive; e.g., #03369E and #507DD7 are a very similar shade of blue). HSL uses Hue (degrees), Saturation (how colorful a color looks), and Lightness (distance between black at 0% and white at 100%)
- Don't confuse HSB with HSL. 100% Brightness is only white when saturation is 0%; if saturation is 100%, then HSB equals HSL with 50% Lightness. Prioritize HSL for browsers
- Use more colors than you think. Palettes are cool, but it's more complicated than that. You need:
- Greys for backgrounds, panels, forms (almost everything in an interface) (up to 10)
- A primary color (5-10 lighter and darker versions)
- An accent color for communicating different things, usually eye-grabbing (5-10)
- Colors for semantic states (red, yellow, green for alerts) (5-10 each, although they are rarely used)
- A good rule of thumb for choosing base colors is to pick something that works well as a button background
- Then pick the lightest and darkest shades of the selected color and compare them with, for example, a simple alert
- Then fill in the gaps by creating all the intermediate shades starting from the previous ones (and do the same with greys)
- Colors have perceived brightness (yellow is brighter than blue at the same lightness). For a yellow palette, for example, instead of lowering the lightness, try slightly rotating the hue (10-20% max) for a warmer effect
- Greys don't have to be grey: adding a bit of saturation can change their vibe
- Don't rely on color alone; you may have colorblind users. Use icons for ambiguous situations and, for charts, use contrast scales instead of different colors
### Creating Depth

- Emulate a light source: mimic light and shadow from reality to make buttons feel raised, and swap light and shadow for a component that should feel like it's 'recessed' into the page. Keep it simple or the interface will look busy. One shadow and one light is often enough
- Use shadows to establish an elevation system: large shadows for modals (covering the background behind them), medium shadows for dropdowns, and small shadows for slightly emphasizing elements like buttons
- Like with colors, create your shadow system by starting with the smallest and largest, then fill in the gaps (five shadows here)
- Two shadows can emulate reality more precisely: a larger one for direct light and a small one for ambient light (which disappears at the highest elevations)
- A very effective way to create depth is to overlap elements to simulate layers. Make an element taller than its parent, overlapping on at least one side
- With many images overlapping, there can be too much noise. Use 'invisible borders' to leave a tiny gap between images
## Working with Images

- Bad photos will ruin everything. Hire a good photographer or use high-quality stock photos
- If you can't match text over a background image (maybe it's too colorful), for example in a hero, add an overlay, reduce contrast, multiply and blend a color, or add a text shadow with a large blur radius
- Don't scale up icons; they will feel too chunky since they aren't designed for 48px+. Instead use 'big versions' or enclose them in a shape. Don't scale them down too much either; use simplified versions if needed
- Don't scale down screenshots in the design. Take them at a smaller screen size (like a tablet layout), crop to a detail, or, if you really need to show the full desktop layout, use a simplified mockup with details removed. Otherwise the result will look confusing
- Beware of user-uploaded content. For example, center uploaded images since they can be different sizes (background-size: cover), or prevent background bleed (user profile background matching the screen background) with subtle shadows or semi-transparent borders
### Finishing Touches

- Supercharge the defaults: add icons instead of bullets, create special styles for links, use custom checkboxes or radio buttons... Add personality
- Short accent borders are a clean way to emphasize selections or decorate elements like a pro
- Decorate the background color: a colorful design adds excitement
- Add simple shapes (low contrast) to the background for a more unique look
- Don't overlook empty states: add alerts and CTAs instead of displaying nothing
- Use fewer borders; box shadows are more subtle. Or use different colors and extra spacing
- Be creative, think outside the box, and reimagine the most boring components
### Leveling up

- Pay attention to what other designers have created and try to learn from new ideas
> By continually studying the work that inspires you with a careful eye, you'll
be picking up design tricks for years to come.