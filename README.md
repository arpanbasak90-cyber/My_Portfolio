# Arpan Basak — Personal Portfolio

<div align="center">

![Portfolio Banner Preview](assets/profile.jpg)

### **SHIP FAST, BREAK LIMITS**

**BTech CSE (Core) [2025–29] • 2X Hackathon Winner • 4X Finalist • Web3 & AI Developer**

[![GitHub](https://img.shields.io/badge/GitHub-arpanbasak90--cyber-181717?style=for-the-badge&logo=github)](https://github.com/arpanbasak90-cyber)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Arpan_Basak-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/arpan-basak-075892368)
[![X (Twitter)](https://img.shields.io/badge/X-ArpanBasak2006-000000?style=for-the-badge&logo=x)](https://x.com/ArpanBasak2006)
[![Email](https://img.shields.io/badge/Email-arpanbasak901%40gmail.com-D14836?style=for-the-badge&logo=gmail)](mailto:arpanbasak901@gmail.com)

</div>

---

## 🌟 About The Portfolio

A modern, highly aesthetic, fully responsive, and **data-decoupled** personal portfolio website built with a refined **Muted Champagne Gold & Deep Bottle Green** design system.

### Key Highlights
- **Single-File Editability**: ALL personal details (bio, skills, projects, achievements, links) live in [`js/data.js`](js/data.js). Update your site instantly by editing that one file without touching HTML/CSS.
- **Tailored Aesthetics**: Muted champagne-gold palette (`#F4EFE6`) paired with deep charcoal typography (`#1F1B16`) and deep bottle green (`#1B4332`) accents.
- **Optimized Achievement Showcase**: Custom horizontal highlight cards engineered specifically for 2–4 achievements so the layout feels complete and well-spaced.
- **Zero Heavy Dependencies**: Built with vanilla HTML5, CSS3, and JavaScript — lightning-fast load times and zero build setup required.

---

## 🚀 Tech Stack

- **Core**: HTML5, JavaScript (ES6+ Data Rendering)
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, Grid, Media Queries)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **Icons**: Clean inline SVG Vectors

---

## 📁 Repository Architecture

```text
My_Portfolio/
├── index.html            # Main markup & section containers
├── css/
│   └── styles.css        # Color tokens, typography, component styles & media queries
├── js/
│   ├── data.js           # ⚡ SINGLE EDITABLE DATA FILE (Bio, Skills, Projects, Achievements)
│   └── main.js           # Dynamic JavaScript DOM renderer & interactions
├── assets/
│   └── profile.jpg       # Profile image
└── README.md             # Project documentation
```

---

## ⚙️ How to Update Your Personal Content

All content is loaded dynamically from [`js/data.js`](js/data.js).

To update your portfolio:
1. Open `js/data.js`.
2. Edit the relevant field (e.g. `personal`, `about`, `skills`, `projects`, `achievements`).
3. Save the file and refresh your browser!

### Adding a New Project Example (`js/data.js`)
```javascript
{
  id: "new-project",
  title: "My Amazing Project",
  description: "Short summary of what the project does...",
  technologies: ["React", "Soroban", "TypeScript"],
  githubUrl: "https://github.com/arpanbasak90-cyber/my-repo",
  liveUrl: "https://my-demo.vercel.app",
  featured: true
}
```

---

## 💻 Local Development

Clone the repo and start a simple static web server:

```bash
# Clone repository
git clone https://github.com/arpanbasak90-cyber/My_Portfolio.git

# Navigate into directory
cd My_Portfolio

# Start a local server (Python example)
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 🌐 Deploy to Vercel

```bash
npx vercel
```

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/arpanbasak90-cyber">Arpan Basak</a></sub>
</div>
