import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroMockup from "@/assets/hero-mockup.jpg";
import portfolioArtisan from "@/assets/portfolio-artisan.jpg";
import portfolioServices from "@/assets/portfolio-services.jpg";
import portfolioConsultant from "@/assets/portfolio-consultant.jpg";

const TITLE = "Swift.io — Sites web clé en main pour indépendants";
const DESCRIPTION =
  "Swift.io crée des sites web modernes, rapides et optimisés SEO pour les auto-entrepreneurs et indépendants. Livraison rapide, 100% propriétaire.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Swift.io",
          description: DESCRIPTION,
          areaServed: "FR",
          serviceType: "Création de sites web pour indépendants",
        }),
      },
    ],
  }),
  component: Landing,
});

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Notre Méthode", href: "#methode" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#swiftGrad)" />
        <path d="M21 10H14.5a3.5 3.5 0 0 0 0 7H18a3.5 3.5 0 0 1 0 7H11" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="swiftGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.23 268)" />
            <stop offset="100%" stopColor="oklch(0.78 0.14 200)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-lg font-extrabold tracking-tight">Swift.io</span>
    </span>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Header />
      <main>
        <Hero />
        <Values />
        <Portfolio />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:flex lg:justify-between">
        <a href="#top" className="min-w-0">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Demander un devis
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            className="rounded-xl border border-border p-2.5 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-muted-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setOpen(false)} className="block text-sm font-semibold text-primary">
                Demander un devis
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="surface-hero relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div className="min-w-0">
          <span className="glass-card inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-surface-foreground/85">
            Agence digitale • Indépendants &amp; auto-entrepreneurs
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-surface-foreground sm:text-5xl lg:text-[3.4rem]">
            Votre site web professionnel, clé en main et conçu pour{" "}
            <span className="text-gradient-brand">attirer vos clients.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-surface-foreground/70 sm:text-lg">
            Nous créons des sites modernes, rapides et optimisés pour les auto-entrepreneurs et
            indépendants. Démarquez-vous sans vous soucier de la technique.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Lancer mon projet
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#realisations"
              className="glass-card inline-flex items-center rounded-xl px-6 py-3.5 text-sm font-semibold text-surface-foreground transition-colors hover:bg-surface-foreground/15"
            >
              Découvrir nos créations
            </a>
          </div>
          <p className="mt-8 text-sm font-medium text-surface-foreground/60">
            ✓ 100% Propriétaire • Livraison rapide • Support dédié
          </p>
        </div>
        <div className="min-w-0">
          <img
            src={heroMockup}
            alt="Aperçu d'un site web moderne créé par Swift.io sur ordinateur et mobile"
            width={1408}
            height={1008}
            className="w-full rounded-2xl shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}

const VALUES = [
  {
    title: "Design Sur-Mesure",
    text: "Des visuels élégants et une identité adaptée à votre métier, pas un template générique.",
    icon: "M4 18 L10 6 L14 14 L17 9 L20 18",
  },
  {
    title: "Optimisé SEO Local",
    text: "Structure et contenus pensés pour être trouvable facilement sur Google dans votre ville.",
    icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M20 20l-4.5-4.5",
  },
  {
    title: "Adapté Mobile & Rapide",
    text: "Une expérience utilisateur fluide sur smartphone et des temps de chargement minimaux.",
    icon: "M8 3h8v18H8zM11 18h2",
  },
  {
    title: "Zéro Prise de Tête",
    text: "On s'occupe de l'hébergement, du nom de domaine et de toute la partie technique.",
    icon: "M12 3l8 4v6c0 4.5-3.4 7.3-8 8-4.6-.7-8-3.5-8-8V7z",
  },
];

function Values() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <SectionHeading
        eyebrow="Pourquoi nous faire confiance"
        title="Un site qui travaille pour votre activité"
        text="Quatre engagements simples qui font la différence entre un site vitrine oublié et un vrai outil d'acquisition."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <article
            key={v.title}
            className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d={v.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="mt-5 text-base font-bold tracking-tight">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-cyan" : "text-primary"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${
          light ? "text-surface-foreground" : ""
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-surface-foreground/70" : "text-muted-foreground"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

const PROJECTS = [
  {
    img: portfolioArtisan,
    sector: "Artisan / BTP",
    title: "Menuiserie Delvaux",
    text: "Site vitrine avec galerie de chantiers et formulaire de demande de devis.",
  },
  {
    img: portfolioServices,
    sector: "Prestataire de services",
    title: "Néo Services",
    text: "Présentation des prestations, zone d'intervention et prise de contact rapide.",
  },
  {
    img: portfolioConsultant,
    sector: "Consultant",
    title: "Marc Aubert Conseil",
    text: "Page personnelle sobre, mise en avant de l'expertise et réservation d'appel.",
  },
];

function Portfolio() {
  return (
    <section id="realisations" className="border-y border-border bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Réalisations"
          title="Des sites pensés pour chaque métier"
          text="Trois exemples de sites livrés à des indépendants, avec une même exigence : clarté, rapidité et conversion."
        />
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="overflow-hidden bg-secondary">
                <img
                  src={p.img}
                  alt={`Site web réalisé pour un ${p.sector.toLowerCase()}`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{p.sector}</p>
                <h3 className="mt-2 text-base font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Échange initial & besoins", text: "Un appel de 20 minutes pour comprendre votre activité, vos clients et vos objectifs." },
  { n: "02", title: "Design & intégration rapide", text: "Nous concevons et développons votre site, avec vos textes et vos visuels, en quelques jours." },
  { n: "03", title: "Validation & mise en ligne", text: "Vous validez, nous publions : hébergement, nom de domaine et suivi inclus." },
];

function Process() {
  return (
    <section id="methode" className="surface-hero py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          light
          eyebrow="Notre méthode"
          title="Trois étapes, aucune complexité"
          text="Un processus cadré et transparent, de la première discussion à la mise en ligne."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="glass-card rounded-2xl p-7">
              <span className="text-sm font-extrabold tracking-[0.2em] text-cyan">{s.n}</span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-surface-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-surface-foreground/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Essentiel",
    price: "690 €",
    text: "Idéal pour démarrer avec une présence pro et crédible.",
    features: ["Site 1 page (one-page)", "Design sur-mesure", "Formulaire de contact", "Mise en ligne incluse"],
    featured: false,
  },
  {
    name: "Professionnel",
    price: "1 190 €",
    text: "Le choix des indépendants qui veulent générer des demandes.",
    features: ["Jusqu'à 5 pages", "SEO local optimisé", "Galerie / réalisations", "Support dédié 3 mois"],
    featured: true,
  },
  {
    name: "Sur-mesure",
    price: "Sur devis",
    text: "Projets spécifiques : réservation, catalogue, multilingue.",
    features: ["Fonctionnalités avancées", "Contenus rédigés", "Suivi mensuel", "Évolutions continues"],
    featured: false,
  },
];

function Pricing() {
  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <SectionHeading
        eyebrow="Tarifs"
        title="Des offres claires, sans surprise"
        text="Prix fixes annoncés à l'avance. Vous restez 100% propriétaire de votre site et de votre nom de domaine."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p) => (
          <article
            key={p.name}
            className={`rounded-2xl border p-8 ${
              p.featured
                ? "border-primary/30 bg-card shadow-lift lg:-translate-y-3"
                : "border-border bg-card shadow-soft"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold tracking-tight">{p.name}</h3>
              {p.featured && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                  Populaire
                </span>
              )}
            </div>
            <p className="mt-5 text-3xl font-extrabold tracking-tight">{p.price}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                p.featured
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "border border-border bg-background text-foreground"
              }`}
            >
              Demander un devis
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  { q: "En combien de temps mon site est-il livré ?", a: "Comptez 5 à 10 jours ouvrés pour un site vitrine, à partir de la réception de vos contenus." },
  { q: "Suis-je vraiment propriétaire de mon site ?", a: "Oui. Le nom de domaine, l'hébergement et les fichiers sont à votre nom. Vous partez avec tout si vous le souhaitez." },
  { q: "Je n'ai ni textes ni photos, c'est un problème ?", a: "Non. Nous pouvons rédiger les textes et sélectionner des visuels professionnels adaptés à votre métier." },
  { q: "Puis-je modifier mon site moi-même ?", a: "Oui, nous vous formons à la prise en main, et notre support dédié reste disponible pour les changements plus techniques." },
  { q: "Y a-t-il des frais récurrents ?", a: "Seuls l'hébergement et le nom de domaine, à partir de 12 €/mois, maintenance et sauvegardes incluses." },
];

function Faq() {
  return (
    <section id="faq" className="border-y border-border bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="FAQ" title="Les questions que l'on nous pose le plus" />
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold tracking-tight">
                {f.q}
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de votre projet"
            text="Décrivez votre activité en quelques lignes : nous revenons vers vous sous 24h avec une proposition claire et un délai précis."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li>contact@swift.io</li>
            <li>+33 6 12 34 56 78</li>
            <li>Du lundi au vendredi, 9h – 18h</li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-2xl border border-border bg-card p-7 shadow-lift sm:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom complet" name="name" placeholder="Camille Martin" required />
            <Field label="Activité / Entreprise" name="activity" placeholder="Plomberie Martin" required />
            <Field label="Email" name="email" type="email" placeholder="camille@exemple.fr" required />
            <Field label="Téléphone" name="phone" type="tel" placeholder="06 12 34 56 78" />
          </div>
          <div className="mt-5">
            <label htmlFor="details" className="text-sm font-semibold tracking-tight">
              Votre projet
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              required
              placeholder="Je souhaite un site vitrine pour présenter mes prestations…"
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring"
            />
          </div>
          <button
            type="submit"
            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Envoyer ma demande
          </button>
          <p aria-live="polite" className="mt-4 text-center text-xs text-muted-foreground">
            {sent
              ? "Merci ! Votre demande a bien été prise en compte, nous vous répondons sous 24h."
              : "Réponse sous 24h • Devis gratuit et sans engagement"}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={name} className="text-sm font-semibold tracking-tight">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="surface-hero">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-surface-foreground" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-surface-foreground/60">
              Agence digitale spécialisée dans les sites web clé en main pour indépendants et
              auto-entrepreneurs.
            </p>
          </div>
          <FooterCol
            title="Navigation"
            links={NAV.map((n) => ({ label: n.label, href: n.href }))}
          />
          <FooterCol
            title="Légal"
            links={[
              { label: "Mentions légales", href: "#" },
              { label: "Politique de confidentialité", href: "#" },
              { label: "CGV", href: "#" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { label: "contact@swift.io", href: "mailto:contact@swift.io" },
              { label: "+33 6 12 34 56 78", href: "tel:+33612345678" },
              { label: "Demander un devis", href: "#contact" },
            ]}
          />
        </div>
        <p className="mt-12 border-t border-surface-foreground/10 pt-6 text-xs text-surface-foreground/50">
          © {new Date().getFullYear()} Swift.io — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold tracking-tight text-surface-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-sm text-surface-foreground/60 transition-colors hover:text-surface-foreground">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
