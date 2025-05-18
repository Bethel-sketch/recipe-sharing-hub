# Recipe Sharing Hub

A community-driven recipe gallery where users can browse, submit, and delete recipes. Built with Next.js, Supabase, and modern React libraries to provide a seamless, interactive experience.

---

## 🎯 Target Browsers

Tested on:

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Mobile (iOS Safari, Chrome for Android)

---

## 📖 Developer Manual

See the [Developer Manual](docs/DEVELOPER_MANUAL.md) for detailed setup instructions, API docs, and project structure.

---

## 🚀 Installation & Dependencies

1. **Clone the repo**:

   ```bash
   git clone https://github.com/Bethel-sketch/recipe-sharing-hub.git
   cd recipe-sharing-hub
   ```
2. **Install**:

   ```bash
   npm install
   ```
3. **Environment**:

   * Create a file named `.env.local` in the project root.
   * Add:

     ```bash
     NEXT_PUBLIC_SUPABASE_URL=https://<YOUR-PROJECT-REF>.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR-ANON-PUBLIC-KEY>
     ```

---

## 🏃 Running Locally

```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 🛠 API Endpoints

| Method | Path                | Description                           |
| ------ | ------------------- | ------------------------------------- |
| GET    | `/api/recipes`      | Fetch all recipes (most recent first) |
| POST   | `/api/recipes`      | Create a new recipe                   |
| DELETE | `/api/recipes/[id]` | Delete a recipe by ID                 |

---

## 🧪 Tests

No automated tests have been written yet. Future improvements include adding Jest and React Testing Library coverage.

---

## 🐞 Known Bugs & Future Roadmap

* **Delete button clipping** on narrow screens (will refine responsive styling).
* **About** page is pending (to provide project overview and external API fetch).
* **Pagination** for large recipe lists.
* **User authentication** for real user profiles and secure CRUD.
* **Comments & favorites** functionality.

---

## 📦 Deployment

The app is configured for **Vercel**. After pushing to `main`:

1. Connect the GitHub repo in Vercel.
2. Set environment variables in Vercel Dashboard (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Deploy the `main` branch.

Your live site will be available at `https://recipe-sharing-hub.vercel.app` (or your custom domain).
