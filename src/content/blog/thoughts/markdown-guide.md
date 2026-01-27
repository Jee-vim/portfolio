---
title: Markdown Kitchen Sink
description: Every Markdown feature you will realistically ever use
date: 2026-01-14
status: DRAFT
tags:
  - markdown
  - astro
  - reference
---

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

Paragraph text. Markdown collapses whitespace.
New lines do not mean new paragraphs unless you leave a blank line.

This **is bold**, this _is italic_, this **_is both_**.
This is ~~strikethrough~~.
This is <u>HTML underline</u> because Markdown never had one.

---

## Line breaks

This line ends with two spaces  
So this is a forced line break.

This is a new paragraph.

---

## Blockquotes

> Single-line quote

> Multi-line quote  
> still part of the same block

> Nested quote
>
> > Inner quote
> >
> > > Inner-inner quote

---

## Lists

### Unordered

- Item one
- Item two
  - Nested item
    - Deeper nesting
- Back to top

### Ordered

1. First
2. Second
   1. Sub-item
   2. Sub-item
3. Third

### Task lists (GFM)

- [x] Write markdown
- [x] Overdo it
- [ ] Touch grass

---

## Links

Inline link:  
[Astro](https://astro.build)

Reference-style link:  
[Astro Docs][astro]

[astro]: https://docs.astro.build

Autolink:  
https://example.com

Email:  
<hello@example.com>

---

## Images

Inline image:

![Alt text](https://astro.build/assets/press/astro-logo-light-gradient.svg)

Image with title:

![Alt text](https://astro.build/assets/press/astro-logo-light-gradient.svg "Optional title")

---

## Code

### Inline code

Use `getCollection("blog")` to load posts.

### TypeScript

```ts
type Status = "PUBLISH" | "DRAFT" | "SCHEDULE";

export function isPublic(status: Status) {
  return status === "PUBLISH";
}
```
