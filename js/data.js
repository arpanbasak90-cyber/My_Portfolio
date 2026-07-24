/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION FILE
 * ====================================================================
 * EDIT ALL YOUR PERSONAL CONTENT IN THIS SINGLE FILE!
 *
 * To add a new Project, Skill, Certificate, or change your Bio:
 * Simply edit the values below and refresh your browser.
 * No HTML or CSS code changes are necessary.
 */

const PORTFOLIO_DATA = {
  // ------------------------------------------------------------------
  // 1. HERO & PERSONAL INFO
  // ------------------------------------------------------------------
  personal: {
    name: "Arpan Basak",
    headline: "SHIP FAST, BREAK LIMITS",
    title: "Generative AI & Full-Stack Web3 Developer",
    location: "Kolkata, West Bengal, India",
    pronouns: "He/Him",
    
    // Path to your profile picture (placed inside the /assets folder)
    profileImage: "assets/profile.jpg",
    
    // Quick summary highlights displayed right in the hero banner
    highlights: [
      "BTech CSE (Core) [2025-29]",
      "2X Hackathon Winner",
      "4X Hackathon Finalist",
      "Soroban / Stellar Web3 Builder"
    ]
  },

  // ------------------------------------------------------------------
  // 2. ABOUT / BIO SECTION
  // ------------------------------------------------------------------
  about: {
    heading: "About Me",
    bio: [
      "Hello! I'm Arpan Basak, a Computer Science & Engineering student (2025–2029) and passionate software developer from Kolkata, India. I specialize in building decentralized Web3 applications, AI-powered healthcare platforms, and rapid full-stack solutions.",
      "As a 2X Hackathon Winner and 4X Finalist, I thrive under deadline pressure and love turning ambitious ideas into functional, shipped products. My primary technical focus spans Stellar & Soroban smart contract development, TypeScript, Next.js/React, and Generative AI integrations."
    ]
  },

  // ------------------------------------------------------------------
  // 3. SKILLS SECTION
  // ------------------------------------------------------------------
  // TO ADD A NEW SKILL CATEGORY OR ITEM:
  // Add a new object inside the array below following the format:
  // { name: "Skill Name", icon: "lucide icon name or emoji" }
  skills: [
    {
      category: "Web3 & Blockchain",
      items: [
        { name: "Stellar / Soroban", icon: "sparkles" },
        { name: "Smart Contracts", icon: "code-2" },
        { name: "Clarity / Soroban SDK", icon: "layers" },
        { name: "NFT Minting Protocols", icon: "coins" }
      ]
    },
    {
      category: "Full-Stack Development",
      items: [
        { name: "React / Next.js", icon: "layout-template" },
        { name: "TypeScript / JavaScript", icon: "file-code" },
        { name: "HTML5 & Modern CSS3", icon: "palette" },
        { name: "Node.js & REST APIs", icon: "server" },
        { name: "TailwindCSS", icon: "wand-2" }
      ]
    },
    {
      category: "AI & HealthTech",
      items: [
        { name: "Generative AI", icon: "cpu" },
        { name: "MediScan AI", icon: "activity" },
        { name: "Python", icon: "terminal" }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git & GitHub", icon: "github" },
        { name: "Vercel Deployment", icon: "globe" },
        { name: "Odoo Framework", icon: "box" },
        { name: "Linux / Bash", icon: "terminal-square" }
      ]
    }
  ],

  // ------------------------------------------------------------------
  // 4. PROJECTS SECTION
  // ------------------------------------------------------------------
  // TO ADD A NEW PROJECT:
  // Copy one of the objects below, paste it at the end of the array,
  // and fill in your project details.
  projects: [
    {
      id: "builder-leaderboard",
      title: "BuilderLeaderboard Platform",
      description: "A dynamic developer leaderboard application designed to track, rank, and showcase hackathon progress, project submissions, and shipping velocity in real-time.",
      technologies: ["React", "TypeScript", "TailwindCSS", "Vercel"],
      githubUrl: "https://github.com/arpanbasak90-cyber/BuilderLeaderboard-Platform",
      liveUrl: "https://builder-leaderboard-platform.vercel.app",
      featured: true
    },
    {
      id: "nft-minting",
      title: "NFT Minting Platform",
      description: "Decentralized NFT minting infrastructure leveraging Soroban smart contracts on the Stellar network for low-friction digital asset tokenization.",
      technologies: ["JavaScript", "Stellar", "Soroban", "Smart Contracts"],
      githubUrl: "https://github.com/arpanbasak90-cyber/NFT-Minting-Platform",
      liveUrl: "https://nft-minting-platform-2.vercel.app",
      featured: true
    },
    {
      id: "kavanch",
      title: "Kavanch Security Platform",
      description: "Web3 security utility system focused on automated contract validation, threat detection, and developer monitoring tools.",
      technologies: ["JavaScript", "Web3", "Node.js", "Security"],
      githubUrl: "https://github.com/arpanbasak90-cyber/Kavanch",
      liveUrl: "https://github.com/arpanbasak90-cyber/Kavanch",
      featured: true
    },
    {
      id: "mediscan",
      title: "MediScan Doctor Hub",
      description: "AI-driven medical diagnostics assistance hub enabling healthcare providers to manage doctor workflows and analyze diagnostic reports efficiently.",
      technologies: ["TypeScript", "React", "AI/ML", "HealthTech"],
      githubUrl: "https://github.com/arpanbasak90-cyber/mediscan-doctor-hub",
      liveUrl: "https://github.com/arpanbasak90-cyber/mediscan-doctor-hub",
      featured: false
    },
    {
      id: "odoo-hackathon",
      title: "Odoo Adamas Hackathon Project",
      description: "Custom enterprise management solution created for the Odoo x Adamas University Hackathon 2026.",
      technologies: ["JavaScript", "Python", "Odoo", "Hackathon"],
      githubUrl: "https://github.com/arpanbasak90-cyber/odoo-adamas-hackathon-2026-",
      liveUrl: "https://odoo-adamas-hackathon-2026.vercel.app/",
      featured: false
    },
    {
      id: "kredz",
      title: "KREDZ Protocol",
      description: "Decentralized credit scoring and verifiable credential verification protocol for Web3 identity systems.",
      technologies: ["Web3", "Smart Contracts", "JavaScript"],
      githubUrl: "https://github.com/arpanbasak90-cyber/KREDZ",
      liveUrl: "https://kredz-2nzq.vercel.app",
      featured: false
    }
  ],

  // ------------------------------------------------------------------
  // 5. CERTIFICATES & ACHIEVEMENTS SECTION
  // ------------------------------------------------------------------
  // DESIGNED SPECIFICALLY FOR 2-4 ITEMS WITH HIGH VISUAL IMPORTANCE.
  // TO ADD A NEW CERTIFICATE / ACHIEVEMENT:
  // Paste a new item in this array.
  achievements: [
    {
      title: "Hackathon Winner & Finalist — UEM & IIT Kharagpur Research Park",
      issuer: "UEM x IIT Kharagpur Research Park",
      date: "2026",
      badge: "Winner & Top Builder",
      description: "Awarded top position at the flagship hackathon event held at IIT Kharagpur Research Park for building innovative decentralized technology solutions under 48 hours.",
      link: "https://www.linkedin.com/posts/arpan-basak-075892368_hackathon-uem-iitkharagpurresearchpark-ugcPost-7482798278925864962-wX0G/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFtBRtkByBwhTMyD56So4Xp4iQDOT489dt8",
      image: null // Optional: add image path here e.g. "assets/achievements/uem.jpg"
    },
    {
      title: "BuildInPublic Developers Hackathon Highlight",
      issuer: "BuildInPublic Developer Community",
      date: "2026",
      badge: "2X Winner & 4X Finalist",
      description: "Recognized for rapid shipping, public product development, and technical execution across multiple hackathon competitions.",
      link: "https://www.linkedin.com/posts/arpan-basak-075892368_hackathon-buildinpublic-developers-ugcPost-7452011582772936704-P-Hk/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFtBRtkByBwhTMyD56So4Xp4iQDOT489dt8",
      image: null
    }
  ],

  // ------------------------------------------------------------------
  // 6. EDUCATION SECTION
  // ------------------------------------------------------------------
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Narula Institute of Technology (NiT)",
      period: "Sep 2025 – Jul 2029",
      location: "Kolkata, West Bengal, India",
      details: "Computer Science and Information Sciences. Activities & Societies: Cricket, Football, Music. Focus on Research Skills & Teamwork."
    },
    {
      degree: "Higher Secondary (WBCHSE) & Secondary (WBSE)",
      institution: "Krishnapur Adarsha Vidyamandir",
      period: "2023 – 2025",
      location: "Kolkata, West Bengal, India",
      details: "Pure Science (PCMCs). Grades: Madhyamik (10th) - 89% & Higher Secondary (12th) - 85.4%."
    }
  ],

  // ------------------------------------------------------------------
  // 7. CONTACT & SOCIAL LINKS
  // ------------------------------------------------------------------
  contact: {
    email: "arpanbasak901@gmail.com",
    github: "https://github.com/arpanbasak90-cyber",
    linkedin: "https://www.linkedin.com/in/arpan-basak-075892368",
    x: "https://x.com/ArpanBasak2006",
    footerText: "Designed & Built with Muted Champagne Gold Aesthetic."
  }
};
