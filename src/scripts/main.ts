// Homepage behaviour: route drawing, mobile menu, call bar, implant switcher, directions accordion, active nav item.
// Everything works as plain HTML without this script; it only adds states.

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const wide = window.matchMedia("(min-width: 64rem)");
const hasIO = "IntersectionObserver" in window;

/* 1. Route: each block draws its segment once it enters the viewport */
const routes = document.querySelectorAll<HTMLElement>(".route");
if (reduce.matches || !hasIO) {
  routes.forEach((el) => el.classList.add("is-drawn"));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-drawn");
        io.unobserve(e.target);
      }
    }
  }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });
  routes.forEach((el) => io.observe(el));
}

/* 1a. The route ends on the big phone number in #contacts */
const finish = document.querySelector<HTMLElement>("#contacts");
const finalStop = finish?.querySelector<HTMLElement>(".stop--final");
function placeFinish() {
  if (!finish || !finalStop) return;
  const top = finalStop.getBoundingClientRect().top - finish.getBoundingClientRect().top;
  finish.style.setProperty("--route-end-h", `${Math.max(0, Math.round(top))}px`);
}
placeFinish();
window.addEventListener("resize", placeFinish, { passive: true });
document.fonts?.ready.then(placeFinish).catch(() => undefined);

/* 2. Hero photo: reveal starts after the first paint */
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-ready")));

/* 3. Mobile menu */
const header = document.querySelector<HTMLElement>("[data-header]");
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const toggleLabel = document.querySelector<HTMLElement>("[data-menu-label]");
function setMenu(open: boolean) {
  if (!header || !toggle) return;
  header.classList.toggle("is-open", open);
  root.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  if (toggleLabel) toggleLabel.textContent = open ? "Закрити" : "Меню";
}
toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
document.querySelectorAll<HTMLAnchorElement>("[data-menu] a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && header?.classList.contains("is-open")) { setMenu(false); toggle?.focus(); }
});
wide.addEventListener("change", (e) => { if (e.matches) setMenu(false); });

/* 4. Call bar on phones: shown once the hero button leaves the screen */
const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");
if (heroCta && hasIO) {
  root.classList.add("callbar-auto");
  new IntersectionObserver(([e]) => {
    if (e) root.classList.toggle("callbar-on", !e.isIntersecting && e.boundingClientRect.top < 0);
  }).observe(heroCta);
}

/* 5. Implant switcher: three real prices, one visible at a time */
document.querySelectorAll<HTMLElement>("[data-implant]").forEach((box) => {
  const buttons = Array.from(box.querySelectorAll<HTMLButtonElement>("button[data-brand]"));
  const prices = Array.from(box.querySelectorAll<HTMLElement>("[data-price]"));
  box.classList.add("is-switch");
  function select(brand: string) {
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.brand === brand)));
    prices.forEach((p) => {
      const on = p.dataset.price === brand;
      if (!on && p.classList.contains("is-current")) {
        p.classList.add("is-leaving");
        window.setTimeout(() => p.classList.remove("is-leaving"), 260);
      }
      p.classList.toggle("is-current", on);
      p.setAttribute("aria-hidden", String(!on));
    });
  }
  buttons.forEach((b) => b.addEventListener("click", () => select(b.dataset.brand ?? "")));
  const first = buttons[0]?.dataset.brand;
  if (first) select(first);
});

/* 6. Directions: all groups open on desktop; on phones one open group (accordion) */
const groups = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-dir]"));
function layoutGroups() {
  groups.forEach((d, i) => { d.open = wide.matches || i === 0; });
}
layoutGroups();
wide.addEventListener("change", layoutGroups);
groups.forEach((d) => {
  d.querySelector("summary")?.addEventListener("click", (e) => { if (wide.matches) e.preventDefault(); });
});

/* 7. Active nav item: a small hexagon marks the block in view */
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
const sections = links
  .map((a) => document.querySelector<HTMLElement>(a.hash))
  .filter((s): s is HTMLElement => s !== null);
if (hasIO && sections.length) {
  const visible = new Map<string, boolean>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
    const current = sections.find((s) => visible.get(s.id));
    links.forEach((a) => {
      if (current && a.hash === `#${current.id}`) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
}
