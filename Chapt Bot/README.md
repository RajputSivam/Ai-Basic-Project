<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>AI Chat — README</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d0d12;
    --paper: #f5f3ee;
    --cream: #ede9e0;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --rust: #c45c3a;
    --slate: #3d3d52;
    --muted: #8a8778;
    --border: #d4cfc4;
    --code-bg: #1a1a22;
    --code-text: #e8e4d9;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background: var(--paper);
    color: var(--ink);
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* Noise texture overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 100;
    opacity: 0.6;
  }

  /* Hero */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 60px;
    overflow: hidden;
    background: var(--ink);
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 20s ease-in-out infinite;
  }

  @keyframes gridDrift {
    0%, 100% { transform: translate(0,0); }
    50% { transform: translate(10px, 8px); }
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: orbFloat 8s ease-in-out infinite;
  }

  .hero-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%);
    top: -100px; right: -100px;
    animation-delay: 0s;
  }

  .hero-orb-2 {
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(196,92,58,0.1), transparent 70%);
    bottom: -50px; left: 100px;
    animation-delay: -4s;
  }

  @keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }

  .hero-content { position: relative; z-index: 1; max-width: 900px; }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(201,168,76,0.12);
    border: 1px solid rgba(201,168,76,0.3);
    border-radius: 100px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    color: var(--gold-light);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 32px;
    animation: fadeSlideDown 0.8s ease forwards;
    opacity: 0;
  }

  .hero-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }

  .hero h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 700;
    line-height: 1.0;
    color: var(--paper);
    animation: fadeSlideDown 0.8s 0.1s ease forwards;
    opacity: 0;
    letter-spacing: -0.02em;
  }

  .hero h1 em {
    font-style: italic;
    font-weight: 300;
    background: linear-gradient(135deg, var(--gold), var(--gold-light), var(--rust));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-sub {
    margin-top: 20px;
    font-size: 18px;
    color: rgba(245,243,238,0.5);
    font-weight: 300;
    max-width: 480px;
    line-height: 1.6;
    animation: fadeSlideDown 0.8s 0.2s ease forwards;
    opacity: 0;
  }

  .hero-tags {
    display: flex;
    gap: 10px;
    margin-top: 40px;
    flex-wrap: wrap;
    animation: fadeSlideDown 0.8s 0.3s ease forwards;
    opacity: 0;
  }

  .tag {
    background: rgba(245,243,238,0.07);
    border: 1px solid rgba(245,243,238,0.12);
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    color: rgba(245,243,238,0.5);
  }

  .scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 60px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(245,243,238,0.25);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    animation: fadeSlideDown 1s 0.6s ease forwards;
    opacity: 0;
  }

  .scroll-line {
    width: 40px;
    height: 1px;
    background: currentColor;
    animation: scrollLine 2s ease-in-out infinite;
  }

  @keyframes scrollLine { 0%{width:20px} 50%{width:50px} 100%{width:20px} }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Main content */
  .content {
    max-width: 860px;
    margin: 0 auto;
    padding: 80px 40px 120px;
  }

  /* Sections */
  .section {
    margin-bottom: 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .section h2 {
    font-family: 'Fraunces', serif;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .section p {
    font-size: 16px;
    color: var(--slate);
    line-height: 1.8;
    margin-bottom: 16px;
  }

  /* File structure */
  .file-tree {
    background: var(--code-bg);
    border-radius: 16px;
    padding: 28px 32px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--code-text);
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .file-tree::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--rust));
  }

  .file-tree-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-r { background: #ff5f56; }
  .dot-y { background: #ffbd2e; }
  .dot-g { background: #27c93f; }

  .file-tree-label {
    margin-left: auto;
    font-size: 11px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.05em;
  }

  .tree-line {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 0;
    color: rgba(232,228,217,0.7);
  }

  .tree-line .icon { color: var(--gold); font-size: 13px; }
  .tree-line .fname { color: var(--code-text); }
  .tree-line .fdesc { color: rgba(255,255,255,0.25); margin-left: 8px; font-size: 12px; }
  .tree-indent { margin-left: 20px; }

  /* Steps */
  .steps { display: flex; flex-direction: column; gap: 0; }

  .step {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 0 24px;
    position: relative;
  }

  .step-num-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step-num {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--paper);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-weight: 700;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    border: 2px solid var(--border);
    transition: all 0.3s;
  }

  .step:hover .step-num {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    transform: scale(1.1);
  }

  .step-line {
    width: 2px;
    flex: 1;
    background: var(--border);
    margin: 4px 0;
    min-height: 24px;
  }

  .step:last-child .step-line { display: none; }

  .step-body {
    padding-bottom: 40px;
    padding-top: 8px;
  }

  .step-body h3 {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--ink);
  }

  .step-body p {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 12px;
  }

  /* Code blocks */
  pre {
    background: var(--code-bg);
    border-radius: 10px;
    padding: 18px 20px;
    overflow-x: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.7;
    color: var(--code-text);
    border: 1px solid rgba(255,255,255,0.05);
    position: relative;
    margin: 12px 0;
  }

  pre .comment { color: rgba(255,255,255,0.25); }
  pre .key { color: var(--gold-light); }
  pre .str { color: #a8d8a8; }
  pre .kw { color: #c9a0dc; }
  pre .cmd { color: #7ec8e3; }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875em;
    background: var(--cream);
    padding: 2px 7px;
    border-radius: 5px;
    border: 1px solid var(--border);
    color: var(--rust);
  }

  /* Warning / tip boxes */
  .callout {
    display: flex;
    gap: 14px;
    padding: 16px 20px;
    border-radius: 12px;
    margin: 16px 0;
    font-size: 14px;
    line-height: 1.6;
  }

  .callout-warn {
    background: rgba(196,92,58,0.08);
    border: 1px solid rgba(196,92,58,0.2);
    color: var(--rust);
  }

  .callout-tip {
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    color: #7a6020;
  }

  .callout-icon { font-size: 18px; flex-shrink: 0; }

  /* Features grid */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 24px;
  }

  .feature-card {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px;
    transition: all 0.3s;
    cursor: default;
  }

  .feature-card:hover {
    border-color: var(--gold);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.08);
  }

  .feature-icon { font-size: 22px; margin-bottom: 10px; }

  .feature-card h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--ink);
  }

  .feature-card p {
    font-size: 12px;
    color: var(--muted);
    margin: 0;
    line-height: 1.5;
  }

  /* Config table */
  .table-wrap {
    overflow-x: auto;
    border-radius: 14px;
    border: 1px solid var(--border);
    margin-top: 20px;
  }

  table { width: 100%; border-collapse: collapse; }

  thead { background: var(--ink); }

  thead th {
    padding: 14px 20px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(245,243,238,0.5);
  }

  tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }

  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--cream); }

  tbody td {
    padding: 14px 20px;
    font-size: 14px;
    color: var(--slate);
  }

  tbody td:first-child { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--rust); }

  /* Troubleshooting */
  .trouble-item {
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 12px;
    transition: border-color 0.2s;
  }

  .trouble-item:hover { border-color: var(--gold); }

  .trouble-q {
    padding: 16px 20px;
    font-weight: 600;
    font-size: 14px;
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .trouble-q::before {
    content: '?';
    width: 24px; height: 24px;
    background: var(--rust);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .trouble-a {
    padding: 14px 20px;
    font-size: 14px;
    color: var(--slate);
    line-height: 1.7;
  }

  /* Footer */
  footer {
    background: var(--ink);
    padding: 60px 40px;
    text-align: center;
    color: rgba(245,243,238,0.3);
    font-size: 13px;
  }

  footer .footer-logo {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--paper);
    margin-bottom: 8px;
    display: block;
  }

  footer .footer-logo em {
    font-style: italic;
    font-weight: 300;
    color: var(--gold);
  }

  /* Divider */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 60px 0;
  }
</style>
</head>
<body>

<!-- HERO -->
<section class="hero">
  <div class="hero-grid"></div>
  <div class="hero-orb hero-orb-1"></div>
  <div class="hero-orb hero-orb-2"></div>
  <div class="hero-content">
    <div class="hero-badge">Documentation · v1.0</div>
    <h1>AI <em>Chat</em></h1>
    <p class="hero-sub">A minimal, self-hosted chat interface powered by Claude — running entirely on Node.js with no dependencies.</p>
    <div class="hero-tags">
      <span class="tag">Node.js</span>
      <span class="tag">Claude API</span>
      <span class="tag">Vanilla JS</span>
      <span class="tag">No Dependencies</span>
      <span class="tag">MIT License</span>
    </div>
  </div>
  <div class="scroll-hint">
    <span class="scroll-line"></span>
    Scroll to explore
  </div>
</section>

<!-- MAIN CONTENT -->
<div class="content">

  <!-- Structure -->
  <div class="section" id="s1">
    <div class="section-label">Project</div>
    <h2>Structure</h2>
    <p>Two files. That's it. A proxy server keeps your API key off the browser, and the frontend handles the rest.</p>
    <div class="file-tree">
      <div class="file-tree-header">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
        <span class="file-tree-label">project/</span>
      </div>
      <div class="tree-line"><span class="icon">📁</span> <span class="fname">project/</span></div>
      <div class="tree-indent">
        <div class="tree-line"><span class="icon">📄</span> <span class="fname">index.html</span> <span class="fdesc">// Chat UI — dark mode, animated</span></div>
        <div class="tree-line"><span class="icon">⚙️</span> <span class="fname">server.js</span> <span class="fdesc">// Node.js proxy → Anthropic API</span></div>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Prerequisites -->
  <div class="section" id="s2">
    <div class="section-label">Before You Begin</div>
    <h2>Prerequisites</h2>
    <p>You only need two things to get started.</p>
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">🟢</div>
        <h4>Node.js v14+</h4>
        <p>Download from <strong>nodejs.org</strong>. No npm packages required — uses only built-in modules.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔑</div>
        <h4>Anthropic API Key</h4>
        <p>Get yours at <strong>console.anthropic.com</strong>. Needs sufficient credits to call Claude.</p>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Setup -->
  <div class="section" id="s3">
    <div class="section-label">Getting Started</div>
    <h2>Setup in 4 Steps</h2>
    <div class="steps">

      <div class="step">
        <div class="step-num-col">
          <div class="step-num">1</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <h3>Download the project files</h3>
          <p>Clone the repo or copy <code>index.html</code> and <code>server.js</code> into a folder.</p>
          <pre><span class="cmd">git clone</span> &lt;your-repo-url&gt;
<span class="cmd">cd</span> your-project-folder</pre>
        </div>
      </div>

      <div class="step">
        <div class="step-num-col">
          <div class="step-num">2</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <h3>Add your API key</h3>
          <p>Open <code>server.js</code> and paste your Anthropic API key.</p>
          <pre><span class="kw">const</span> <span class="key">API_KEY</span> = <span class="str">'sk-ant-your-actual-key-here'</span>;</pre>
          <div class="callout callout-warn">
            <span class="callout-icon">⚠️</span>
            <div>Never commit your API key to version control. Use environment variables for production.</div>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num-col">
          <div class="step-num">3</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <h3>Start the server</h3>
          <p>Run this command in your terminal from the project folder.</p>
          <pre><span class="cmd">node</span> server.js
<span class="comment"># → Open: http://localhost:3000</span></pre>
        </div>
      </div>

      <div class="step">
        <div class="step-num-col">
          <div class="step-num">4</div>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <h3>Open the app</h3>
          <p>Visit the address in your browser and start chatting.</p>
          <pre><span class="str">http://localhost:3000</span></pre>
        </div>
      </div>

    </div>
  </div>

  <div class="divider"></div>

  <!-- Env vars -->
  <div class="section" id="s4">
    <div class="section-label">Recommended</div>
    <h2>Environment Variables</h2>
    <p>Keep your key out of code by reading it from the environment instead.</p>

    <pre><span class="comment"># macOS / Linux</span>
<span class="cmd">export</span> <span class="key">ANTHROPIC_API_KEY</span>=sk-ant-your-key-here
<span class="cmd">node</span> server.js

<span class="comment"># Windows (Command Prompt)</span>
<span class="cmd">set</span> <span class="key">ANTHROPIC_API_KEY</span>=sk-ant-your-key-here
<span class="cmd">node</span> server.js</pre>

    <p>Then update <code>server.js</code>:</p>
    <pre><span class="kw">const</span> <span class="key">API_KEY</span> = process.<span class="key">env</span>.<span class="key">ANTHROPIC_API_KEY</span>;</pre>

    <div class="callout callout-tip">
      <span class="callout-icon">💡</span>
      <div>You can also create a <code>.env</code> file and use a tool like <strong>dotenv</strong> to load variables automatically in development.</div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Features -->
  <div class="section" id="s5">
    <div class="section-label">What's Inside</div>
    <h2>Features</h2>
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">💬</div>
        <h4>Multi-turn Chat</h4>
        <p>Full conversation history maintained across the session.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⌨️</div>
        <h4>Typing Indicator</h4>
        <p>Animated dots while Claude generates a response.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🌙</div>
        <h4>Dark Mode UI</h4>
        <p>Polished dark interface with gradient accents and blur effects.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h4>Quick Suggestions</h4>
        <p>Clickable prompt chips to jump-start conversations.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h4>Responsive</h4>
        <p>Works on desktop and mobile browsers.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h4>Secure Proxy</h4>
        <p>API key stays server-side and never reaches the browser.</p>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Config -->
  <div class="section" id="s6">
    <div class="section-label">Reference</div>
    <h2>Configuration</h2>
    <p>All tuneable settings and where to find them.</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>File</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>API Key</td><td><code>server.js</code></td><td><em>Required</em></td></tr>
          <tr><td>Port</td><td><code>server.js</code></td><td><code>3000</code></td></tr>
          <tr><td>Model</td><td><code>index.html</code> fetch body</td><td><code>claude-sonnet-4-20250514</code></td></tr>
          <tr><td>Max Tokens</td><td><code>index.html</code> fetch body</td><td><code>1000</code></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Troubleshooting -->
  <div class="section" id="s7">
    <div class="section-label">Help</div>
    <h2>Troubleshooting</h2>

    <div class="trouble-item">
      <div class="trouble-q">"Server nahi chal raha" error appears in chat</div>
      <div class="trouble-a">The Node.js server is not running. Open a new terminal tab, navigate to the project folder, and run <code>node server.js</code>.</div>
    </div>

    <div class="trouble-item">
      <div class="trouble-q">Error: Port 3000 is already in use</div>
      <div class="trouble-a">Change the port in <code>server.js</code> — find <code>server.listen(3000, ...)</code> and change it to any free port (e.g. <code>3001</code>). Update the fetch URL in <code>index.html</code> to match.</div>
    </div>

    <div class="trouble-item">
      <div class="trouble-q">No response / API errors in the console</div>
      <div class="trouble-a">Double-check your Anthropic API key in <code>server.js</code> and confirm your account has sufficient API credits at <strong>console.anthropic.com</strong>.</div>
    </div>

    <div class="trouble-item">
      <div class="trouble-q">Blank page or nothing loads</div>
      <div class="trouble-a">Make sure <code>index.html</code> and <code>server.js</code> are in the same folder, and that you're accessing the app through <code>http://localhost:3000</code>, not by opening the HTML file directly in the browser.</div>
    </div>

  </div>

</div>

<!-- FOOTER -->
<footer>
  <span class="footer-logo">AI <em>Chat</em></span>
  <p>Built with Node.js · Powered by Claude · MIT License</p>
</footer>

<script>
  // Intersection observer for section animations
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(s => observer.observe(s));
</script>
</body>
</html>
