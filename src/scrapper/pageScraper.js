function toCamelCase(str) {
    // Replace any non-alphanumeric characters with spaces
    str = str.replace(/[^a-zA-Z0-9]/g, " ");

    // Split the string into an array of words
    let words = str.split(" ");

    // Convert the first letter of each word to uppercase, except the first word
    for (let i = 1; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    // Join the words together into a single string, with spaces between the words
    return words.join(" ");
}

const fs = require("fs").promises;

const scraperObject = {
    url: "https://leetcode.com/problemset/all/",
    async scraper(browser) {
        let page = await browser.newPage();
        // console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await page.waitForSelector("[role=rowgroup]");
        let urls = await page.$$eval("[role=rowgroup] a", (links) => {
            links = links.map((el) => el.href);
            return links;
        });
        const urlLink = urls[0];
        browser.close();
        const problemName = urlLink.split("/")[4];
        const normalName = problemName.split("-").join(" ");
        const camelName = toCamelCase(normalName) + "$" + urlLink;
        console.log(camelName);
    },
};

module.exports = scraperObject;
