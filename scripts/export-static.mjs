// Exporte le site en 100% statique (HTML + CSS + JS + images) dans dist/static/
// Utilisation :
//   npm run build && node scripts/export-static.mjs
// Puis envoyez le contenu de dist/static/ par FTP dans le dossier public de votre
// hébergement mutualisé (www / public_html). Aucun serveur Node n'est nécessaire.
import { cp, mkdir, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const OUT = "dist/static";
const ROUTES = ["/"];

const entry = pathToFileURL(resolve("dist/server/index.mjs")).href;
const mod = await import(entry);
const handler = mod.default ?? mod;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp("dist/client", OUT, { recursive: true });
await rm(`${OUT}/_headers`, { force: true });

let firstHtml = "";
for (const route of ROUTES) {
  const res = await handler.fetch(new Request(`http://localhost${route}`), {}, {
    waitUntil() {},
    passThroughOnException() {},
  });
  if (!res.ok) throw new Error(`Rendu de ${route} échoué (${res.status})`);
  const html = await res.text();
  if (!firstHtml) firstHtml = html;
  const file = route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
  await mkdir(resolve(OUT, file, ".."), { recursive: true });
  await writeFile(resolve(OUT, file), html);
  console.log(`✔ ${file}`);
}

await writeFile(`${OUT}/404.html`, firstHtml);
await writeFile(
  `${OUT}/.htaccess`,
  `# Hébergement mutualisé Apache : fallback + cache des assets
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

console.log(`\n✔ Site statique prêt dans ${OUT}/ — à uploader tel quel par FTP.`);
