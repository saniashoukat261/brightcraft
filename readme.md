# BrightCraft Digital – Interactive Business Website

A fully responsive, multi-page business website for a small web design and digital marketing agency.

Built for the **DEVIXO Solutions Internship – Task 02 (Interactive Business Website)**.

**Author:** Sania Shoukat

---

## Technologies

- **HTML5** – semantic, multi-page structure
- **CSS3** – custom properties (CSS variables), Flexbox, Grid, gradients, keyframe animations, media queries
- **JavaScript (Vanilla)** – no libraries or frameworks

---

## Pages

| Page | File | What it contains |
|------|------|------------------|
| Home | `index.html` | Hero with typing animation, animated counters, featured projects, why choose us, testimonials slider, about strip, how we work, call-to-action |
| About | `about.html` | Our story, values, team grid with member details, journey timeline |
| Services | `services.html` | Instant project estimate calculator, service cards with a "View Details" pop-up, simple process |
| Portfolio | `portfolio.html` | Project cards with category filter |
| Contact | `contact.html` | Contact form with validation, contact details, FAQ accordion |

---

## JavaScript Features

**Task requirements**

1. **Responsive navigation menu** – hamburger menu on small screens, closes when a link is clicked
2. **Dark mode** – toggle button; the choice is saved in `localStorage`
3. **FAQ accordion** – one answer open at a time (Contact page)
4. **Form validation** – name, email, subject and message checked with inline error messages (Contact page)
5. **Scroll-to-top button** – appears after scrolling down
6. **Animated counters** – numbers count up when the stats section scrolls into view (Home page)
7. **Typing animation** – rotating headline in the hero (Home page)
8. **Slider** – auto-playing testimonials slider with arrows and dots (Home page)

**Extra features**

- Service details pop-up – click "View Details" on a service card to see what is included, the price and the delivery time (Services page)
- Instant project estimate calculator with live price, delivery time and breakdown (Services page)
- Team member details pop-up (About page)
- Portfolio filter buttons (Portfolio page)
- Scroll-reveal and hover animations on the "How We Work", "Our Values" and "Our Simple Process" sections

---

## Task 02 Requirements Checklist

| Requirement | Status |
|-------------|--------|
| Pages: Home, About, Services, Portfolio, Contact | Done |
| HTML5, CSS3, vanilla JavaScript | Done (no libraries) |
| At least 6 interactive JavaScript features | Done (7 of the 8 listed, plus extras) |
| Responsive design | Done |
| Modern UI/UX | Done |
| Consistent color scheme | Done (one gradient theme, light and dark mode) |
| Organized folder structure | Done (`css/`, `js/`, `images/`) |

---

## Design

- **Color scheme:** purple-to-pink gradient theme
  - Violet `#7C3AED`, magenta `#C026D3`, pink `#F472B6`
  - Light mode background `#FDF7FF`
  - Dark mode background `#1E1033`, cards `#2D1B4E`
- **Fonts:** Poppins (headings) and Open Sans (body), loaded from Google Fonts
- **Responsive:** layouts adapt for desktop, tablet and mobile using media queries
- **Accessibility:**
  - Labelled buttons and `aria-expanded` on the menu and FAQ buttons
  - Service cards can be opened with the keyboard (Tab, then Enter)
  - Pop-up windows close with the × button, by clicking outside, or with the Esc key
  - Animations are reduced for users who prefer reduced motion

---

## Folder Structure

```
business site/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── README.md
├── css/
│   └── style.css        # all styling, including the gradient theme and dark mode
├── js/
│   ├── script.js        # shared features used across pages
│   └── home.js          # Home page: testimonials slider and hero typing animation
└── images/
    ├── hero.png
    ├── our-story.jpg
    ├── meher-boutique.png
    ├── spice-route.png
    ├── learnify-tutoring.png
    ├── pulsefit-gym.png
    ├── greenview-realtors.png
    └── roast-and-co.png
```

---

## How to Run

1. Download or clone the project folder.
2. Make sure the `css/`, `js/` and `images/` folders are next to the HTML files.
3. Open `index.html` in any modern browser. No build step or server is needed.

---

## Notes

- All projects shown in the portfolio are sample websites built for practice.
- The contact form validates input in the browser and shows a success message; it does not send email.