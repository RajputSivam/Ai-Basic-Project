# 🤖 AI Interview Preparation App

A smart, AI-powered interview preparation tool built with **HTML, CSS, and JavaScript** — powered by **Anthropic Claude API**. Generate real interview questions, detailed answers, constraints, complexity analysis, and follow-up questions in seconds.

---

## 🚀 Live Demo

> Open `index.html` in your browser after setup.

---

## ✨ Features

- 🎯 **5 Topics** — Java, DSA, Web Development, System Design, Python
- 🎚️ **3 Difficulty Levels** — Easy, Medium, Hard
- 📝 **AI-Generated Questions** — Real interview-style questions by Claude
- ✦ **Model Answers** — Detailed answers with time & space complexity
- 📐 **Constraints** — LeetCode-style constraints (DSA only)
- ⏱️ **Complexity Analysis** — Average & Worst case (Time + Space)
- ↪ **Follow-up Questions** — 3 follow-ups per question for deep practice
- 🌙 **Dark UI** — Modern, clean, professional design
- ⚡ **Instant Generation** — No page reload, fully dynamic

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML5, CSS3, JavaScript |
| AI Engine  | Anthropic Claude API    |
| Model Used | claude-sonnet-4-20250514|
| Styling    | Pure CSS (no framework) |
| Backend    | None (frontend only)    |

---

## 📁 Project Structure

```
ai-interview-prep/
│
├── index.html       # App structure & layout
├── style.css        # Styling, dark theme, animations
├── script.js        # Logic, API calls, DOM rendering
└── README.md        # Project documentation
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-interview-prep.git
cd ai-interview-prep
```

### 2. Get Your Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / Log in
3. Navigate to **API Keys** → Click **Create Key**
4. Copy your key (starts with `sk-ant-...`)

### 3. Add Your API Key
Open `script.js` and replace:
```js
const API_KEY = "YOUR_API_KEY_HERE";
```
with your actual key:
```js
const API_KEY = "sk-ant-api03-xxxxxxxx...";
```

### 4. Run the App
Simply open `index.html` in your browser:
```bash
# Option 1 - Direct open
open index.html

# Option 2 - VS Code Live Server
# Right click index.html → Open with Live Server
```

---

## 🖥️ How to Use

1. **Select a Topic** — Java, DSA, Web Dev, System Design, or Python
2. **Choose Difficulty** — Easy, Medium, or Hard
3. **Click Generate** — Claude AI generates 3 questions instantly
4. **Click any Card** — Expand to see answer, constraints & follow-ups
5. **Practice** — Use follow-up questions for mock interview practice

---

## 📸 UI Preview

| Section | Description |
|---|---|
| Header | Logo + App title |
| Topic Selector | 5 topic buttons with icons |
| Difficulty | Color-coded Easy / Medium / Hard |
| Question Cards | Expandable cards with full details |
| Complexity Grid | Average & Worst case in a clean grid |

---

## 🔐 Security Note

> ⚠️ This is a **frontend-only** project. The API key is stored in `script.js`.
> **For production use**, move the API call to a backend server.

### Recommended Backend Setup (Node.js + Express):
```
Frontend (HTML/CSS/JS)
        ↓ request
Backend (Node.js / Express)
        ↓ API call with key from .env
Anthropic Claude API
```

```js
// server.js
require('dotenv').config();
const express = require('express');
const app = express();

app.post('/generate', async (req, res) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  });
  res.json(await response.json());
});

app.listen(3000);
```

```env
# .env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxx...
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **Shivam Rajput License**.

---

## 👨‍💻 Shivam Rajput Author

Made with ❤️ using HTML, CSS, JavaScript & Claude AI

> ⭐ Star this repo if you found it helpful!

