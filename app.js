// Basic starter “latest hype” (we can replace this with Google Sheet data later)
const hype = [
  "HONOLULU BLUE ENERGY ONLY. 🦁",
  "Motor City mindset: GRIT + memes + wins.",
  "One Pride Hub is live — tap a link and ride.",
];

const hypeList = document.getElementById("hypeList");
hype.forEach(line => {
  const li = document.createElement("li");
  li.textContent = line;
  hypeList.appendChild(li);
});

// Register service worker (PWA offline)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try { await navigator.serviceWorker.register("/sw.js"); }
    catch (e) { /* ignore */ }
  });
}

// Install button support
let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove("hidden");
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add("hidden");
});
