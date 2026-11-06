import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.QA_URL ?? "http://localhost:3000";
const OUT = path.join(process.cwd(), "shots");
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const errors = [];

async function open(width, height) {
  const page = await browser.newPage();
  page.setDefaultTimeout(25000);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`[console] ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`[pageerror] ${error.message}`));
  return page;
}

async function shotRoute(page, route, label) {
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await sleep(2400);
  const metrics = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
    scrollH: document.documentElement.scrollHeight,
  }));
  console.log(label, JSON.stringify(metrics));
  await page.screenshot({ path: path.join(OUT, `${label}.png`) });

  const total = metrics.scrollH;
  for (let y = Math.round(metrics.innerW === 0 ? 0 : 700); y < total; y += 800) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await sleep(180);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
}

const desktop = await open(1440, 900);
await shotRoute(desktop, "/projects/ott-media-analytics", "route-project-desktop");
await shotRoute(desktop, "/resume", "route-resume-desktop");

const mobile = await open(390, 844);
await shotRoute(mobile, "/projects/ott-media-analytics", "route-project-mobile");
await shotRoute(mobile, "/resume", "route-resume-mobile");

// Contact form validation + unconfigured response
await desktop.goto(`${BASE}/#contact`, { waitUntil: "domcontentloaded" });
await sleep(1500);
const formResult = await desktop.evaluate(async () => {
  const form = document.querySelector("form");
  if (!form) return "no-form";
  form.querySelector('button[type="submit"]')?.click();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const invalid = document.querySelectorAll('[aria-invalid="true"]').length;
  return { invalidFields: invalid };
});
console.log("form validation", JSON.stringify(formResult));

await desktop.screenshot({ path: path.join(OUT, "route-contact-validation.png") });

// Fill the form and submit to check the honest unconfigured state.
await desktop.evaluate(() => {
  const set = (id, value) => {
    const input = document.getElementById(id);
    if (!input) return;
    const setter = Object.getOwnPropertyDescriptor(
      input instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype,
      "value"
    ).set;
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };
  set("name", "QA Check");
  set("email", "qa@example.com");
  set("subject", "Portfolio preview check");
  set("message", "This is an automated validation message for the preview build.");
});
await sleep(300);
await desktop.evaluate(() => document.querySelector('button[type="submit"]')?.click());
await sleep(2200);
const unconfigured = await desktop.evaluate(() => {
  const status = document.querySelector('[role="status"]');
  return status ? status.textContent : "no-status";
});
console.log("form unconfigured state", JSON.stringify(unconfigured));
await desktop.screenshot({ path: path.join(OUT, "route-contact-unconfigured.png") });

console.log("console errors:", errors.length ? errors : "none");
await browser.close();
