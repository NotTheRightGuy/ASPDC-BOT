import requests
from bs4 import BeautifulSoup as soup
import json

url = "https://leetcode.com/problemset/all/"
responseData = requests.get(url)

page_soup = soup(responseData.text, "html.parser")
scriptsList = page_soup.find_all('script')[-1]

scriptJSON = json.loads(scriptsList.text)
POTD = (scriptJSON["props"]["pageProps"]["dehydratedState"]
        ["queries"][2]["state"]["data"]["dailyCodingChallengeV2"]["challenges"][-1])
date = POTD["date"]
link = POTD["link"]
title = POTD["question"]["title"]
ID = POTD["question"]["questionFrontendId"]
print(f"{date}\n{link}\n{ID}\n{title}")
