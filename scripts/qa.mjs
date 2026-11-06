import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.QA_URL ?? "http://localhost:3000";
const OUT = path.join(process.cwd(), "shots");
const FAST = process.env.QA_FAST !== "0";
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sectionIds = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "certifications",
  "contact",
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--font-render-hinting=none",
  ],
});

const errors = [];

async function setupPage(width, height) {
  const page = await browser.newPage();
  page.setDefaultTimeout(25000);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);

  if (FAST) {
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem("danish-portfolio-motion", "off");
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (String(type).toLowerCase().includes("webgl")) return null;
        return original.call(this, type, ...args);
      };
    });
  }

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`[console] ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`[pageerror] ${error.message}`));
  page.on("requestfailed", (request) =>
    errors.push(`[requestfailed] ${request.url()} — ${request.failure()?.errorText}`)
  );

  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#home", { timeout: 30000 });
  await sleep(2000);
  return page;
}

async function overflowReport(page) {
  return page.evaluate(() => {
    const width = window.innerWidth;
    const offenders = [];
    for (const element of Array.from(document.body.querySelectorAll("*"))) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > width + 1 || rect.left < -1) {
        offenders.push({
          tag: element.tagName.toLowerCase(),
          cls: String(element.className).slice(0, 60),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
      if (offenders.length > 12) break;
    }
    return offenders;
  });
}

async function capture(page, label) {
  const metrics = await page.evaluate(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
    scrollW: document.documentElement.scrollWidth,
    scrollH: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  }));
  console.log(`${label} metrics`, JSON.stringify(metrics));

  const offenders = await overflowReport(page);
  console.log(`${label} overflow offenders`, JSON.stringify(offenders));

  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
  await page.screenshot({ path: path.join(OUT, `${label}-hero.png`) });

  for (const id of sectionIds) {
    const box = await page.evaluate((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        height: rect.height,
        viewport: window.innerHeight,
      };
    }, id);

    if (!box) {
      console.log(`missing section #${id}`);
      continue;
    }

    const scrollTo = async (top) => {
      await page.evaluate((value) => window.scrollTo(0, value), top);
      await sleep(420);
    };

    await scrollTo(Math.max(0, box.top - 4));
    await page.screenshot({ path: path.join(OUT, `${label}-${id}.png`) });
    console.log(`captured ${label}-${id}`);

    if (box.height > box.viewport * 1.15) {
      const bottom = box.top + box.height - box.viewport + 4;
      await scrollTo(Math.max(0, bottom));
      await page.screenshot({ path: path.join(OUT, `${label}-${id}-bottom.png`) });
      console.log(`captured ${label}-${id}-bottom`);
    }
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
}

async function interactionPass(page, label) {
  const results = {};

  // Project case study navigation
  const projectHref = await page.evaluate(() => {
    const link = document.querySelector('a[href^="/projects/"]');
    return link ? link.getAttribute("href") : null;
  });
  results.projectHref = projectHref;

  // Archive toggle
  results.archiveToggle = await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find((item) =>
      item.textContent?.includes("Emergency Dashboard")
    );
    if (!button) return "not-found";
    button.click();
    return "clicked";
  });

  // Certificate lightbox
  results.lightbox = await page.evaluate(() => {
    const card = Array.from(document.querySelectorAll("button")).find((item) =>
      item.textContent?.includes("Certified WalkMe Builder")
    );
    if (!card) return "not-found";
    card.click();
    return "clicked";
  });
  await sleep(700);
  results.dialogOpen = await page.evaluate(
    () => Boolean(document.querySelector('[role="dialog"]'))
  );
  await page.screenshot({ path: path.join(OUT, `${label}-lightbox.png`) });
  await page.keyboard.press("Escape");
  await sleep(500);
  results.dialogClosed = await page.evaluate(
    () => !document.querySelector('[role="dialog"]')
  );

  // Motion toggle
  results.motionToggle = await page.evaluate(() => {
    const button = document.querySelector("[data-motion-toggle]");
    if (!button) return "not-found";
    button.click();
    return localStorage.getItem("danish-portfolio-motion");
  });

  console.log(`${label} interactions`, JSON.stringify(results));
  return results;
}

const desktop = await setupPage(1440, 900);
await capture(desktop, "desktop");
await interactionPass(desktop, "desktop");

const mobile = await setupPage(390, 844);
await capture(mobile, "mobile");

// Mobile menu open/close
await mobile.evaluate(() => window.scrollTo(0, 0));
await sleep(400);
const menuButton = await mobile.$('button[aria-controls="mobile-menu"]');
if (menuButton) {
  await menuButton.click();
  await sleep(700);
  await mobile.screenshot({ path: path.join(OUT, "mobile-menu.png") });
  console.log("captured mobile-menu");
  await mobile.keyboard.press("Escape");
  await sleep(500);
}

console.log("console errors:", errors.length ? errors : "none");

await browser.close();
