/**
 * ============================================================
 * PORTFOLIO ADMIN â€” INLINE CANVA-STYLE DOM EDITOR
 * Activate: Ctrl + Shift + E
 * ============================================================
 */
(function () {
  'use strict';

  // â”€â”€â”€ Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const ADMIN_PIN = '2021';  // Change this PIN
  const REPO     = 'shadman1996/portfolio-website';
  const BRANCH   = 'main';
  const FILE     = 'index.html';
  const GH_API   = `https://api.github.com/repos/${REPO}/contents/${FILE}`;

  // â”€â”€â”€ State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  let editMode    = false;
  let activeEl    = null;
  let toolbar     = null;
  let adminBar    = null;
  let pat         = localStorage.getItem('_admin_pat') || '';

  // â”€â”€â”€ Editable selectors â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const EDITABLE = [
    '.hero-title',
    '.hero-subtitle',
    '.hero-bio',
    '.hero-badge',
    '.tl-role',
    '.tl-company',
    '.tl-desc',
    '.timeline-date',
    '.tag',
    '.section-title',
    '.section-subtitle',
    '.skill-category h3',
    '.skill-list li',
    '.project-title',
    '.project-desc',
    '.cert-name',
    '.contact-value',
    '.about-text',
    '.footer-desc',
    '.about-card h3',
    '.about-card p',
    '.edu-subtitle',
  ];

  // â”€â”€â”€ Attach Keyboard Shortcut â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
      e.preventDefault();
      editMode ? deactivate() : promptPin();
    }
  });

  // â”€â”€â”€ PIN Prompt â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function promptPin() {
    const overlay = mkEl('div', `
      position:fixed;inset:0;background:rgba(6,20,35,0.92);
      display:flex;align-items:center;justify-content:center;
      z-index:999999;backdrop-filter:blur(12px);
    `);
    const box = mkEl('div', `
      background:#0a0610;border:1px solid rgba(139,92,246,0.3);
      border-radius:16px;padding:40px;text-align:center;
      box-shadow:0 40px 80px rgba(0,0,0,0.5);min-width:320px;
    `);
    box.innerHTML = `
      <div style="font-size:2rem;margin-bottom:8px;">ðŸ”</div>
      <h2 style="color:#f0f4f8;font-family:Inter,sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:4px;">Admin Mode</h2>
      <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:24px;font-family:Inter,sans-serif;">Enter your PIN to enable inline editing</p>
      <input id="_pin_input" type="password" maxlength="6" placeholder="â— â— â— â—"
        style="width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(139,92,246,0.3);
               background:rgba(255,255,255,0.05);color:#f0f4f8;font-size:1.2rem;
               text-align:center;letter-spacing:0.3em;outline:none;font-family:Inter,sans-serif;
               margin-bottom:16px;box-sizing:border-box;" />
      <button id="_pin_ok" style="width:100%;padding:12px;background:linear-gradient(135deg,#7c3aed,#e879f9);
        color:#fff;border:none;border-radius:10px;font-size:0.95rem;font-weight:600;
        cursor:pointer;font-family:Inter,sans-serif;">Unlock Editor</button>
      <div id="_pin_err" style="color:#f87171;font-size:0.8rem;margin-top:10px;display:none;font-family:Inter,sans-serif;">Incorrect PIN. Try again.</div>
      <p style="color:#64748b;font-size:0.75rem;margin-top:16px;font-family:Inter,sans-serif;">Press Ctrl+Shift+E anytime to toggle</p>
    `;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const inp = box.querySelector('#_pin_input');
    const btn = box.querySelector('#_pin_ok');
    const err = box.querySelector('#_pin_err');

    setTimeout(() => inp.focus(), 100);

    function check() {
      if (inp.value === ADMIN_PIN) {
        document.body.removeChild(overlay);
        activate();
      } else {
        err.style.display = 'block';
        inp.value = '';
        inp.style.border = '1px solid #f87171';
        setTimeout(() => { inp.style.border = '1px solid rgba(139,92,246,0.3)'; err.style.display='none'; }, 2000);
      }
    }

    btn.addEventListener('click', check);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) document.body.removeChild(overlay); });
  }

  // â”€â”€â”€ Activate Edit Mode â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function activate() {
    editMode = true;
    document.body.style.outline = '3px solid rgba(232,121,249,0.5)';

    // Create top admin bar
    adminBar = mkEl('div', `
      position:fixed;top:0;left:0;right:0;
      background:linear-gradient(135deg,#0a0610,#130d1e);
      border-bottom:1px solid rgba(139,92,246,0.4);
      display:flex;align-items:center;justify-content:space-between;
      padding:0 24px;height:52px;z-index:99999;
      box-shadow:0 4px 24px rgba(0,0,0,0.4);
      font-family:Inter,sans-serif;
    `);
    adminBar.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="background:linear-gradient(135deg,#7c3aed,#e879f9);color:#fff;padding:4px 10px;border-radius:6px;font-size:0.75rem;font-weight:700;letter-spacing:0.05em;">EDIT MODE</span>
        <span style="color:#94a3b8;font-size:0.82rem;">Click any text to edit â€¢ Ctrl+Shift+E to exit</span>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <button id="_admin_pat_btn" style="padding:7px 14px;background:rgba(255,255,255,0.07);color:#94a3b8;
          border:1px solid rgba(255,255,255,0.1);border-radius:8px;font-size:0.8rem;cursor:pointer;font-family:Inter,sans-serif;">
          ðŸ”‘ GitHub Token
        </button>
        <button id="_admin_save" style="padding:7px 16px;background:linear-gradient(135deg,#7c3aed,#e879f9);
          color:#fff;border:none;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;">
          â¬† Publish to GitHub
        </button>
        <button id="_admin_exit" style="padding:7px 14px;background:rgba(248,113,113,0.15);color:#f87171;
          border:1px solid rgba(248,113,113,0.3);border-radius:8px;font-size:0.8rem;cursor:pointer;font-family:Inter,sans-serif;">
          âœ• Exit
        </button>
      </div>
    `;
    document.body.prepend(adminBar);
    document.body.style.paddingTop = '52px';

    adminBar.querySelector('#_admin_exit').addEventListener('click', deactivate);
    adminBar.querySelector('#_admin_save').addEventListener('click', publishToGitHub);
    adminBar.querySelector('#_admin_pat_btn').addEventListener('click', promptPAT);

    // Make elements editable
    const allEditable = [];
    EDITABLE.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        // Skip typewriter element
        if (el.id === 'typewriter' || el.closest('#typewriter') || el.classList.contains('typewriter-cursor')) return;
        el.contentEditable = 'true';
        el.dataset.original = el.innerHTML;
        el.style.outline = '2px dashed rgba(139,92,246,0.35)';
        el.style.borderRadius = '4px';
        el.style.minHeight = '1em';
        el.style.cursor = 'text';
        el.style.transition = 'outline 0.2s, background 0.2s';

        el.addEventListener('focus', () => {
          el.style.outline = '2px solid #8b5cf6';
          el.style.background = 'rgba(139,92,246,0.08)';
          activeEl = el;
          positionToolbar(el);
        });
        el.addEventListener('blur', () => {
          el.style.outline = '2px dashed rgba(139,92,246,0.35)';
          el.style.background = '';
        });
        el.addEventListener('mouseenter', () => {
          if (el !== activeEl) el.style.outline = '2px dashed rgba(37,99,235,0.6)';
        });
        el.addEventListener('mouseleave', () => {
          if (el !== activeEl) el.style.outline = '2px dashed rgba(37,99,235,0.35)';
        });

        allEditable.push(el);
      });
    });

    createToolbar();
    document.addEventListener('selectionchange', onSelectionChange);

    showToast('âœï¸ Edit mode active â€” click any text to start editing!');
  }

  // â”€â”€â”€ Deactivate Edit Mode â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function deactivate() {
    editMode = false;
    document.body.style.outline = '';
    document.body.style.paddingTop = '';

    if (adminBar) { adminBar.remove(); adminBar = null; }
    if (toolbar)  { toolbar.remove(); toolbar = null; }

    EDITABLE.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.contentEditable = 'false';
        el.style.outline = '';
        el.style.background = '';
        el.style.cursor = '';
        el.style.borderRadius = '';
      });
    });

    document.removeEventListener('selectionchange', onSelectionChange);
    showToast('ðŸ‘ï¸ Edit mode off');
  }

  // â”€â”€â”€ Floating Toolbar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function createToolbar() {
    toolbar = mkEl('div', `
      position:fixed;background:#0d1b2a;border:1px solid rgba(139,92,246,0.3);
      border-radius:10px;padding:6px 10px;display:none;align-items:center;gap:4px;
      z-index:999999;box-shadow:0 8px 32px rgba(0,0,0,0.4);
      font-family:Inter,sans-serif;white-space:nowrap;
    `);
    toolbar.innerHTML = `
      <button data-cmd="bold"         title="Bold"         style="${tbBtn()}"><b>B</b></button>
      <button data-cmd="italic"       title="Italic"       style="${tbBtn()}"><i>I</i></button>
      <button data-cmd="underline"    title="Underline"    style="${tbBtn()}"><u>U</u></button>
      <div style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 4px;"></div>
      <button data-action="bigger"    title="Larger text"  style="${tbBtn()}">A+</button>
      <button data-action="smaller"   title="Smaller text" style="${tbBtn()}">Aâˆ’</button>
      <div style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 4px;"></div>
      <button data-action="color-accent" title="Accent Blue" style="${tbBtn()};color:#8b5cf6;">â– </button>
      <button data-action="color-white"  title="White text"  style="${tbBtn()};color:#f0f4f8;">â– </button>
      <button data-action="color-muted"  title="Muted text"  style="${tbBtn()};color:#94a3b8;">â– </button>
      <div style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 4px;"></div>
      <button data-action="undo"      title="Undo"         style="${tbBtn()}">â†©</button>
    `;
    document.body.appendChild(toolbar);

    toolbar.querySelectorAll('button[data-cmd]').forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.execCommand(btn.dataset.cmd, false, null);
      });
    });

    toolbar.querySelector('[data-action="bigger"]').addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (activeEl) { const s = parseFloat(getComputedStyle(activeEl).fontSize); activeEl.style.fontSize = (s + 1) + 'px'; }
    });
    toolbar.querySelector('[data-action="smaller"]').addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (activeEl) { const s = parseFloat(getComputedStyle(activeEl).fontSize); if (s > 10) activeEl.style.fontSize = (s - 1) + 'px'; }
    });
    toolbar.querySelector('[data-action="color-accent"]').addEventListener('mousedown', (e) => {
      e.preventDefault(); document.execCommand('foreColor', false, '#8b5cf6');
    });
    toolbar.querySelector('[data-action="color-white"]').addEventListener('mousedown', (e) => {
      e.preventDefault(); document.execCommand('foreColor', false, '#f0f4f8');
    });
    toolbar.querySelector('[data-action="color-muted"]').addEventListener('mousedown', (e) => {
      e.preventDefault(); document.execCommand('foreColor', false, '#94a3b8');
    });
    toolbar.querySelector('[data-action="undo"]').addEventListener('mousedown', (e) => {
      e.preventDefault(); document.execCommand('undo');
    });
  }

  function tbBtn() {
    return `background:transparent;border:none;color:#94a3b8;padding:5px 8px;border-radius:6px;
            cursor:pointer;font-size:0.85rem;font-family:Inter,sans-serif;
            transition:background 0.15s,color 0.15s;`;
  }

  function positionToolbar(el) {
    if (!toolbar) return;
    const rect = el.getBoundingClientRect();
    const top  = rect.top + window.scrollY - 52;
    toolbar.style.display = 'flex';
    toolbar.style.top  = Math.max(58, top - 8) + 'px';
    toolbar.style.left = Math.min(rect.left, window.innerWidth - toolbar.offsetWidth - 20) + 'px';
  }

  function onSelectionChange() {
    const sel = document.getSelection();
    if (!sel || sel.isCollapsed) return;
    const parent = sel.anchorNode ? sel.anchorNode.parentElement : null;
    if (parent && parent.isContentEditable && toolbar) {
      toolbar.style.display = 'flex';
    }
  }

  document.addEventListener('click', (e) => {
    if (toolbar && !toolbar.contains(e.target) && activeEl && !activeEl.contains(e.target)) {
      toolbar.style.display = 'none';
    }
  });

  // â”€â”€â”€ GitHub PAT prompt â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function promptPAT() {
    const current = localStorage.getItem('_admin_pat') || '';
    const val = prompt('Paste your GitHub Personal Access Token (repo write access).\nIt will be saved locally in your browser only.', current);
    if (val !== null) {
      pat = val.trim();
      localStorage.setItem('_admin_pat', pat);
      showToast('âœ… GitHub token saved');
    }
  }

  // â”€â”€â”€ Publish to GitHub â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async function publishToGitHub() {
    if (!pat) { promptPAT(); return; }

    const btn = adminBar.querySelector('#_admin_save');
    btn.textContent = 'â³ Publishing...';
    btn.disabled = true;

    try {
      // Get current file SHA
      const metaRes = await fetch(GH_API + `?ref=${BRANCH}`, {
        headers: { Authorization: `token ${pat}` }
      });
      if (!metaRes.ok) throw new Error('Failed to fetch file metadata. Check your token.');
      const meta = await metaRes.json();
      const sha  = meta.sha;

      // Serialize current DOM
      // Turn off contenteditable briefly to get clean HTML
      const editableEls = document.querySelectorAll('[contenteditable="true"]');
      editableEls.forEach(el => { el.removeAttribute('contenteditable'); });

      const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

      // Restore contenteditable
      editableEls.forEach(el => { el.contentEditable = 'true'; });

      const encoded = btoa(unescape(encodeURIComponent(html)));

      // Push to GitHub
      const saveRes = await fetch(GH_API, {
        method: 'PUT',
        headers: {
          Authorization: `token ${pat}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'content: Inline admin edit via portfolio CMS',
          content: encoded,
          sha: sha,
          branch: BRANCH
        })
      });

      if (!saveRes.ok) {
        const err = await saveRes.json();
        throw new Error(err.message || 'GitHub API error');
      }

      showToast('ðŸš€ Published! Site will update in ~60 seconds.', 'success');
    } catch (err) {
      showToast('âŒ ' + err.message, 'error');
    } finally {
      btn.textContent = 'â¬† Publish to GitHub';
      btn.disabled = false;
    }
  }

  // â”€â”€â”€ Toast Notification â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function showToast(msg, type = 'info') {
    const colors = {
      info:    'rgba(139,92,246,0.9)',
      success: 'rgba(34,197,94,0.9)',
      error:   'rgba(239,68,68,0.9)'
    };
    const t = mkEl('div', `
      position:fixed;bottom:28px;right:28px;z-index:9999999;
      background:${colors[type]};color:#fff;padding:12px 20px;
      border-radius:10px;font-family:Inter,sans-serif;font-size:0.875rem;
      box-shadow:0 8px 32px rgba(0,0,0,0.3);
      animation:_slideIn 0.3s ease;max-width:320px;
    `);
    t.textContent = msg;

    if (!document.querySelector('#_admin_anim')) {
      const style = document.createElement('style');
      style.id = '_admin_anim';
      style.textContent = `@keyframes _slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`;
      document.head.appendChild(style);
    }

    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; setTimeout(() => t.remove(), 400); }, 3500);
  }

  // â”€â”€â”€ Helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function mkEl(tag, css) {
    const el = document.createElement(tag);
    el.style.cssText = css;
    return el;
  }

})();

