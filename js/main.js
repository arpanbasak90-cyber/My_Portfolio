/**
 * ====================================================================
 * PORTFOLIO MAIN DYNAMIC RENDERER & INTERACTIVE EDIT CMS
 * Reads/saves content dynamically and provides on-page Edit Mode
 * ====================================================================
 */

// Global State
let currentData = null;
let isEditMode = false;

document.addEventListener('DOMContentLoaded', () => {
  // Load data from localStorage if edited; otherwise load default PORTFOLIO_DATA
  const savedData = localStorage.getItem('PORTFOLIO_USER_DATA');
  if (savedData) {
    try {
      currentData = JSON.parse(savedData);
    } catch (e) {
      console.error('Failed to parse saved portfolio data, falling back to default', e);
      currentData = JSON.parse(JSON.stringify(PORTFOLIO_DATA));
    }
  } else {
    currentData = JSON.parse(JSON.stringify(PORTFOLIO_DATA));
  }

  // Initial render
  renderAll();

  // Setup event listeners
  setupEditMode();
  setupModalEvents();
  setupMobileNav();
  setupSmoothScroll();
});

/* --------------------------------------------------------------------
   RENDER ALL SECTIONS
   -------------------------------------------------------------------- */
function renderAll() {
  renderHero(currentData.personal);
  renderAbout(currentData.about);
  renderSkills(currentData.skills);
  renderProjects(currentData.projects);
  renderAchievements(currentData.achievements);
  renderEducation(currentData.education);
  renderContact(currentData.contact);
}

/* --------------------------------------------------------------------
   DATA SAVE & EXPORT HELPERS
   -------------------------------------------------------------------- */
function saveState() {
  localStorage.setItem('PORTFOLIO_USER_DATA', JSON.stringify(currentData));
  renderAll();
}

function resetToDefault() {
  if (confirm('Are you sure you want to reset all portfolio data back to defaults?')) {
    localStorage.removeItem('PORTFOLIO_USER_DATA');
    currentData = JSON.parse(JSON.stringify(PORTFOLIO_DATA));
    renderAll();
    alert('Portfolio reset to default data!');
  }
}

function exportDataJS() {
  const dataString = `/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION FILE
 * ====================================================================
 * Generated via Portfolio Interactive Edit Mode
 */

const PORTFOLIO_DATA = ${JSON.stringify(currentData, null, 2)};
`;

  const blob = new Blob([dataString], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* --------------------------------------------------------------------
   1. HERO RENDERER
   -------------------------------------------------------------------- */
function renderHero(personal) {
  const heroNameEl = document.getElementById('hero-name');
  const heroHeadlineEl = document.getElementById('hero-headline');
  const heroTitleEl = document.getElementById('hero-title');
  const heroHighlightsEl = document.getElementById('hero-highlights');
  const heroImgEl = document.getElementById('hero-img');

  if (heroNameEl) heroNameEl.textContent = personal.name || '';
  if (heroHeadlineEl) heroHeadlineEl.textContent = personal.headline || '';
  if (heroTitleEl) heroTitleEl.textContent = personal.title || '';
  if (heroImgEl && personal.profileImage) {
    heroImgEl.src = personal.profileImage;
    heroImgEl.alt = personal.name || 'Profile';
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

  skillsContainer.innerHTML = skills.map((categoryObj, catIdx) => `
    <div class="skill-category-card">
      <h3 class="skill-category-title">
        <span class="skill-bullet"></span>
        ${escapeHtml(categoryObj.category)}
      </h3>
      <div class="skill-list">
        ${categoryObj.items.map((item, itemIdx) => `
          <div class="skill-item">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B4332" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${escapeHtml(item.name)}</span>
            </div>
            <button class="admin-only btn-card-delete" style="padding:0.1rem 0.4rem; font-size:0.7rem;" onclick="deleteSkillItem(${catIdx}, ${itemIdx})">&times;</button>
          </div>
        `).join('')}
      </div>

      <div class="admin-only" style="margin-top:1rem; display:flex; gap:0.4rem;">
        <button class="btn-card-edit" onclick="openAddSkillItemModal(${catIdx})">➕ Add Skill</button>
        <button class="btn-card-delete" onclick="deleteSkillCategory(${catIdx})">Delete Category</button>
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

  projectsContainer.innerHTML = projects.map((proj, idx) => `
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
          ${(proj.technologies || []).map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
        </div>
        <div class="project-links">
          ${proj.githubUrl ? `
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              GitHub Repo
            </a>
          ` : ''}
          ${proj.liveUrl && proj.liveUrl !== proj.githubUrl ? `
            <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Live Demo
            </a>
          ` : ''}
        </div>

        <div class="card-admin-actions admin-only">
          <button class="btn-card-edit" onclick="openEditProjectModal(${idx})">✏️ Edit Project</button>
          <button class="btn-card-delete" onclick="deleteProject(${idx})">🗑️ Delete Project</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------
   5. CERTIFICATES & ACHIEVEMENTS RENDERER
   -------------------------------------------------------------------- */
function renderAchievements(achievements) {
  const container = document.getElementById('achievements-container');
  if (!container || !Array.isArray(achievements)) return;

  container.innerHTML = achievements.map((item, idx) => `
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
            <span>View Verification / Link</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      ` : ''}

      <div class="card-admin-actions admin-only">
        <button class="btn-card-edit" onclick="openEditAchievementModal(${idx})">✏️ Edit Certificate</button>
        <button class="btn-card-delete" onclick="deleteAchievement(${idx})">🗑️ Delete Certificate</button>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------
   6. EDUCATION RENDERER
   -------------------------------------------------------------------- */
function renderEducation(education) {
  const container = document.getElementById('education-container');
  if (!container || !Array.isArray(education)) return;

  container.innerHTML = education.map((edu, idx) => `
    <div class="education-card">
      <div>
        <h3 class="education-degree">${escapeHtml(edu.degree)}</h3>
        <p class="education-institution">${escapeHtml(edu.institution)} • ${escapeHtml(edu.location)}</p>
        <p class="education-details">${escapeHtml(edu.details)}</p>

        <div class="card-admin-actions admin-only">
          <button class="btn-card-edit" onclick="openEditEducationModal(${idx})">✏️ Edit Education</button>
          <button class="btn-card-delete" onclick="deleteEducation(${idx})">🗑️ Delete</button>
        </div>
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
    emailLinkEl.href = `mailto:${contact.email || ''}`;
    emailLinkEl.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      <span>Email: ${escapeHtml(contact.email || '')}</span>
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
    footerTextEl.textContent = `© ${new Date().getFullYear()} ${currentData.personal.name}. ${contact.footerText || ''}`;
  }
}

/* --------------------------------------------------------------------
   EDIT MODE CONTROLS
   -------------------------------------------------------------------- */
function setupEditMode() {
  const toggleBtn = document.getElementById('btn-toggle-edit');
  const label = document.getElementById('edit-mode-label');
  const exportBtn = document.getElementById('btn-export-data');
  const resetBtn = document.getElementById('btn-reset-data');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isEditMode = !isEditMode;
      document.body.classList.toggle('edit-mode-active', isEditMode);
      toggleBtn.classList.toggle('active', isEditMode);
      if (label) label.textContent = isEditMode ? 'Exit Edit Mode' : 'Edit Mode';
    });
  }

  if (exportBtn) exportBtn.addEventListener('click', exportDataJS);
  if (resetBtn) resetBtn.addEventListener('click', resetToDefault);
}

/* --------------------------------------------------------------------
   MODAL CONTROLLER
   -------------------------------------------------------------------- */
let currentSaveHandler = null;

function openModal(title, formHTML, onSave) {
  const modal = document.getElementById('admin-modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const saveBtn = document.getElementById('modal-save-btn');

  if (!modal || !bodyEl) return;

  titleEl.textContent = title;
  bodyEl.innerHTML = formHTML;
  modal.classList.remove('hidden');

  currentSaveHandler = () => {
    if (onSave()) {
      closeModal();
      saveState();
    }
  };

  saveBtn.onclick = currentSaveHandler;
}

function closeModal() {
  const modal = document.getElementById('admin-modal');
  if (modal) modal.classList.add('hidden');
}

function setupModalEvents() {
  const closeBtn = document.getElementById('modal-close');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const overlay = document.getElementById('admin-modal');

  if (closeBtn) closeBtn.onclick = closeModal;
  if (cancelBtn) cancelBtn.onclick = closeModal;
  if (overlay) {
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
  }
}

/* --------------------------------------------------------------------
   MODAL HANDLERS FOR ADDING / EDITING ITEMS
   -------------------------------------------------------------------- */

// 1. PROJECTS
function openAddProjectModal() {
  const form = `
    <div class="form-group"><label>Project Title</label><input type="text" id="p-title" placeholder="My Web3 App"></div>
    <div class="form-group"><label>Description</label><textarea id="p-desc" rows="3" placeholder="Explain what the project does..."></textarea></div>
    <div class="form-group"><label>Technologies (comma separated)</label><input type="text" id="p-tech" placeholder="React, Soroban, TypeScript"></div>
    <div class="form-group"><label>GitHub Repository URL</label><input type="url" id="p-github" placeholder="https://github.com/..."></div>
    <div class="form-group"><label>Live Demo URL (optional)</label><input type="url" id="p-live" placeholder="https://my-app.vercel.app"></div>
    <div class="form-group form-checkbox"><input type="checkbox" id="p-featured" checked><label>Mark as Featured</label></div>
  `;

  openModal('Add New Project', form, () => {
    const title = document.getElementById('p-title').value.trim();
    if (!title) { alert('Title is required'); return false; }

    currentData.projects.push({
      id: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title,
      description: document.getElementById('p-desc').value.trim(),
      technologies: document.getElementById('p-tech').value.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: document.getElementById('p-github').value.trim(),
      liveUrl: document.getElementById('p-live').value.trim(),
      featured: document.getElementById('p-featured').checked
    });
    return true;
  });
}

function openEditProjectModal(index) {
  const p = currentData.projects[index];
  if (!p) return;

  const form = `
    <div class="form-group"><label>Project Title</label><input type="text" id="p-title" value="${escapeHtml(p.title)}"></div>
    <div class="form-group"><label>Description</label><textarea id="p-desc" rows="3">${escapeHtml(p.description)}</textarea></div>
    <div class="form-group"><label>Technologies (comma separated)</label><input type="text" id="p-tech" value="${escapeHtml((p.technologies || []).join(', '))}"></div>
    <div class="form-group"><label>GitHub Repository URL</label><input type="url" id="p-github" value="${escapeHtml(p.githubUrl || '')}"></div>
    <div class="form-group"><label>Live Demo URL</label><input type="url" id="p-live" value="${escapeHtml(p.liveUrl || '')}"></div>
    <div class="form-group form-checkbox"><input type="checkbox" id="p-featured" ${p.featured ? 'checked' : ''}><label>Mark as Featured</label></div>
  `;

  openModal('Edit Project', form, () => {
    const title = document.getElementById('p-title').value.trim();
    if (!title) { alert('Title is required'); return false; }

    currentData.projects[index] = {
      ...p,
      title,
      description: document.getElementById('p-desc').value.trim(),
      technologies: document.getElementById('p-tech').value.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: document.getElementById('p-github').value.trim(),
      liveUrl: document.getElementById('p-live').value.trim(),
      featured: document.getElementById('p-featured').checked
    };
    return true;
  });
}

function deleteProject(index) {
  if (confirm('Delete this project?')) {
    currentData.projects.splice(index, 1);
    saveState();
  }
}

// 2. CERTIFICATES & ACHIEVEMENTS
function openAddAchievementModal() {
  const form = `
    <div class="form-group"><label>Title</label><input type="text" id="a-title" placeholder="Hackathon Winner — IIT Kharagpur"></div>
    <div class="form-group"><label>Issuing Organization / Event</label><input type="text" id="a-issuer" placeholder="UEM x IIT Kharagpur"></div>
    <div class="form-group"><label>Date / Year</label><input type="text" id="a-date" placeholder="2026"></div>
    <div class="form-group"><label>Badge / Highlight Text</label><input type="text" id="a-badge" placeholder="Winner & Top Builder"></div>
    <div class="form-group"><label>Description</label><textarea id="a-desc" rows="3" placeholder="Briefly describe the achievement..."></textarea></div>
    <div class="form-group"><label>Verification / LinkedIn Link</label><input type="url" id="a-link" placeholder="https://linkedin.com/posts/..."></div>
  `;

  openModal('Add Certificate / Achievement', form, () => {
    const title = document.getElementById('a-title').value.trim();
    if (!title) { alert('Title is required'); return false; }

    currentData.achievements.push({
      title,
      issuer: document.getElementById('a-issuer').value.trim(),
      date: document.getElementById('a-date').value.trim(),
      badge: document.getElementById('a-badge').value.trim(),
      description: document.getElementById('a-desc').value.trim(),
      link: document.getElementById('a-link').value.trim()
    });
    return true;
  });
}

function openEditAchievementModal(index) {
  const item = currentData.achievements[index];
  if (!item) return;

  const form = `
    <div class="form-group"><label>Title</label><input type="text" id="a-title" value="${escapeHtml(item.title)}"></div>
    <div class="form-group"><label>Issuing Organization / Event</label><input type="text" id="a-issuer" value="${escapeHtml(item.issuer || '')}"></div>
    <div class="form-group"><label>Date / Year</label><input type="text" id="a-date" value="${escapeHtml(item.date || '')}"></div>
    <div class="form-group"><label>Badge / Highlight Text</label><input type="text" id="a-badge" value="${escapeHtml(item.badge || '')}"></div>
    <div class="form-group"><label>Description</label><textarea id="a-desc" rows="3">${escapeHtml(item.description || '')}</textarea></div>
    <div class="form-group"><label>Verification / LinkedIn Link</label><input type="url" id="a-link" value="${escapeHtml(item.link || '')}"></div>
  `;

  openModal('Edit Certificate / Achievement', form, () => {
    const title = document.getElementById('a-title').value.trim();
    if (!title) { alert('Title is required'); return false; }

    currentData.achievements[index] = {
      title,
      issuer: document.getElementById('a-issuer').value.trim(),
      date: document.getElementById('a-date').value.trim(),
      badge: document.getElementById('a-badge').value.trim(),
      description: document.getElementById('a-desc').value.trim(),
      link: document.getElementById('a-link').value.trim()
    };
    return true;
  });
}

function deleteAchievement(index) {
  if (confirm('Delete this achievement/certificate?')) {
    currentData.achievements.splice(index, 1);
    saveState();
  }
}

// 3. SKILLS
function openAddSkillCategoryModal() {
  const form = `
    <div class="form-group"><label>Category Title</label><input type="text" id="s-cat" placeholder="e.g. Cloud & DevOps"></div>
  `;
  openModal('Add Skill Category', form, () => {
    const cat = document.getElementById('s-cat').value.trim();
    if (!cat) { alert('Category title required'); return false; }

    currentData.skills.push({ category: cat, items: [] });
    return true;
  });
}

function openAddSkillItemModal(catIdx) {
  const form = `
    <div class="form-group"><label>Skill Name</label><input type="text" id="s-item" placeholder="e.g. Docker"></div>
  `;
  openModal('Add Skill Item', form, () => {
    const name = document.getElementById('s-item').value.trim();
    if (!name) { alert('Skill name required'); return false; }

    currentData.skills[catIdx].items.push({ name, icon: 'code' });
    return true;
  });
}

function deleteSkillItem(catIdx, itemIdx) {
  currentData.skills[catIdx].items.splice(itemIdx, 1);
  saveState();
}

function deleteSkillCategory(catIdx) {
  if (confirm('Delete this entire skill category?')) {
    currentData.skills.splice(catIdx, 1);
    saveState();
  }
}

// 4. EDUCATION
function openAddEducationModal() {
  const form = `
    <div class="form-group"><label>Degree Title</label><input type="text" id="e-degree" placeholder="B.Tech in Computer Science"></div>
    <div class="form-group"><label>Institution</label><input type="text" id="e-inst" placeholder="University / College Name"></div>
    <div class="form-group"><label>Period / Years</label><input type="text" id="e-period" placeholder="2025 – 2029"></div>
    <div class="form-group"><label>Location</label><input type="text" id="e-loc" placeholder="Kolkata, India"></div>
    <div class="form-group"><label>Details / Summary</label><textarea id="e-det" rows="2" placeholder="Major subjects, GPA, focus areas..."></textarea></div>
  `;
  openModal('Add Education Entry', form, () => {
    const degree = document.getElementById('e-degree').value.trim();
    if (!degree) { alert('Degree title required'); return false; }

    currentData.education.push({
      degree,
      institution: document.getElementById('e-inst').value.trim(),
      period: document.getElementById('e-period').value.trim(),
      location: document.getElementById('e-loc').value.trim(),
      details: document.getElementById('e-det').value.trim()
    });
    return true;
  });
}

function openEditEducationModal(index) {
  const edu = currentData.education[index];
  if (!edu) return;

  const form = `
    <div class="form-group"><label>Degree Title</label><input type="text" id="e-degree" value="${escapeHtml(edu.degree)}"></div>
    <div class="form-group"><label>Institution</label><input type="text" id="e-inst" value="${escapeHtml(edu.institution || '')}"></div>
    <div class="form-group"><label>Period / Years</label><input type="text" id="e-period" value="${escapeHtml(edu.period || '')}"></div>
    <div class="form-group"><label>Location</label><input type="text" id="e-loc" value="${escapeHtml(edu.location || '')}"></div>
    <div class="form-group"><label>Details / Summary</label><textarea id="e-det" rows="2">${escapeHtml(edu.details || '')}</textarea></div>
  `;
  openModal('Edit Education', form, () => {
    const degree = document.getElementById('e-degree').value.trim();
    if (!degree) { alert('Degree title required'); return false; }

    currentData.education[index] = {
      degree,
      institution: document.getElementById('e-inst').value.trim(),
      period: document.getElementById('e-period').value.trim(),
      location: document.getElementById('e-loc').value.trim(),
      details: document.getElementById('e-det').value.trim()
    };
    return true;
  });
}

function deleteEducation(index) {
  if (confirm('Delete this education entry?')) {
    currentData.education.splice(index, 1);
    saveState();
  }
}

// 5. PERSONAL HERO INFO
function openPersonalEditModal() {
  const p = currentData.personal;
  const form = `
    <div class="form-group"><label>Your Name</label><input type="text" id="m-name" value="${escapeHtml(p.name)}"></div>
    <div class="form-group"><label>Headline Tagline</label><input type="text" id="m-head" value="${escapeHtml(p.headline)}"></div>
    <div class="form-group"><label>Title / Role</label><input type="text" id="m-title" value="${escapeHtml(p.title)}"></div>
    <div class="form-group"><label>Profile Image Path</label><input type="text" id="m-img" value="${escapeHtml(p.profileImage)}"></div>
    <div class="form-group"><label>Highlights Chips (comma separated)</label><input type="text" id="m-chips" value="${escapeHtml((p.highlights || []).join(', '))}"></div>
  `;
  openModal('Edit Personal / Hero Info', form, () => {
    const name = document.getElementById('m-name').value.trim();
    if (!name) { alert('Name required'); return false; }

    currentData.personal = {
      ...p,
      name,
      headline: document.getElementById('m-head').value.trim(),
      title: document.getElementById('m-title').value.trim(),
      profileImage: document.getElementById('m-img').value.trim(),
      highlights: document.getElementById('m-chips').value.split(',').map(s => s.trim()).filter(Boolean)
    };
    return true;
  });
}

// 6. ABOUT BIO
function openAboutEditModal() {
  const a = currentData.about;
  const form = `
    <div class="form-group"><label>Bio Paragraphs (separated by double line break)</label><textarea id="m-bio" rows="6">${escapeHtml((a.bio || []).join('\n\n'))}</textarea></div>
  `;
  openModal('Edit Bio', form, () => {
    const text = document.getElementById('m-bio').value.trim();
    currentData.about.bio = text.split(/\n\n+/).filter(Boolean);
    return true;
  });
}

// 7. CONTACT & SOCIALS
function openContactEditModal() {
  const c = currentData.contact;
  const form = `
    <div class="form-group"><label>Email Address</label><input type="email" id="c-email" value="${escapeHtml(c.email || '')}"></div>
    <div class="form-group"><label>GitHub URL</label><input type="url" id="c-github" value="${escapeHtml(c.github || '')}"></div>
    <div class="form-group"><label>LinkedIn URL</label><input type="url" id="c-linkedin" value="${escapeHtml(c.linkedin || '')}"></div>
    <div class="form-group"><label>X (Twitter) URL</label><input type="url" id="c-x" value="${escapeHtml(c.x || '')}"></div>
  `;
  openModal('Edit Contact & Social Links', form, () => {
    currentData.contact = {
      ...c,
      email: document.getElementById('c-email').value.trim(),
      github: document.getElementById('c-github').value.trim(),
      linkedin: document.getElementById('c-linkedin').value.trim(),
      x: document.getElementById('c-x').value.trim()
    };
    return true;
  });
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
