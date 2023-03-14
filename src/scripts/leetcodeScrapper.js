const axios = require("axios");
const cheerio = require("cheerio");
const json = require("json");

const url = "https://leetcode.com/problemset/all/";

axios
    .get(url, { withCredentials: true })
    .then((response) => {
        const pageHTML = response.data;
        const $ = cheerio.load(pageHTML);
        const scriptsList = $("script").last().html();
        const scriptJSON = JSON.parse(scriptsList);
        const POTD =
            scriptJSON.props.pageProps.dehydratedState.queries[2].state.data.dailyCodingChallengeV2.challenges.slice(
                -1
            )[0];
        const date = POTD.date;
        const link = POTD.link;
        const title = POTD.question.title;
        const ID = POTD.question.questionFrontendId;
        console.log(`${date}\n${link}\n${ID}\n${title}`);
    })
    .catch((error) => {
        console.log(error);
    });
