import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import her1 from "@/assets/her-1.jpg";
import her2 from "@/assets/her-2.jpg";
import her3 from "@/assets/her-3.jpg";
import her4 from "@/assets/her-4.jpg";
import her5 from "@/assets/her-5.jpg";

const PHOTOS = [her1, her2, her3, her4, her5];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Table for Two — You're Invited" },
      { name: "description", content: "A fine dining first date invitation, served with wit and a little romance." },
      { property: "og:title", content: "A Table for Two" },
      { property: "og:description", content: "A fine dining first date invitation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CAPTIONS = [
  "Exhibit A: the reason I stopped pretending to be busy.",
  "This face has a 100% success rate at distracting me. It must be AI",
  "Proof that the camera loves you. Get in line, camera.",
  "I'd swipe right on this in every universe.",
  "Saving this picture for the 'this is her' conversations.",
];

const MENU = [
  ["Amuse-Bouche", "Nervous small talk, lightly seasoned with awkward laughter"],
  ["Entrée", "Finally hearing your voice — no buffering, no typos"],
  ["Main Course", "A candlelit table, fine food, and pretending I'm not staring"],
  ["Palate Cleanser", "Me admitting I practised this conversation in the mirror"],
  ["Dessert", "Something sweet. The dessert, too."],
];

function Photo({ i }: { i: number }) {
  const key = `date-photo-${i}`;
  const [src, setSrc] = useState<string>(PHOTOS[i]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setSrc(saved);
    } catch {}
  }, [key]);
  const onFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const v = r.result as string;
      setSrc(v);
      try { localStorage.setItem(key, v); } catch {}
    };
    r.readAsDataURL(f);
  };
  const tilt = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"][i];
  return (
    <figure className={`bg-cream p-3 pb-4 shadow-2xl ${tilt} transition hover:rotate-0 hover:scale-105`}>
      <label className="block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-background/90">
        {src ? (
          <img src={src} alt={`Her photo ${i + 1}`} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center px-4 text-center font-display text-lg italic text-gold">
            Tap to add photo {i + 1}
          </span>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>
      <figcaption className="mt-3 text-center font-display text-base italic text-primary-foreground">
        {CAPTIONS[i]}
      </figcaption>
    </figure>
  );
}

function Index() {
  const [yes, setYes] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const noLines = ["No", "Are you sure?", "Really sure?", "The chef will cry", "Try again 🙃", "Nope, not allowed"];
  const dodge = () => {
    setNoPos({ x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 160 });
    setNoCount((c) => Math.min(c + 1, noLines.length - 1));
  };

  return (
    <main className="relative overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="petal text-xl" style={{ left: `${(i * 7.3) % 100}%`, animationDuration: `${10 + (i % 5) * 3}s`, animationDelay: `${i * 1.3}s` }}>♥</span>
      ))}

      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-gold">Reservation · Table for Two</p>
        <h1 className="mt-6 max-w-3xl text-6xl leading-tight md:text-8xl">
          We've shared a thousand texts.<br /><em className="text-gold">Let's share a dinner.</em>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          I've done the research, read the reviews, and practised pronouncing the menu. The only thing missing is you.
        </p>
        <a href="#gallery" className="mt-12 font-display text-xl italic text-gold underline-offset-8 hover:underline">Scroll down, gorgeous ↓</a>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-5xl">The Evidence</h2>
        <p className="mt-3 text-center text-muted-foreground">Why I simply had to ask you out, in five parts.</p>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => <Photo key={i} i={i} />)}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-24">
        <div className="border border-border p-10 text-center md:p-16">
          <p className="text-sm uppercase tracking-[0.4em] text-gold">Tasting Menu</p>
          <h2 className="mt-4 text-5xl">Ce Soir</h2>
          <div className="mt-12 space-y-10">
            {MENU.map(([c, d]) => (
              <div key={c}>
                <h3 className="text-3xl italic text-gold">{c}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-muted-foreground">Dress code: Think Fine dining with a touch of sexy.</p>
        </div>
      </section>

      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pb-24 text-center">
        {yes ? (
          <>
            <h2 className="text-6xl text-gold">It's a date. ♥</h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">Excellent choice. I'll handle the reservation — you handle being wonderful. (You're already very good at it.)</p>
          </>
        ) : (
          <>
            <h2 className="text-5xl md:text-6xl">So… will you join me for dinner?</h2>
            <div className="relative mt-12 flex items-center gap-6">
              <button onClick={() => setYes(true)} className="rounded-lg bg-primary px-10 py-4 font-display text-2xl text-primary-foreground shadow-xl transition hover:scale-110" style={{ transform: `scale(${1 + noCount * 0.12})` }}>
                Yes, obviously
              </button>
              <button onMouseEnter={dodge} onClick={dodge} className="rounded-lg border border-border px-6 py-3 text-muted-foreground transition-transform" style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}>
                {noLines[noCount]}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
