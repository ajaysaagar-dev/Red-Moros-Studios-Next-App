const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(__dirname, "..", "screenshots");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // Test iPhone 14 viewport (390 x 844)
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // 1. Home Mobile Viewport & Full Page
  console.log("Navigating to Home (390x844)...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "home-mobile-viewport.png"), fullPage: false });
  await page.screenshot({ path: path.join(OUTPUT_DIR, "home-mobile-full.png"), fullPage: true });

  // 2. Careers Mobile & Apply Modal
  console.log("Navigating to Careers (390x844)...");
  await page.goto("http://localhost:3000/careers", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "careers-mobile-viewport.png"), fullPage: false });
  await page.screenshot({ path: path.join(OUTPUT_DIR, "careers-mobile-full.png"), fullPage: true });

  // 2b. Click Apply for Role to test dynamic application form (select role with document & image fields)
  console.log("Opening Career Apply Modal...");
  const applyButtons = await page.$$("button");
  const matchingBtns = [];
  for (const btn of applyButtons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.includes("APPLY FOR ROLE")) {
      matchingBtns.push(btn);
    }
  }
  if (matchingBtns.length > 0) {
    await matchingBtns[matchingBtns.length - 1].click();
  }
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "careers-apply-modal-mobile.png"), fullPage: false });

  // 3. Admin Lock Screen Mobile
  console.log("Navigating to Admin (390x844)...");
  await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "admin-lock-mobile.png"), fullPage: false });

  // 4. Authenticate into Admin and capture mobile dashboard
  console.log("Authenticating into Admin...");
  await page.type('input[type="password"]', "aass209c");
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "admin-dashboard-mobile-viewport.png"), fullPage: false });
  await page.screenshot({ path: path.join(OUTPUT_DIR, "admin-dashboard-mobile-full.png"), fullPage: true });

  // 4a. Click View Dossier for candidate
  console.log("Viewing Candidate Dossier...");
  const viewButtons = await page.$$("button");
  for (const btn of viewButtons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.trim() === "VIEW") {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "admin-candidate-dossier-mobile.png"), fullPage: false });

  // Close dossier modal
  const closeDossier = await page.$$("button");
  for (const btn of closeDossier) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.includes("CLOSE")) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 500));

  // 4b. Switch to Post New Job tab and capture
  console.log("Switching to Post New Job tab...");
  const tabButtons = await page.$$("button");
  for (const btn of tabButtons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.includes("POST NEW JOB")) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "admin-create-job-mobile.png"), fullPage: true });

  // 4c. Switch to Roles Catalog tab and capture
  console.log("Switching to Roles Catalog tab...");
  const roleTabButtons = await page.$$("button");
  for (const btn of roleTabButtons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.includes("ROLES CATALOG")) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "admin-roles-mobile-full.png"), fullPage: true });

  // 4d. Click first edit button to open Edit Job Modal
  console.log("Opening Edit Job Modal...");
  const editButtons = await page.$$('button[title="Edit role details"]');
  if (editButtons.length > 0) {
    await editButtons[0].click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, "admin-edit-job-modal-mobile.png"), fullPage: false });
  }

  // 5. Test Compact Phone (iPhone SE: 375x667)
  await page.setViewport({
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "home-se-375.png"), fullPage: false });

  await browser.close();
  console.log("All mobile screenshots captured successfully!");
}

takeScreenshots().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
