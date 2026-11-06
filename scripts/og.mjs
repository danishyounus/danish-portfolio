import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = path.join(process.cwd(), "public", "og.png");
fs.mkdirSync(path.dirname(OUT), { recursive: true });

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: #050507;
    color: #f4f5f8;
    font-family: "Inter", system-ui, sans-serif;
    position: relative;
  }
  .bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(760px 520px at 82% -12%, rgba(91,140,255,0.24), transparent 62%),
      radial-gradient(620px 560px at 6% 18%, rgba(167,139,250,0.16), transparent 64%),
      radial-gradient(900px 620px at 50% 118%, rgba(91,140,255,0.10), transparent 70%),
      linear-gradient(180deg, #050507, #07070d);
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 88px 88px;
    mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 82%);
    -webkit-mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 82%);
  }
  .ring {
    position: absolute; right: -110px; top: -150px;
    width: 620px; height: 620px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.09);
  }
  .ring.two { width: 800px; height: 800px; right: -200px; top: -240px; border-color: rgba(167,139,250,0.09); }
  .content {
    position: relative;
    height: 100%;
    padding: 56px 72px 52px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 14px; }
  .mark {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.04);
    display: grid; place-items: center;
    font-family: "Sora", sans-serif; font-size: 14px; font-weight: 600; letter-spacing: -0.02em;
  }
  .brandname { font-family: "Sora", sans-serif; font-size: 20px; font-weight: 500; letter-spacing: -0.03em; }
  .brandname span { color: #5b8cff; }
  .meta { font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.38); }
  .hero { margin-top: 8px; }
  .name {
    font-family: "Sora", sans-serif;
    font-size: 182px;
    font-weight: 600;
    line-height: 0.82;
    letter-spacing: -0.065em;
    background: linear-gradient(104deg, #ffffff 0%, #e2e8ff 36%, #bcaaff 70%, #91b5ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .name span { color: #5b8cff; -webkit-text-fill-color: #5b8cff; }
  .role { margin-top: 28px; font-size: 23px; font-weight: 500; color: rgba(255,255,255,0.9); }
  .role em { font-style: normal; color: rgba(255,255,255,0.42); }
  .tagline { margin-top: 16px; max-width: 760px; font-size: 19px; line-height: 1.55; color: rgba(255,255,255,0.52); }
  .bottom {
    display: flex; align-items: flex-end; justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 20px;
  }
  .bottom p { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.36); }
  .chips { display: flex; gap: 8px; }
  .chip {
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.035);
    border-radius: 999px;
    padding: 7px 14px;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="grid"></div>
  <div class="ring"></div>
  <div class="ring two"></div>

  <div class="content">
    <div class="top">
      <div class="brand">
        <div class="mark">MD</div>
        <div class="brandname">Danish<span>.</span></div>
      </div>
      <p class="meta">Portfolio — 2026</p>
    </div>

    <div class="hero">
      <div class="name">DANISH<span>.</span></div>
      <p class="role">Technology Analyst <em>· Data, Digital Adoption &amp; Experience</em></p>
      <p class="tagline">Building intelligent digital experiences at the intersection of technology, data and design.</p>
    </div>

    <div class="bottom">
      <p>Bengaluru, India</p>
      <div class="chips">
        <span class="chip">Digital Adoption</span>
        <span class="chip">Power BI</span>
        <span class="chip">Python</span>
        <span class="chip">Machine Learning</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((resolve) => setTimeout(resolve, 800));

await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

console.log(`Wrote ${OUT}`);
