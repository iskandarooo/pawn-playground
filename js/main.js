/**
 * Pawn Playground Chess Academy — Main Interactive Engine
 * Brand: Pawn Playground (Shah Alam, Selangor, Malaysia)
 * Zero external dependencies (Vanilla ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. CONSTANTS & PROGRAM TAXONOMY
     ========================================================================== */
  const COACH_PHONE = '60196120403';
  const WHATSAPP_BASE = `https://wa.me/${COACH_PHONE}?text=`;

  // Program definitions & tailored outcome highlights
  const PROGRAM_DATA = {
    beginner: {
      title: 'Beginner Foundation',
      summary: 'Tailored for young novices and foundational learners to develop rock-solid piece movement, board coordinates, and blunder-free tactical discipline.',
      highlights: [
        'Master legal piece movements, board coordinates, special rules (castling, en passant), and checkmate patterns.',
        'Develop sharp board vision, 1-move blunder checks, and primary tactical motifs (forks, pins, skewers).',
        'Build over-the-board concentration, sportsmanship, and calm analytical confidence under tournament clocks.'
      ],
      whatsappKey: 'Beginner Foundation'
    },
    intermediate: {
      title: 'Intermediate Tactical & School Club',
      summary: 'Engineered for school club players and developing juniors aiming to calculate deep tactical combinations, master middle-game plans, and stabilize their competitive ratings.',
      highlights: [
        'Deepen candidate move calculation, multi-move tactical combinations, and dynamic piece coordination in the middle game.',
        'Build structured opening principles for White and Black, plus essential theoretical endgames (King & Pawn, Rook endgames).',
        'Rigorous post-game computer and coach game analysis to eliminate tactical blindspots and improve clock discipline.'
      ],
      whatsappKey: 'Intermediate Tactical & School Club'
    },
    advanced: {
      title: 'Advanced MSSD / MSSM Tournament Prep',
      summary: 'Designed for ambitious district contenders and rated competitive youth seeking individualized tournament opening repertoires, positional mastery, and podium finishes.',
      highlights: [
        'Build an individualized tournament opening repertoire tailored against standard competitive age-group setups.',
        'Positional pawn structures, prophylaxis, strategic sacrifices, and technical endgame conversion under clock pressure.',
        'Competitive psychological conditioning, Swiss-system pairing strategies, and tournament preparation routines.'
      ],
      whatsappKey: 'Advanced MSSD/MSSM Tournament Prep'
    }
  };

  /* ==========================================================================
     2. INTERACTIVE 3-STEP QUIZ LOGIC
     ========================================================================== */
  const quizState = {
    step: 1,
    age: null,             // Human-readable string e.g. "8–12 Years Old (Primary)"
    ageValue: null,        // Key e.g. "8-12"
    experience: null,      // Human-readable string e.g. "Plays School / Club Games"
    experienceValue: null, // Key e.g. "school-club"
    format: null,          // Human-readable string e.g. "Physical (Shah Alam / Klang Valley)"
    formatValue: null,     // Key e.g. "physical"
    recommendedKey: 'beginner'
  };

  // DOM Elements - Steps & Progress
  const quizWidget = document.getElementById('programQuizWidget');
  if (quizWidget) {
    const pane1 = document.getElementById('quizPane1');
    const pane2 = document.getElementById('quizPane2');
    const pane3 = document.getElementById('quizPane3');
    const resultView = document.getElementById('quizResultView');

    const stepIndicator1 = document.getElementById('stepIndicator1');
    const stepIndicator2 = document.getElementById('stepIndicator2');
    const stepIndicator3 = document.getElementById('stepIndicator3');
    const progressBar = document.getElementById('quizProgressBar');

    // Navigation Buttons
    const nextBtn1 = document.getElementById('quizNextBtn1');
    const nextBtn2 = document.getElementById('quizNextBtn2');
    const submitBtn = document.getElementById('quizSubmitBtn');
    const backBtn2 = document.getElementById('quizBackBtn2');
    const backBtn3 = document.getElementById('quizBackBtn3');
    const restartBtn = document.getElementById('quizRestartBtn');

    // Result DOM Elements
    const resultTitle = document.getElementById('quizResultProgramTitle');
    const resultSummary = document.getElementById('quizResultSummary');
    const resultAge = document.getElementById('quizResultAge');
    const resultExperience = document.getElementById('quizResultExperience');
    const resultFormat = document.getElementById('quizResultFormat');
    const resultHighlights = document.getElementById('quizResultHighlights');
    const resultWhatsAppCta = document.getElementById('quizWhatsAppCta');

    /**
     * Attach click handlers to all selectable quiz option cards
     */
    const optionCards = quizWidget.querySelectorAll('.quiz-option');
    optionCards.forEach((card) => {
      card.addEventListener('click', () => {
        const group = card.getAttribute('data-group');
        const value = card.getAttribute('data-value');
        const titleEl = card.querySelector('.quiz-option-title');
        const label = titleEl ? titleEl.textContent.trim() : value;

        // Deselect siblings in the same step/group
        const parentPane = card.closest('.quiz-pane');
        if (parentPane) {
          parentPane.querySelectorAll(`.quiz-option[data-group="${group}"]`).forEach((sibling) => {
            sibling.classList.remove('selected');
          });
        }

        // Select current card
        card.classList.add('selected');

        // Update state
        if (group === 'age') {
          quizState.age = label;
          quizState.ageValue = value;
          if (nextBtn1) nextBtn1.disabled = false;
        } else if (group === 'experience') {
          quizState.experience = label;
          quizState.experienceValue = value;
          if (nextBtn2) nextBtn2.disabled = false;
        } else if (group === 'format') {
          quizState.format = label;
          quizState.formatValue = value;
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    });

    /**
     * Render the active step & progress bar
     */
    function renderStep(step) {
      quizState.step = step;

      // Hide all panes
      [pane1, pane2, pane3].forEach((p) => {
        if (p) p.classList.remove('active');
      });
      if (resultView) resultView.classList.remove('active');

      // Update indicator bubbles and connecting line
      if (step === 1) {
        if (pane1) pane1.classList.add('active');
        updateIndicator(stepIndicator1, 'active');
        updateIndicator(stepIndicator2, 'pending');
        updateIndicator(stepIndicator3, 'pending');
        if (progressBar) progressBar.style.width = '33.333%';
      } else if (step === 2) {
        if (pane2) pane2.classList.add('active');
        updateIndicator(stepIndicator1, 'completed');
        updateIndicator(stepIndicator2, 'active');
        updateIndicator(stepIndicator3, 'pending');
        if (progressBar) progressBar.style.width = '66.666%';
      } else if (step === 3) {
        if (pane3) pane3.classList.add('active');
        updateIndicator(stepIndicator1, 'completed');
        updateIndicator(stepIndicator2, 'completed');
        updateIndicator(stepIndicator3, 'active');
        if (progressBar) progressBar.style.width = '100%';
      } else if (step === 4) {
        // Result View
        if (resultView) resultView.classList.add('active');
        updateIndicator(stepIndicator1, 'completed');
        updateIndicator(stepIndicator2, 'completed');
        updateIndicator(stepIndicator3, 'completed');
        if (progressBar) progressBar.style.width = '100%';

        populateResults();
      }

      // Smooth scroll back to quiz header if user moved forward/back
      const quizSection = document.getElementById('quiz');
      if (quizSection && step > 1) {
        const topPos = quizSection.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }

    function updateIndicator(el, state) {
      if (!el) return;
      el.classList.remove('active', 'completed');
      if (state === 'active') {
        el.classList.add('active');
      } else if (state === 'completed') {
        el.classList.add('completed');
      }
    }

    /**
     * Map Step 2 selections to the exact recommended program
     * - "complete-beginner" or "knows-basic-moves" -> "Beginner Foundation"
     * - "school-club" -> "Intermediate Tactical & School Club"
     * - "competitive" -> "Advanced MSSD/MSSM Tournament Prep"
     */
    function calculateRecommendation() {
      const exp = quizState.experienceValue;
      if (exp === 'competitive') {
        return 'advanced';
      }
      if (exp === 'school-club') {
        return 'intermediate';
      }
      // Defaults to beginner for 'complete-beginner', 'knows-basic-moves', or null
      return 'beginner';
    }

    /**
     * Populate diagnostic recommendation and build dynamic WhatsApp message
     */
    function populateResults() {
      const programKey = calculateRecommendation();
      quizState.recommendedKey = programKey;
      const data = PROGRAM_DATA[programKey];

      // Set Program Title & Summary
      if (resultTitle) resultTitle.textContent = data.title;
      if (resultSummary) resultSummary.textContent = data.summary;

      // Summary selections
      if (resultAge) resultAge.textContent = quizState.age || 'Not specified';
      if (resultExperience) resultExperience.textContent = quizState.experience || 'Beginner';
      if (resultFormat) resultFormat.textContent = quizState.format || 'Flexible';

      // 3 Tailored learning outcome bullets
      if (resultHighlights) {
        resultHighlights.innerHTML = data.highlights
          .map(
            (item) => `
          <li class="feature-item">
            <span class="check-icon">&#10003;</span>
            <span>${item}</span>
          </li>`
          )
          .join('');
      }

      // Build pre-filled WhatsApp link with exact required format
      const ageText = quizState.age || 'General / Youth';
      const expText = quizState.experience || 'Beginner Foundation';
      const formatText = quizState.format || 'Physical / Online';

      const whatsappMessage =
        `Hi Coach Iskandar! I just took the Pawn Playground quiz.
• Recommended Program: ${data.title}
• Student Age: ${ageText}
• Experience: ${expText}
• Format: ${formatText}
Could you share the available class schedule and fees for this track?`;

      const encodedUrl = `${WHATSAPP_BASE}${encodeURIComponent(whatsappMessage)}`;
      if (resultWhatsAppCta) {
        resultWhatsAppCta.href = encodedUrl;
      }
    }

    /**
     * Step Navigation Event Listeners
     */
    if (nextBtn1) {
      nextBtn1.addEventListener('click', () => {
        if (!quizState.age) {
          // If none explicitly clicked, pick default
          const defaultOpt = pane1.querySelector('.quiz-option[data-value="8-12"]');
          if (defaultOpt) defaultOpt.click();
        }
        renderStep(2);
      });
    }

    if (nextBtn2) {
      nextBtn2.addEventListener('click', () => {
        if (!quizState.experience) {
          const defaultOpt = pane2.querySelector('.quiz-option[data-value="knows-basic-moves"]');
          if (defaultOpt) defaultOpt.click();
        }
        renderStep(3);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (!quizState.format) {
          const defaultOpt = pane3.querySelector('.quiz-option[data-value="physical"]');
          if (defaultOpt) defaultOpt.click();
        }
        renderStep(4);
      });
    }

    if (backBtn2) {
      backBtn2.addEventListener('click', () => renderStep(1));
    }

    if (backBtn3) {
      backBtn3.addEventListener('click', () => renderStep(2));
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        // Reset selections
        quizWidget.querySelectorAll('.quiz-option').forEach((card) => {
          card.classList.remove('selected');
        });
        quizState.age = null;
        quizState.ageValue = null;
        quizState.experience = null;
        quizState.experienceValue = null;
        quizState.format = null;
        quizState.formatValue = null;

        renderStep(1);
      });
    }
  }

  /* ==========================================================================
     3. DYNAMIC PRE-FILLED WHATSAPP ROUTING FOR ALL SITE CTAS
     ========================================================================== */
  function setupWhatsAppLinks() {
    // 1. Program Tier Cards
    const programCardLinks = [
      {
        selector: '#programs .program-card:nth-of-type(1) .btn-whatsapp',
        program: 'Beginner Foundation',
        message: 'Hi Coach Iskandar! I would like to inquire about the Beginner Foundation Chess Program for my child. Could you share available timeslots and enrollment details?'
      },
      {
        selector: '#programs .program-card:nth-of-type(2) .btn-whatsapp',
        program: 'Intermediate Tactical & School Club',
        message: 'Hi Coach Iskandar! I am interested in the Intermediate Tactical & School Club Program. Could you share the current class schedule and timeslots?'
      },
      {
        selector: '#programs .program-card:nth-of-type(3) .btn-whatsapp',
        program: 'Advanced MSSD / MSSM Tournament Prep',
        message: 'Hi Coach Iskandar! I would like to inquire about the Advanced MSSD/MSSM Tournament Prep Program for competitive tournament play. Could you share the details on intensive sessions?'
      }
    ];

    programCardLinks.forEach((item) => {
      const btn = document.querySelector(item.selector);
      if (btn) {
        btn.href = `${WHATSAPP_BASE}${encodeURIComponent(item.message)}`;
      }
    });

    // 2. Navbar CTA Button
    const navCta = document.querySelector('.site-header .btn-whatsapp');
    if (navCta) {
      const navMsg = 'Hi Coach Iskandar! I would like to book a chess trial session for my child at Pawn Playground. What timeslots are available this week?';
      navCta.href = `${WHATSAPP_BASE}${encodeURIComponent(navMsg)}`;
    }

    // 3. Hero Section Primary CTA
    const heroCta = document.querySelector('.hero-actions .btn-whatsapp');
    if (heroCta) {
      const heroMsg = 'Hi Coach Iskandar! I am interested in chess coaching at Pawn Playground in Shah Alam and would like to inquire about a trial.';
      heroCta.href = `${WHATSAPP_BASE}${encodeURIComponent(heroMsg)}`;
    }

    // 4. Contact Section CTA
    const contactCta = document.querySelector('#contact .btn-whatsapp');
    if (contactCta) {
      const contactMsg = 'Hi Coach Iskandar! I would like to inquire about Pawn Playground chess classes at the Shah Alam Training Centre and online.';
      contactCta.href = `${WHATSAPP_BASE}${encodeURIComponent(contactMsg)}`;
    }

    // 5. Footer CTA Button
    const footerCta = document.querySelector('.site-footer .btn-whatsapp');
    if (footerCta) {
      const footerMsg = 'Hi Coach Iskandar! I would like to inquire about chess coaching at Pawn Playground.';
      footerCta.href = `${WHATSAPP_BASE}${encodeURIComponent(footerMsg)}`;
    }
  }

  setupWhatsAppLinks();

  /* ==========================================================================
     4. NAVIGATION, MOBILE HAMBURGER MENU & SCROLL POLISH
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('mobile-open');

      const iconSpan = mobileToggle.querySelector('.hamburger-icon');
      if (iconSpan) {
        iconSpan.innerHTML = isExpanded ? '&#9776;' : '&times;';
      }
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const iconSpan = mobileToggle.querySelector('.hamburger-icon');
        if (iconSpan) iconSpan.innerHTML = '&#9776;';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const iconSpan = mobileToggle.querySelector('.hamburger-icon');
        if (iconSpan) iconSpan.innerHTML = '&#9776;';
      }
    });
  }

  // Smooth scroll offset for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 76;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active link scroll spy via IntersectionObserver
  const sections = document.querySelectorAll('section[id], header[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ==========================================================================
  5. INTERACTIVE MATE-IN-1 TACTICAL PUZZLE ENGINE
       ========================================================================== */
  const boardEl = document.getElementById('interactiveChessBoard');
  if (boardEl) {
    const puzzleTitleEl = document.getElementById('puzzleTitle');
    const statusBadgeEl = document.getElementById('puzzleStatusBadge');
    const hintTextEl = document.getElementById('puzzleHintText');
    const resetBtn = document.getElementById('puzzleResetBtn');
    const nextBtn = document.getElementById('puzzleNextBtn');

    const PIECES = {
      K: '&#9812;', Q: '&#9813;', R: '&#9814;', B: '&#9815;', N: '&#9816;', P: '&#9817;',
      k: '&#9818;', q: '&#9819;', r: '&#9820;', b: '&#9821;', n: '&#9822;', p: '&#9823;'
    };

    const PUZZLES = [
      {
        title: 'Puzzle 1: Back-Rank Mate',
        hint: 'Black’s King is trapped behind its own pawns. Look at the 8th rank!',
        pieces: { g8: 'k', f7: 'p', g7: 'p', h7: 'p', e1: 'R', g1: 'K' },
        winFrom: 'e1',
        winTo: 'e8',
        winNote: 'Checkmate! Re8# exploits the weak back rank.'
      },
      {
        title: 'Puzzle 2: Queen & Bishop Battery',
        hint: 'Team up your Queen and Bishop on the f7 square.',
        pieces: { g8: 'k', a8: 'r', f7: 'p', g7: 'p', h7: 'p', f3: 'Q', c4: 'B', g1: 'K' },
        winFrom: 'f3',
        winTo: 'f7',
        winNote: 'Checkmate! Qxf7# is protected by the Bishop on c4.'
      },
      {
        title: 'Puzzle 3: Knight & Queen Attack',
        hint: 'The Black King in the corner has zero escape squares.',
        pieces: { h8: 'k', g8: 'r', g7: 'p', h7: 'p', e5: 'N', h5: 'Q', g1: 'K' },
        winFrom: 'e5',
        winTo: 'f7',
        winNote: 'Checkmate! Nf7# delivers a classic corner mate.'
      }
    ];

    let currentPuzzleIdx = 0;
    let boardState = {};
    let selectedSq = null;
    let isSolved = false;

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    function loadPuzzle(idx) {
      const p = PUZZLES[idx];
      boardState = { ...p.pieces };
      selectedSq = null;
      isSolved = false;

      if (puzzleTitleEl) puzzleTitleEl.textContent = p.title;
      if (statusBadgeEl) {
        statusBadgeEl.textContent = 'White to Move • Mate in 1';
        statusBadgeEl.classList.remove('badge-solved');
      }
      if (hintTextEl) hintTextEl.textContent = p.hint;
      renderBoard();
    }

    function renderBoard(highlightSq = null, highlightClass = '') {
      boardEl.innerHTML = '';
      ranks.forEach((rank, rIdx) => {
        files.forEach((file, fIdx) => {
          const sqId = `${file}${rank}`;
          const sqDiv = document.createElement('div');
          const isLight = (rIdx + fIdx) % 2 === 0;
          sqDiv.className = `chess-sq ${isLight ? 'light' : 'dark'}`;
          sqDiv.dataset.sq = sqId;

          if (sqId === selectedSq) sqDiv.classList.add('selected-sq');
          if (sqId === highlightSq && highlightClass) sqDiv.classList.add(highlightClass);

          const pieceCode = boardState[sqId];
          if (pieceCode && PIECES[pieceCode]) {
            sqDiv.innerHTML = PIECES[pieceCode];
          }

          sqDiv.addEventListener('click', () => handleSquareClick(sqId));
          boardEl.appendChild(sqDiv);
        });
      });
    }

    function handleSquareClick(sqId) {
      if (isSolved) return;

      const piece = boardState[sqId];
      const isWhitePiece = piece && piece === piece.toUpperCase();

      // Select a White piece
      if (isWhitePiece) {
        selectedSq = selectedSq === sqId ? null : sqId;
        renderBoard();
        return;
      }

      // Attempt move if a White piece is already selected
      if (selectedSq) {
        const p = PUZZLES[currentPuzzleIdx];
        if (selectedSq === p.winFrom && sqId === p.winTo) {
          // Correct Mate in 1!
          boardState[sqId] = boardState[selectedSq];
          delete boardState[selectedSq];
          selectedSq = null;
          isSolved = true;

          if (statusBadgeEl) {
            statusBadgeEl.textContent = 'Checkmate! Solved';
            statusBadgeEl.classList.add('badge-solved');
          }
          if (hintTextEl) hintTextEl.textContent = p.winNote;
          renderBoard(sqId, 'solved-sq');
        } else {
          // Incorrect square feedback
          const prevFrom = selectedSq;
          const movedPiece = boardState[prevFrom];
          const capturedPiece = boardState[sqId];

          boardState[sqId] = movedPiece;
          delete boardState[prevFrom];
          selectedSq = null;
          if (hintTextEl) hintTextEl.textContent = 'Not quite — look for a direct checkmate!';
          renderBoard(sqId, 'wrong-sq');

          setTimeout(() => {
            boardState[prevFrom] = movedPiece;
            if (capturedPiece) {
              boardState[sqId] = capturedPiece;
            } else {
              delete boardState[sqId];
            }
            if (hintTextEl) hintTextEl.textContent = p.hint;
            renderBoard();
          }, 850);
        }
      }
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => loadPuzzle(currentPuzzleIdx));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentPuzzleIdx = (currentPuzzleIdx + 1) % PUZZLES.length;
        loadPuzzle(currentPuzzleIdx);
      });
    }

    loadPuzzle(0);
  }
});
