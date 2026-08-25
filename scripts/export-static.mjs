// Exporte le site en 100% statique (HTML + CSS + JS + images) dans dist/static/
// Utilisation : npm run build && node scripts/export-static.mjs
// Le dossier dist/static peut ensuite être uploadé par FTP sur un hébergement mutualisé.
import { spawn } from "node:child_process";
import { cp, mkdir, writeFile, rm } from "node:fs/promises";

const PORT = 4183;
const OUT = "dist/static";

const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--host", "127.0.0.1"], {
  stdio: ["ignore", "inherit", "inherit"],
});

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/`);
      if (res.ok) return await res.text();
    } catch {
      /* pas encore prêt */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Le serveur de preview n'a pas démarré");
}

try {
  const html = await waitForServer();
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await cp("dist/client", OUT, { recursive: true });
  await rm(`${OUT}/_headers`, { force: true });
  await writeFile(`${OUT}/index.html`, html);
  // Fallback pour les URLs inconnues (une seule page ici)
  await writeFile(`${OUT}/404.html`, html);
  await writeFile(
    `${OUT}/.htaccess`,
    `# Hébergement mutualisé Apache : cache des assets + fallback vers index.html
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
`,
  );
  console.log(`✔ Site statique généré dans ${OUT}/`);
} finally {
  preview.kill("SIGKILL");
}
