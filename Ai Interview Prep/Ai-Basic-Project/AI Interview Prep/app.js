const API_KEY = "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";

let topic = "Java";
let diff  = "Easy";

document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    topic = btn.dataset.topic;
  });
});

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    diff = btn.dataset.diff;
  });
});

function toggleCard(header) {
  const body = header.nextElementSibling;
  const chev = header.querySelector('.chevron');
  body.classList.toggle('open');
  chev.classList.toggle('open');
}

function buildPrompt() {
  const isDSA  = topic === "DSA";
  const isDBMS = topic === "DBMS SQL Queries";
  const isOOPs = topic === "OOPs Java";

  if (isDBMS) {
    return `You are an expert database interviewer. Generate exactly 3 ${diff} level DBMS and SQL interview questions.
Return ONLY a valid JSON array, no extra text:
[
  {
    "question": "A real interview question about DBMS concepts or SQL queries",
    "difficulty": "${diff}",
    "answer": "A thorough explanation in 3-5 sentences covering the concept clearly.",
    "sql_example": "SELECT example FROM table WHERE condition;",
    "followups": ["Follow-up 1?", "Follow-up 2?", "Follow-up 3?"]
  }
]`;
  }

  if (isOOPs) {
    return `You are an expert Java OOPs interviewer. Generate exactly 3 ${diff} level Object-Oriented Programming in Java interview questions.
Return ONLY a valid JSON array, no extra text:
[
  {
    "question": "A real OOPs Java interview question on inheritance, polymorphism, encapsulation, abstraction, interfaces etc.",
    "difficulty": "${diff}",
    "answer": "A thorough answer in 3-5 sentences with Java-specific details.",
    "code_example": "public class Example { // relevant Java code }",
    "followups": ["Follow-up 1?", "Follow-up 2?", "Follow-up 3?"]
  }
]`;
  }

  return `You are an expert technical interviewer. Generate exactly 3 ${diff} level ${topic} interview questions.
Return ONLY a valid JSON array, no extra text:
[
  {
    "question": "...",
    "difficulty": "${diff}",
    ${isDSA ? `"constraints": ["1 <= nums.length <= 10^5", "constraint 2"],` : ""}
    "answer": "Thorough answer in 3-5 sentences.",
    ${isDSA ? `"complexity": { "time": { "average": "O(?)", "worst": "O(?)" }, "space": { "average": "O(?)", "worst": "O(?)" } },` : ""}
    "followups": ["Follow-up 1?", "Follow-up 2?", "Follow-up 3?"]
  }
]`;
}

function renderComplexity(c) {
  if (!c) return "";
  return `
    <div class="section">
      <div class="sec-label" style="color:#a78bfa;">⏱ Complexity Analysis</div>
      <div class="complexity-grid">
        <div class="complexity-box">
          <div class="box-title">⏱ TIME</div>
          <div class="complexity-row"><span>Average</span><span class="complexity-avg">${c.time.average}</span></div>
          <div class="complexity-row"><span>Worst</span><span class="complexity-worst">${c.time.worst}</span></div>
        </div>
        <div class="complexity-box">
          <div class="box-title">💾 SPACE</div>
          <div class="complexity-row"><span>Average</span><span class="complexity-avg">${c.space.average}</span></div>
          <div class="complexity-row"><span>Worst</span><span class="complexity-worst">${c.space.worst}</span></div>
        </div>
      </div>
    </div>`;
}

function renderConstraints(arr) {
  if (!arr) return "";
  const items = arr.map(c => `<li class="constraint-item">${c}</li>`).join("");
  return `
    <div class="section">
      <div class="sec-label" style="color:#f59e0b;">📐 Constraints</div>
      <ul class="follow-list">${items}</ul>
    </div>`;
}

function renderSQL(sql) {
  if (!sql) return "";
  return `
    <div class="section">
      <div class="sec-label" style="color:#06b6d4;">🗄️ SQL Example</div>
      <pre class="code-block">${sql}</pre>
    </div>`;
}

function renderCode(code) {
  if (!code) return "";
  return `
    <div class="section">
      <div class="sec-label" style="color:#f59e0b;">💻 Code Example</div>
      <pre class="code-block">${code}</pre>
    </div>`;
}

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
      ${renderSQL(q.sql_example)}
      ${renderCode(q.code_example)}
      ${renderComplexity(q.complexity)}
      <div class="section">
        <div class="sec-label follow-label">↪ Follow-up Questions</div>
        <ul class="follow-list">${followHTML}</ul>
      </div>
    </div>`;
  return card;
}

document.getElementById('genBtn').addEventListener('click', async () => {
  const btn = document.getElementById('genBtn');
  const out = document.getElementById('output');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width:20px;height:20px;border-width:2px;display:inline-block;"></span> Generating...';
  out.innerHTML = `<div class="loading"><div class="spinner"></div><p>AI is crafting your questions…</p></div>`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        // "HTTP-Referer": "http://localhost:5500",
        "HTTP-Referer": "https://rajputsivam.github.io",
        "X-Title": "AI Interview Prep"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        max_tokens: 1500,
        messages: [{ role: "user", content: buildPrompt() }]
      })
    });

    const data = await res.json();
    const raw   = data.choices[0].message.content;
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

