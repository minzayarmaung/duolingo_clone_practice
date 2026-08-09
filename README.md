# English Speaking Partner

A Next.js + Tailwind implementation of the picture-description speaking exercise.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Microphone recording uses the browser MediaRecorder API and needs browser permission.

## Vercel deployment

Use the default install command and set the **Build Command** to `npm run build`. Do not use `npm.cmd` on Vercel: it runs Linux, where the Windows-only `npm.cmd` executable does not exist.

## Practice picture library

Place `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, or `.avif` images in `public/practice-images/`. The app automatically shows them in the picture library, including preview, selection, and **Random photo** support. It is safe to leave the folder empty until you are ready to add photos.
