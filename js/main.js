/**
 * ====================================================================
 * PORTFOLIO MAIN DYNAMIC RENDERER
 * Reads content dynamically from PORTFOLIO_DATA (js/data.js)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure PORTFOLIO_DATA is loaded
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('PORTFOLIO_DATA is missing. Make sure js/data.js is included before js/main.js');
    return;
  }

  const { personal, about, skills, projects, achievements, education, contact } = PORTFOLIO_DATA;

  // Render all sections
  renderHero(personal);
  renderAbout(about);
  renderSkills(skills);
  renderProjects(projects);
  renderAchievements(achievements);
  renderEducation(education);
  renderContact(contact);
  
  // Setup interactions
  setupMobileNav();
  setupSmoothScroll();
});

/* --------------------------------------------------------------------
   1. HERO RENDERER
   -------------------------------------------------------------------- */
function renderHero(personal) {
  const heroNameEl = document.getElementById('hero-name');
  const heroHeadlineEl = document.getElementById('hero-headline');
  const heroTitleEl = document.getElementById('hero-title');
  const heroHighlightsEl = document.getElementById('hero-highlights');
  const heroImgEl = document.getElementById('hero-img');

  if (heroNameEl) heroNameEl.textContent = personal.name;
  if (heroHeadlineEl) heroHeadlineEl.textContent = personal.headline;
  if (heroTitleEl) heroTitleEl.textContent = personal.title;
  if (heroImgEl) {
    heroImgEl.src = personal.profileImage;
    heroImgEl.alt = personal.name;
  }

  if (heroHighlightsEl && Array.isArray(personal.highlights)) {
    heroHighlightsEl.innerHTML = personal.highlights
      .map(h => `<span class="hero-chip">${escapeHtml(h)}</span>`)
      .join('');
  }
}

/* --------------------------------------------------------------------
   2. ABOUT RENDERER
   -------------------------------------------------------------------- */
function renderAbout(about) {
  const aboutBioEl = document.getElementById('about-bio');
  if (aboutBioEl && Array.isArray(about.bio)) {
    aboutBioEl.innerHTML = about.bio
      .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`)
      .join('');
  }
}

/* --------------------------------------------------------------------
   3. SKILLS RENDERER
   -------------------------------------------------------------------- */
function renderSkills(skills) {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer || !Array.isArray(skills)) return;

  skillsContainer.innerHTML = skills.map(categoryObj => `
    <div class="skill-category-card">
      <h3 class="skill-category-title">
        <span class="skill-bullet"></span>
        ${escapeHtml(categoryObj.category)}
      </h3>
      <div class="skill-list">
        ${categoryObj.items.map(item => `
          <div class="skill-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B4332" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${escapeHtml(item.name)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------
   4. PROJECTS RENDERER
   -------------------------------------------------------------------- */
function renderProjects(projects) {
  const projectsContainer = document.getElementById('projects-container');
  if (!projectsContainer || !Array.isArray(projects)) return;

  projectsContainer.innerHTML = projects.map(proj => `
    <div class="project-card">
      <div>
        <div class="project-header">
          <h3 class="project-title">${escapeHtml(proj.title)}</h3>
          ${proj.featured ? '<span class="project-badge">Featured</span>' : ''}
        </div>
        <p class="project-desc">${escapeHtml(proj.description)}</p>
      </div>

      <div>
        <div class="project-tech-tags">
          ${proj.technologies.map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
        </div>
        <div class="project-links">
          ${proj.githubUrl ? `
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              GitHub Repo
            </a>
          ` : ''}
          ${proj.liveUrl && proj.liveUrl !== proj.githubUrl ? `
            <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Live Demo
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------
   5. CERTIFICATES & ACHIEVEMENTS RENDERER (Horizontal Showcase)
   -------------------------------------------------------------------- */
function renderAchievements(achievements) {
  const container = document.getElementById('achievements-container');
  if (!container || !Array.isArray(achievements)) return;

  container.innerHTML = achievements.map(item => `
    <div class="achievement-card">
      <div class="achievement-top">
        <div>
          <h3 class="achievement-title">${escapeHtml(item.title)}</h3>
          <span class="achievement-meta">${escapeHtml(item.issuer)} • ${escapeHtml(item.date)}</span>
        </div>
        ${item.badge ? `<span class="achievement-issuer-badge">${escapeHtml(item.badge)}</span>` : ''}
      </div>
      
      <p class="achievement-desc">${escapeHtml(item.description)}</p>

      ${item.link ? `
        <div>
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="achievement-link">
            <span>View Verification / LinkedIn Announcement</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      ` : ''}
    </div>
  `).join('');
}

/* --------------------------------------------------------------------
   6. EDUCATION RENDERER
   -------------------------------------------------------------------- */
function renderEducation(education) {
  const container = document.getElementById('education-container');
  if (!container || !Array.isArray(education)) return;

  container.innerHTML = education.map(edu => `
    <div class="education-card">
      <div>
        <h3 class="education-degree">${escapeHtml(edu.degree)}</h3>
        <p class="education-institution">${escapeHtml(edu.institution)} • ${escapeHtml(edu.location)}</p>
        <p class="education-details">${escapeHtml(edu.details)}</p>
      </div>
      <span class="education-period">${escapeHtml(edu.period)}</span>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------
   7. CONTACT RENDERER
   -------------------------------------------------------------------- */
function renderContact(contact) {
  const emailLinkEl = document.getElementById('contact-email-link');
  const footerTextEl = document.getElementById('footer-text');
  const socialLinksEl = document.getElementById('social-links');

  if (emailLinkEl) {
    emailLinkEl.href = `mailto:${contact.email}`;
    emailLinkEl.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      <span>Email: ${escapeHtml(contact.email)}</span>
    `;
  }

  if (socialLinksEl) {
    socialLinksEl.innerHTML = `
      ${contact.github ? `
        <a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="social-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          GitHub
        </a>
      ` : ''}
      ${contact.linkedin ? `
        <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="social-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          LinkedIn
        </a>
      ` : ''}
      ${contact.x ? `
        <a href="${contact.x}" target="_blank" rel="noopener noreferrer" class="social-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          X (Twitter)
        </a>
      ` : ''}
    `;
  }

  if (footerTextEl) {
    footerTextEl.textContent = `© ${new Date().getFullYear()} ${PORTFOLIO_DATA.personal.name}. ${contact.footerText || ''}`;
  }
}

/* --------------------------------------------------------------------
   INTERACTION HELPERS
   -------------------------------------------------------------------- */
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
