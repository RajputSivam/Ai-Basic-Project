const API_KEY = ""; // PASTE API here my API is paid

let topic = "Java";
let diff  = "Easy";

// ── Topic buttons ─────────────────────────────────────────
document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    topic = btn.dataset.topic;
  });
});

// ── Difficulty buttons ────────────────────────────────────
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    diff = btn.dataset.diff;
  });
});

// ── Toggle card open/close ────────────────────────────────
function toggleCard(header) {
  const body = header.nextElementSibling;
  const chev = header.querySelector('.chevron');
  body.classList.toggle('open');
  chev.classList.toggle('open');
}

// ── Build prompt ──────────────────────────────────────────
function buildPrompt() {
  const isDSA = topic === "DSA";
  return `You are an expert technical interviewer. Generate exactly 3 ${diff} level ${topic} interview questions.

Return ONLY a valid JSON array with this exact structure, no extra text:
[
  {
    "question": "...",
    "difficulty": "${diff}",
    ${isDSA ? `"constraints": ["e.g. 1 <= nums.length <= 10^5", "constraint 2", "constraint 3"],` : ""}
    "answer": "A thorough answer in 3-5 sentences. At the end always mention: Time Complexity: Average Case: O(?), Worst Case: O(?). Space Complexity: Average Case: O(?), Worst Case: O(?).",
    ${isDSA ? `"complexity": {
      "time":  { "average": "O(?)", "worst": "O(?)" },
      "space": { "average": "O(?)", "worst": "O(?)" }
    },` : ""}
    "followups": ["Follow-up 1?", "Follow-up 2?", "Follow-up 3?"]
  }
]`;
}

// ── Render complexity box ─────────────────────────────────
function renderComplexity(c) {
  if (!c) return "";
  return `
    <div class="section">
      <div class="sec-label" style="color:#a78bfa;">⏱ Complexity Analysis</div>
      <div class="complexity-grid">
        <div class="complexity-box">
          <div class="box-title">⏱ TIME</div>
          <div class="complexity-row">
            <span>Average</span><span class="complexity-avg">${c.time.average}</span>
          </div>
          <div class="complexity-row">
            <span>Worst</span><span class="complexity-worst">${c.time.worst}</span>
          </div>
        </div>
        <div class="complexity-box">
          <div class="box-title">💾 SPACE</div>
          <div class="complexity-row">
            <span>Average</span><span class="complexity-avg">${c.space.average}</span>
          </div>
          <div class="complexity-row">
            <span>Worst</span><span class="complexity-worst">${c.space.worst}</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ── Render constraints ────────────────────────────────────
function renderConstraints(arr) {
  if (!arr) return "";
  const items = arr.map(c => `<li class="constraint-item">${c}</li>`).join("");
  return `
    <div class="section">
      <div class="sec-label" style="color:#f59e0b;">📐 Constraints</div>
      <ul class="follow-list">${items}</ul>
    </div>`;
}

// ── Render one card ───────────────────────────────────────
function renderCard(q, i) {
  const diffClass =
    q.difficulty === "Easy"   ? "diff-easy"   :
    q.difficulty === "Medium" ? "diff-medium" : "diff-hard";

  const followHTML = q.followups.map(f => `<li>${f}</li>`).join("");

  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `
    <div class="q-header" onclick="toggleCard(this)">
      <div class="q-num">${i + 1}</div>
      <div class="q-text">${q.question}</div>
      <span class="diff-tag ${diffClass}">${q.difficulty}</span>
      <span class="chevron">▾</span>
    </div>
    <div class="q-body">
      ${renderConstraints(q.constraints)}
      <div class="section">
        <div class="sec-label answer-label">✦ Model Answer</div>
        <div class="sec-content">${q.answer}</div>
      </div>
      ${renderComplexity(q.complexity)}
      <div class="section">
        <div class="sec-label follow-label">↪ Follow-up Questions</div>
        <ul class="follow-list">${followHTML}</ul>
      </div>
    </div>`;
  return card;
}

// ── Generate button ───────────────────────────────────────
document.getElementById('genBtn').addEventListener('click', async () => {
  const btn = document.getElementById('genBtn');
  const out = document.getElementById('output');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width:20px;height:20px;border-width:2px;display:inline-block;"></span> Generating...';
  out.innerHTML = `<div class="loading"><div class="spinner"></div><p>Claude is crafting your questions…</p></div>`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: buildPrompt() }]
      })
    });

    const data = await res.json();
    const raw   = data.content.map(i => i.text || "").join("");
    const clean = raw.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(clean);

    out.innerHTML = "";
    questions.forEach((q, i) => out.appendChild(renderCard(q, i)));

  } catch (e) {
    out.innerHTML = `<div class="error">⚠️ Failed to generate questions. Please check your API key and try again.<br><small>${e.message}</small></div>`;
  }

  btn.disabled = false;
  btn.innerHTML = '<span>⚡</span> Generate Interview Questions';
});