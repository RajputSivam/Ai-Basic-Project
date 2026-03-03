# AI Chat Server

A simple Node.js server that connects your chat frontend to the Claude AI API.

## Files

```
project/
├── index.html    # Chat UI
└── server.js     # Backend server
```

## Requirements

- Node.js installed
- Anthropic API key

## Setup

**1. Add your API key in `server.js`**

```js
const API_KEY = 'your-api-key-here';
```

**2. Run the server**

```bash
node server.js
```

**3. Open in browser**

```
http://localhost:3000
```

## How It Works

- Server runs on port `3000`
- Frontend chat is served from `index.html`
- Messages are sent to `/chat` and forwarded to Claude API
- API key stays safe on the server side

## Troubleshooting

| Problem | Solution |
|---|---|
| Chat not working | Make sure `node server.js` is running |
| API error | Check your API key is correct |
| Port in use | Change `3000` to another port like `3001` |

## License

MIT
