import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 320, height: 700, deviceScaleFactor: 1 });
await page.evaluateOnNewDocument(() => {
  localStorage.setItem("danish-portfolio-motion", "off");
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (String(type).toLowerCase().includes("webgl")) return null;
    return original.call(this, type, ...args);
  };
});
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#home");
await new Promise((resolve) => setTimeout(resolve, 2200));

const result = await page.evaluate(() => {
  const scroll = () => document.documentElement.scrollWidth;
  const base = scroll();

  // Walk down: at each level, hide each child in turn and see if scrollWidth drops.
  function path(node) {
    const trace = [];
    let current = node;
    while (current && current !== document.documentElement) {
      trace.push({
        tag: current.tagName.toLowerCase(),
        cls: String(current.className).slice(0, 80),
        id: current.id || null,
        scrollW: scroll(),
        clientW: current.clientWidth,
        rect: (() => {
          const r = current.getBoundingClientRect();
          return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
        })(),
      });
      current = current.parentElement;
    }
    return trace;
  }

  function find(node) {
    const children = Array.from(node.children);
    for (const child of children) {
      const before = scroll();
      const prev = child.style.display;
      child.style.display = "none";
      const after = scroll();
      child.style.display = prev;
      if (after < before) {
        // child (or descendant) causes overflow
        const found = find(child);
        return found ? [child, ...found] : [child];
      }
    }
    return null;
  }

  const chain = find(document.body);
  return {
    base,
    chain: chain ? chain.map((el) => path(el)[0]) : [],
    detail: chain ? path(chain[chain.length - 1]) : null,
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
