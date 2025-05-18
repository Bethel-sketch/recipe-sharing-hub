# Developer Manual

**Audience:** Developers new to this codebase

## 1. Installation
```bash
npm install

NEXT_PUBLIC_SUPABASE_URL=…
NEXT_PUBLIC_SUPABASE_ANON_KEY=…

npm run dev

GET /api/recipes → fetch all recipes

POST /api/recipes → submit a new recipe

├── docs/
│   └── DEVELOPER_MANUAL.md
├── public/
├── src/
├── package.json
└── README.md
