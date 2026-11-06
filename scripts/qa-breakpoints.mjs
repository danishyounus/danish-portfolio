import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.QA_URL ?? "http://localhost:3000";
const OUT = path.join(process.cwd(), "shots");
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const sizes = [
  { label: "tablet-1024", width: 1024, height: 768 },
  { label: "tablet-768", width: 768, height: 1024 },
  { label: "phone-320", width: 320, height: 700 },
];

for (const size of sizes) {
  const page = await browser.newPage();
  await page.setViewport({ width: size.width, height: size.height, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("danish-portfolio-motion", "off");
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (String(type).toLowerCase().includes("webgl")) return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#home", { timeout: 30000 });
  await sleep(2200);

  const metrics = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  }));
  console.log(size.label, JSON.stringify(metrics));

  const offenders = await page.evaluate(() => {
    const width = window.innerWidth;
    const list = [];
    for (const element of Array.from(document.body.querySelectorAll("*"))) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > width + 0.5 || rect.left < -0.5) {
        list.push({
          tag: element.tagName.toLowerCase(),
          cls: String(element.className).slice(0, 70),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          text: (element.textContent ?? "").trim().slice(0, 40),
        });
      }
      if (list.length >= 14) break;
    }
    return list;
  });
  console.log(`${size.label} offenders`, JSON.stringify(offenders, null, 1));

  await page.screenshot({ path: path.join(OUT, `${size.label}-hero.png`) });

  for (const id of ["about", "experience", "skills", "projects", "education", "certifications", "contact"]) {
    const top = await page.evaluate((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;
      return element.getBoundingClientRect().top + window.scrollY;
    }, id);
    if (top === null) continue;
    await page.evaluate((value) => window.scrollTo(0, value), Math.max(0, top - 4));
    await sleep(500);
    await page.screenshot({ path: path.join(OUT, `${size.label}-${id}.png`) });
  }

  await page.close();
}

await browser.close();
