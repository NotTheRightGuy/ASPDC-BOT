const request = require("request");
let url = "https://leetcode.com/problemset/all/";

request(url, function (error, response, html) {
    if (error) console.log(error);
    console.log(response.statusCode);
    console.log(html);
});
