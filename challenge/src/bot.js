const puppeteer = require("puppeteer");

const { password } = require("./db.js");

const visit = async (url) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            pipe: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--js-flags=--noexpose_wasm,--jitless",
            ],
            dumpio: true
        });

        let context = await browser.createIncognitoBrowserContext();
        let page = await context.newPage();

        await page.goto("http://localhost/login", {
            waitUntil: "networkidle2"
        });

        await page.evaluate((user, pass) => {
            document.querySelector("input[name=user]").value = user;
            document.querySelector("input[name=pass]").value = pass;
            document.querySelector("button[type=submit]").click();
        }, "The Overseer", password);
        await page.waitForNavigation();

        await page.goto(url, {
            waitUntil: "networkidle2"
        });
        await page.waitForTimeout(7000);

        await browser.close();
        browser = null;
    } catch (err) {
        console.log(err);
    } finally {
        if (browser) await browser.close();
    }
};

module.exports = { visit };