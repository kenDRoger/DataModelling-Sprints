import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "./styles.css";
import { portfolio } from "./content.js";

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

const externalLink = (label, href, className = "") => `
  <a class="link-button ${className}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
    ${escapeHtml(label)}
  </a>
`;

const panelHeader = (title, path) => `
  <header class="panel__header">
    <span class="panel__title">${escapeHtml(title)}</span>
    <span class="panel__path">${escapeHtml(path)}</span>
    <span class="panel__controls" aria-hidden="true">[ ] _</span>
  </header>
`;

const renderProject = (project) => `
  <article class="project-card" id="project-${escapeHtml(project.id)}">
    <div class="project-card__heading">
      <p class="project-card__code">${escapeHtml(project.sprint)} // ${escapeHtml(project.id)}</p>
      <span class="status-label">${escapeHtml(project.status)}</span>
    </div>
    <h3>${escapeHtml(project.title)}</h3>
    <p class="project-card__summary">${escapeHtml(project.summary)}</p>
    <div class="project-preview" role="group" aria-label="Text summary of ${escapeHtml(project.id)} model output">
      <div class="project-preview__top"><span>EIF / ${escapeHtml(project.id)}</span><span>${escapeHtml(project.previewLabel.toUpperCase())}</span></div>
      ${project.previewLines.map(([label, value]) => `
        <div class="project-preview__row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>
      `).join("")}
    </div>
    <div class="readout">
      <div class="readout__head">
        <p class="readout__title">Deliverable 3b readout</p>
        <a class="readout__open" href="${escapeHtml(import.meta.env.BASE_URL)}${escapeHtml(project.readout)}" target="_blank" rel="noopener">Open PDF</a>
      </div>
      <details class="readout__preview">
        <summary><span>Preview readout</span><span class="readout__hint">scroll and zoom inside</span></summary>
        <iframe src="${escapeHtml(import.meta.env.BASE_URL)}${escapeHtml(project.readout)}#view=FitH" title="Deliverable 3b readout for ${escapeHtml(project.id)}" loading="lazy"></iframe>
        <p class="readout__fallback">If the preview does not load, open the PDF: <a href="${escapeHtml(import.meta.env.BASE_URL)}${escapeHtml(project.readout)}" target="_blank" rel="noopener">${escapeHtml(project.id)} readout</a></p>
      </details>
    </div>
    <p class="project-card__finding"><span class="label">[DERIVED]</span> ${escapeHtml(project.finding)}</p>
    <div class="tag-list" aria-label="Skills demonstrated">
      ${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
    <ul class="deliverable-list" aria-label="EIF deliverables">
      ${project.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
    <a class="drive-link" href="${escapeHtml(project.driveUrl)}" target="_blank" rel="noopener">Google Drive folder · ${escapeHtml(project.sprint)}</a>
    <details class="model-note">
      <summary>Model limits</summary>
      <p>${escapeHtml(project.limitation)}</p>
    </details>
  </article>
`;

const renderFigure = (figure) => `
  <figure class="figure-card">
    <img src="${escapeHtml(import.meta.env.BASE_URL)}figures/${escapeHtml(figure.file)}" alt="${escapeHtml(figure.alt)}" loading="lazy" decoding="async">
    <figcaption>
      <p class="figure-card__meta"><span>${escapeHtml(figure.sprint)}</span><span>${escapeHtml(figure.deliverable)}</span></p>
      <h3>${escapeHtml(figure.title)}</h3>
      <p class="figure-card__note">${escapeHtml(figure.note)}</p>
    </figcaption>
  </figure>
`;

const renderSkills = (group) => `
  <div class="skill-group">
    <h3>${escapeHtml(group.name)}</h3>
    <div class="tag-list">
      ${group.items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}
    </div>
  </div>
`;

const renderJourney = (step) => `
  <li class="journey-row">
    <span class="journey-row__index">${escapeHtml(step.id)}</span>
    <div>
      <p class="journey-row__sprint">${escapeHtml(step.sprint)} · ${escapeHtml(step.date)} · ${escapeHtml(step.projectId)}</p>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.arc)}</p>
    </div>
  </li>
`;

const renderMetric = (metric) => `
  <article class="metric-tile">
    <div class="metric-tile__top">
      <h3>${escapeHtml(metric.label)}</h3>
      <strong>${escapeHtml(metric.value)}</strong>
    </div>
    <div class="metric-gauge" role="progressbar" aria-label="${escapeHtml(metric.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${escapeHtml(metric.percent)}">
      <span style="width:${escapeHtml(metric.percent)}%"></span>
    </div>
    <p>${escapeHtml(metric.detail)}</p>
    <span class="metric-tile__source">SYNTHETIC EIF RESULT</span>
  </article>
`;

const renderReflection = (item) => `
  <article class="reflection-entry">
    <h3>${escapeHtml(item.label)}</h3>
    <p>${escapeHtml(item.text)}</p>
  </article>
`;

const renderCalibration = (item) => `
  <article class="calibration-entry">
    <div class="calibration-entry__head">
      <span>${escapeHtml(item.sprint)}</span>
      <strong>${escapeHtml(item.source)}</strong>
    </div>
    <p><span class="label">[OBSERVED]</span> ${escapeHtml(item.check)}</p>
    <p><span class="label">[CALIBRATED]</span> ${escapeHtml(item.decision)}</p>
  </article>
`;

const app = document.querySelector("#app");

app.innerHTML = `
  <a class="skip-link" href="#main">Skip to EIF portfolio</a>
  <header class="topbar">
    <a class="terminal-prompt" href="#home" aria-label="Back to home">ken@eif:~$<span class="prompt-cursor" aria-hidden="true"></span></a>
    <nav class="terminal-nav" aria-label="Portfolio navigation">
      ${portfolio.nav.map((item) => `<a class="nav-link" href="${escapeHtml(item.href)}">&gt; ${escapeHtml(item.label)}</a>`).join("")}
    </nav>
  </header>

  <main id="main" class="site-grid">
    <section class="panel hero span-12" id="home" aria-labelledby="hero-title">
      ${panelHeader("home", "~/eif/portfolio")}
      <div class="panel__body hero__body">
        <img class="avatar avatar--photo" src="${escapeHtml(import.meta.env.BASE_URL)}kenid.jpg" alt="Portrait of ${escapeHtml(portfolio.name)}" width="96" height="96" decoding="async">
        <div class="hero__content">
          <p class="hero__context">${escapeHtml(portfolio.fellowship)} · EIF-only project portfolio</p>
          <h1 id="hero-title">${escapeHtml(portfolio.name)}</h1>
          <p class="hero__role">${escapeHtml(portfolio.title)}<span class="role-cursor" aria-hidden="true"></span></p>
          <p class="hero__profile">${escapeHtml(portfolio.profile)}</p>
          <p class="hero__intro">${escapeHtml(portfolio.introduction)}</p>
          <div class="hero__links" aria-label="Contact and project links">
            ${externalLink("GitHub · DataModelling-Sprints", portfolio.links.siteRepository)}
            ${externalLink("LinkedIn", portfolio.links.linkedin)}
            <a class="link-button" href="${escapeHtml(portfolio.links.email)}">Email · ${escapeHtml(portfolio.links.emailLabel)}</a>
          </div>
          <p class="hero__status"><span class="state-mark" aria-hidden="true">■</span> 3 SPRINTS · SYNTHETIC DATA · OPERATIONS ANALYTICS</p>
        </div>
      </div>
    </section>

    <section class="panel span-6" id="skills" aria-labelledby="skills-title">
      ${panelHeader("skills demonstrated", "~/eif/evidence")}
      <div class="panel__body">
        <h2 class="section-title" id="skills-title">Methods shown in the sprint work</h2>
        <div class="skill-groups">${portfolio.skills.map(renderSkills).join("")}</div>
      </div>
    </section>

    <section class="panel span-6" id="journey" aria-labelledby="journey-title">
      ${panelHeader("EIF journey", "~/eif/progression")}
      <div class="panel__body">
        <h2 class="section-title" id="journey-title">From a baseline to a planning decision</h2>
        <ol class="journey-list">${portfolio.journey.map(renderJourney).join("")}</ol>
      </div>
    </section>

    <section class="panel span-12" id="projects" aria-labelledby="projects-title">
      ${panelHeader("sprint projects", "~/eif/projects")}
      <div class="panel__body">
        <div class="section-heading">
          <h2 class="section-title" id="projects-title">Three synthetic models. Three operational questions.</h2>
          <p>Every result below describes the generated teaching data, not a real business or network.</p>
        </div>
        <div class="project-grid">${portfolio.projects.map(renderProject).join("")}</div>
      </div>
    </section>

    <section class="panel span-12" id="figures" aria-labelledby="figures-title">
      ${panelHeader("analysis figures", "~/eif/figures · saved outputs")}
      <div class="panel__body">
        <div class="section-heading">
          <h2 class="section-title" id="figures-title">Charts from the executed notebooks</h2>
          <p>Images are the saved Matplotlib outputs of each Deliverable 3a notebook, read directly from the notebook files.</p>
        </div>
        <div class="figure-grid">${portfolio.figures.map(renderFigure).join("")}</div>
      </div>
    </section>

    <section class="panel span-12" id="analytics" aria-labelledby="analytics-title">
      ${panelHeader("verified analytics", "~/eif/outputs · static")}
      <div class="panel__body">
        <div class="section-heading">
          <h2 class="section-title" id="analytics-title">Evidence from the three sprint analyses</h2>
          <p>Static, reproducible measures from synthetic data. These are not live site metrics.</p>
        </div>
        <div class="metric-grid">${portfolio.metrics.map(renderMetric).join("")}</div>
        <div class="table-counts" aria-label="Required menu table counts by sprint">
          <h3>Required model tables</h3>
          <div class="table-count-row"><span>SD-004</span><span>5 tables</span><span class="table-count-bar"><i style="width:71.4%"></i></span></div>
          <div class="table-count-row"><span>SD-029</span><span>5 tables</span><span class="table-count-bar"><i style="width:71.4%"></i></span></div>
          <div class="table-count-row"><span>SD-210</span><span>7 tables</span><span class="table-count-bar"><i style="width:100%"></i></span></div>
          <p class="fine-print">Counts cover the five, five, and seven required menu tables; Sprint 1's supporting calendar is not counted.</p>
        </div>
      </div>
    </section>

    <section class="panel span-8" id="reflection" aria-labelledby="reflection-title">
      ${panelHeader("reflection", "~/eif/learning")}
      <div class="panel__body">
        <h2 class="section-title" id="reflection-title">What changed across the work</h2>
        <div class="reflection-grid">${portfolio.reflection.map(renderReflection).join("")}</div>
      </div>
    </section>

    <section class="panel span-4" id="looking-forward" aria-labelledby="looking-title">
      ${panelHeader("looking forward", "~/eif/next")}
      <div class="panel__body">
        <h2 class="section-title" id="looking-title">After EIF</h2>
        <p>${escapeHtml(portfolio.next)}</p>
        <p class="fine-print">Interested in Data Analyst and Data/Operations Analyst opportunities.</p>
        <p class="fine-print">${escapeHtml(portfolio.prepared)}</p>
      </div>
    </section>

    <section class="panel span-12" id="calibration" aria-labelledby="calibration-title">
      ${panelHeader("reference and calibration", "~/eif/research")}
      <div class="panel__body">
        <div class="section-heading">
          <h2 class="section-title" id="calibration-title">Research shaped the assumptions</h2>
          <p>Calibration included documented no-adjustment decisions when sources did not match the model's grain.</p>
        </div>
        <div class="calibration-list">${portfolio.calibration.map(renderCalibration).join("")}</div>
      </div>
    </section>

    <section class="panel span-12" id="contact" aria-labelledby="contact-title">
      ${panelHeader("contact", "~/eif/connect")}
      <div class="panel__body contact__body">
        <div>
          <h2 class="section-title" id="contact-title">Continue the conversation</h2>
          <p>This site presents the EIF fellowship projects only. It is built from synthetic analyses and verified project artifacts.</p>
        </div>
        <div class="contact-links">
          ${externalLink("GitHub repository", portfolio.links.siteRepository)}
          ${externalLink("LinkedIn profile", portfolio.links.linkedin)}
          <a class="link-button" href="${escapeHtml(portfolio.links.email)}">Email Ken</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <span>EIF FELLOWSHIP · DATA ANALYTICS / DATA MODELLING</span>
    <span>STATIC PORTFOLIO · SYNTHETIC PROJECT RESULTS</span>
  </footer>
`;

const navigationLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navigationLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75] });
  observedSections.forEach((section) => sectionObserver.observe(section));
}
