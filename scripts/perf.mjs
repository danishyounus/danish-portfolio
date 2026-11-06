import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.QA_URL ?? "http://localhost:3000";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

async function measure(label, width, height, { cpu = 1, network = null } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.setCacheEnabled(false);
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("danish-portfolio-motion", "off");
    window.__lcp = 0;
    window.__lcpEl = "";
    window.__cls = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        window.__lcp = last.startTime;
        const element = last.element;
        window.__lcpEl = element
          ? `${element.tagName.toLowerCase()}.${String(element.className).slice(0, 70)}`
          : last.url || "unknown";
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  const client = await page.createCDPSession();
  await client.send("Network.enable");
  const resources = new Map();
  client.on("Network.responseReceived", (event) => {
    resources.set(event.requestId, {
      type: event.type,
      url: event.response.url,
      status: event.response.status,
    });
  });
  client.on("Network.loadingFinished", (event) => {
    const resource = resources.get(event.requestId);
    if (resource) resource.bytes = event.encodedDataLength;
  });

  if (cpu > 1) await page.emulateCPUThrottling(cpu);
  if (network) {
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: network.latency,
      downloadThroughput: network.download,
      uploadThroughput: network.upload,
    });
  }

  const start = Date.now();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector("#home", { timeout: 60000 });
  await sleep(5000);
  const wall = Date.now() - start;

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const paint = performance.getEntriesByType("paint");
    const fcp = paint.find((entry) => entry.name === "first-contentful-paint");
    return {
      ttfb: Math.round(navigation.responseStart),
      domContentLoaded: Math.round(navigation.domContentLoadedEventEnd),
      load: Math.round(navigation.loadEventEnd),
      fcp: fcp ? Math.round(fcp.startTime) : null,
      lcp: Math.round(window.__lcp),
      lcpEl: window.__lcpEl,
      cls: Number(window.__cls.toFixed(4)),
      domNodes: document.querySelectorAll("*").length,
      heapMb: performance.memory
        ? Number((performance.memory.usedJSHeapSize / 1048576).toFixed(1))
        : null,
    };
  });

  const byType = {};
  let total = 0;
  let count = 0;
  for (const resource of resources.values()) {
    if (!resource.bytes) continue;
    count += 1;
    total += resource.bytes;
    const type = resource.type.toLowerCase();
    byType[type] = (byType[type] ?? 0) + resource.bytes;
  }
  const readable = Object.fromEntries(
    Object.entries(byType).map(([key, value]) => [key, `${Math.round(value / 1024)} kB`])
  );

  console.log(
    label,
    JSON.stringify({ ...metrics, wall, requests: count, total: `${Math.round(total / 1024)} kB` })
  );
  console.log(`${label} by type`, JSON.stringify(readable));

  const largest = Array.from(resources.values())
    .filter((resource) => resource.bytes)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8)
    .map((resource) => ({
      type: resource.type,
      kb: Math.round(resource.bytes / 1024),
      url: resource.url.replace(URL, "").slice(0, 90),
    }));
  console.log(`${label} largest`, JSON.stringify(largest));

  await page.close();
}

await measure("desktop", 1440, 900);
await measure("mobile-fast", 390, 844, { cpu: 4 });
await measure("mobile-slow4g", 390, 844, {
  cpu: 4,
  network: { latency: 150, download: (1.6 * 1024 * 1024) / 8, upload: (750 * 1024) / 8 },
});

await browser.close();
