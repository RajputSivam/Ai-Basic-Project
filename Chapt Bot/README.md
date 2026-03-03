# 🍞 AI Chat Server

> Simple Node.js + Claude AI chat app — setup karo 3 minutes mein!

---

## 📁 Files

| File | Kya karta hai |
|---|---|
| `index.html` | Chat ka UI (frontend) |
| `server.js` | Backend server |

---

## ✅ Kya chahiye?

- ✔️ Node.js (nodejs.org se download karo)
- ✔️ Anthropic API Key (console.anthropic.com)

---

## 🚀 Kaise chalayein?

### Step 1 — API Key lagao

`server.js` file kholkar yahan apni key paste karo:

```js
const API_KEY = 'sk-ant-apni-key-yahan-likho';
```

### Step 2 — Server chalao

```bash
node server.js
```

### Step 3 — Browser mein kholo

```
http://localhost:3000
```

---

## ⚙️ Settings

| Setting | File | Default |
|---|---|---|
| Port | `server.js` | `3000` |
| Model | `index.html` | `claude-sonnet-4-20250514` |
| Max Tokens | `index.html` | `1000` |

---

## 🔧 Problem aa rahi hai?

**❌ Chat kaam nahi kar raha**
→ Terminal mein `node server.js` likho

**❌ API error aa raha hai**
→ API key check karo `server.js` mein

**❌ Port already in use**
→ `server.listen(3000)` ko `server.listen(3001)` kar do

**❌ Page load nahi ho raha**
→ `index.html` aur `server.js` ek hi folder mein hone chahiye

---

## 🔐 API Key Safe Karo

API key directly mat likho — environment variable use karo:

```bash
# Mac / Linux
export ANTHROPIC_API_KEY=sk-ant-key-here
node server.js
```

```bash
# Windows
set ANTHROPIC_API_KEY=sk-ant-key-here
node server.js
```

`server.js` mein yeh likhdo:

```js
const API_KEY = process.env.ANTHROPIC_API_KEY;
```

---

## 📄 License

Shivam Rajput — Free hai, use karo, share karo!
