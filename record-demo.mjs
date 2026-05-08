import { chromium } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const BASE_URL = process.argv[2] ?? 'http://localhost';
const OUT_DIR = path.resolve('public/images');
const MP4 = path.join(OUT_DIR, 'demo.mp4');
const VIDEO_URL = 'https://www.youtube.com/watch?v=MPawo9gpv3Q';

console.log(`Recording against: ${BASE_URL}`);

const browser = await chromium.launch({
    headless: false,
    args: ['--autoplay-policy=no-user-gesture-required', '--disable-blink-features=AutomationControlled'],
});

const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: OUT_DIR, size: { width: 1280, height: 720 } },
    permissions: ['clipboard-read', 'clipboard-write'],
});

const page = await context.newPage();

// ─── 疑似カーソル ────────────────────────────────────────────
const CURSOR_JS = `
(function() {
    if (document.getElementById('__pw_cursor__')) return;
    var c = document.createElement('div');
    c.id = '__pw_cursor__';
    c.style.cssText = 'position:fixed!important;left:-50px;top:-50px;width:24px;height:24px;background:rgba(0,0,0,0.85)!important;border:3px solid white!important;border-radius:50%!important;pointer-events:none!important;z-index:2147483647!important;box-shadow:0 0 0 1px rgba(0,0,0,0.3),0 2px 8px rgba(0,0,0,0.5)!important;';
    document.documentElement.appendChild(c);
})();
`;

const injectCursor = async () => {
    await page.evaluate(CURSOR_JS).catch(() => {});
};

const moveCursor = async (x, y) => {
    await page.evaluate(([x, y]) => {
        var c = document.getElementById('__pw_cursor__');
        if (c) { c.style.left = (x - 12) + 'px'; c.style.top = (y - 12) + 'px'; }
    }, [x, y]).catch(() => {});
};

// ページ読み込みのたびに再注入
page.on('load', async () => { await injectCursor(); });

// クリック前にカーソルを要素位置へ移動するヘルパー
const clickAt = async (locator) => {
    const box = await locator.boundingBox();
    if (box) {
        const x = Math.round(box.x + box.width / 2);
        const y = Math.round(box.y + box.height / 2);
        await page.mouse.move(x, y, { steps: 15 });
        await moveCursor(x, y);
        await page.waitForTimeout(200);
    }
    await locator.click();
};

// alert は自動で閉じてURLを保持する
let shareUrl = null;
page.on('dialog', async (dialog) => {
    console.log('Dialog:', dialog.message());
    await dialog.accept();
});

// ─── ログイン ────────────────────────────────────────────────
await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' });
await injectCursor();
await page.fill('input[type="email"]', 'test@example.com');
await page.fill('input[type="password"]', 'password');
await page.click('button[type="submit"]');
await page.waitForURL(`${BASE_URL}/home`, { timeout: 15000 });
await injectCursor();
await page.waitForTimeout(1500);

// ─── URL を1文字ずつタイピング ───────────────────────────────
const urlInput = page.locator('input[type="url"]');
await clickAt(urlInput);
await page.waitForTimeout(400);
await page.keyboard.type(VIDEO_URL, { delay: 55 });
await page.waitForTimeout(600);

// ─── 終了時間を 8 秒に変更 ──────────────────────────────────
const endInput = page.locator('input[type="number"]').nth(1);
await clickAt(endInput);
await endInput.selectText();
await page.keyboard.type('8', { delay: 80 });
await page.waitForTimeout(400);

// ─── ループ開始 ──────────────────────────────────────────────
const loopBtn = page.locator('button').filter({ hasText: /Set Loop|ループをセット/ });
await clickAt(loopBtn);

// ─── autoplay=1 で自動再生されるので待つだけ ─────────────────
await page.waitForSelector('iframe[src*="youtube"]', { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(2000); // プレーヤー初期化を待つ
console.log('YouTube autoplay started');

// ─── 15秒ループ再生を見せる ──────────────────────────────────
await page.waitForTimeout(12000);

// ─── 保存ボタンをクリック ────────────────────────────────────
const saveBtn = page.locator('button').filter({ hasText: /💾|保存|Save/ }).first();
await clickAt(saveBtn);
await page.waitForTimeout(1200);

// ─── デフォルトのタイトルをクリアして新しい名前を入力 ─────────
const titleInput = page.locator('.fixed input[type="text"]').first();
await titleInput.waitFor({ timeout: 5000 }).catch(() => {});
await clickAt(titleInput);
await page.waitForTimeout(200);
await titleInput.fill('');
await page.waitForTimeout(200);
await page.keyboard.type('完全感覚Dreamer イントロ', { delay: 65 });
await page.waitForTimeout(500);

// ─── メモを入力 ──────────────────────────────────────────────
const memoInput = page.locator('.fixed textarea').first();
await clickAt(memoInput);
await page.keyboard.type('ONE OK ROCK / 0〜8秒をループ', { delay: 55 });
await page.waitForTimeout(600);

// ─── 保存を確定 ──────────────────────────────────────────────
const submitBtn = page.locator('.fixed button').filter({ hasText: /^保存$|^Save$/ });
await clickAt(submitBtn);

// ─── ダイアログが完全に閉じるまで待つ ────────────────────────
await page.locator('.fixed.inset-0').waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
await page.waitForTimeout(1500); // Inertia のリスト更新を待つ

// ─── シェアURLをネットワークから取得できるように待機 ─────────
const shareRespPromise = page.waitForResponse(
    (resp) => resp.url().includes('/share/') && resp.request().method() === 'POST',
    { timeout: 8000 }
).catch(() => null);

// ─── 保存されたループのシェアボタンをクリック ────────────────
// sidebar（1280px > 1000px で表示）の中を狙う
// 保存済みリストが上部に表示されるようページトップへスクロール
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
await page.waitForTimeout(1000);

const allShareBtns = page.locator('button').filter({ hasText: /シェア|Share/ });
const count = await allShareBtns.count();
console.log(`Share buttons in DOM: ${count}`);
let clicked = false;
for (let i = 0; i < count; i++) {
    const btn = allShareBtns.nth(i);
    const vis = await btn.isVisible();
    console.log(`  btn[${i}] visible=${vis}`);
    if (vis) {
        await clickAt(btn);
        clicked = true;
        console.log(`Clicked btn[${i}]`);
        break;
    }
}
if (!clicked) {
    await page.locator('svg').filter({ has: page.locator('path[d*="M10 13"]') })
        .locator('..').click({ timeout: 3000 }).catch(() => console.log('fallback also failed'));
}
await page.waitForTimeout(1500);

// ─── シェアURLを取得 ─────────────────────────────────────────
const shareResp = await shareRespPromise;
if (shareResp) {
    try {
        const json = await shareResp.json();
        shareUrl = json.url;
        console.log('Share URL:', shareUrl);
    } catch {}
}
if (!shareUrl) {
    shareUrl = await page.evaluate(() => navigator.clipboard.readText()).catch(() => null);
    console.log('Clipboard URL:', shareUrl);
}

await page.waitForTimeout(800);

// ─── LINE モックへ遷移（友達に送る場面） ──────────────────────
const lineMockUrl = `${BASE_URL}/line-mock.html?url=${encodeURIComponent(shareUrl)}`;
await page.goto(lineMockUrl, { waitUntil: 'domcontentloaded' });
await injectCursor();
await page.waitForTimeout(6000); // リンクカードが届くアニメーションを見せる

// ─── リンクカードをクリック → シェアページへ ─────────────────
await clickAt(page.locator('#share-link'));
await page.waitForTimeout(3500); // 受け取った側のシェアページを見せる

await context.close();
await browser.close();

// ─── webm → mp4 変換 ─────────────────────────────────────────
const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.webm'));
if (files.length === 0) { console.error('webm not found'); process.exit(1); }

const latest = files.map(f => ({ f, mt: fs.statSync(path.join(OUT_DIR, f)).mtimeMs }))
    .sort((a, b) => b.mt - a.mt)[0].f;
const srcWebm = path.join(OUT_DIR, latest);

if (fs.existsSync(MP4)) fs.unlinkSync(MP4);
execSync(`ffmpeg -y -i "${srcWebm}" -vcodec libx264 -acodec aac -pix_fmt yuv420p "${MP4}"`, { stdio: 'inherit' });
fs.unlinkSync(srcWebm);

console.log('✓ demo.mp4 saved to', MP4);
