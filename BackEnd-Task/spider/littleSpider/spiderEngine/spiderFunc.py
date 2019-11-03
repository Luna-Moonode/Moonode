import requests
import re
from bs4 import BeautifulSoup


# 获取HTML页面
def getHTMLText(url):
    try:
        html = requests.get(url)
        html.raise_for_status()
        html.encoding = html.apparent_encoding
        return html.text
    except:
        print("页面获取发生错误")
        return ''


# 获取带参数的HTML页面
def getHTMLText_Params(url, params):
    try:
        html = requests.get(url, params=params)
        html.raise_for_status()
        html.encoding = html.apparent_encoding
        return html.text
    except:
        print("页面获取发生错误")
        return ''


# 解析HTML页面,返回文章标题和链接的字典列表
def parseHTMLText_Page_P(html):
    try:
        soup = BeautifulSoup(html, 'html.parser')
        pTags = soup.find_all('p', {"class": "p1"})
        aTags = []
        for pTag in pTags:
            aTags.append(pTag.contents[1].contents[0])
        # 得到目标a标签，href中是文章链接，a标签内容是文章标题
        articleInfoList = []
        hrefs = [aTag.attrs['href'] for aTag in aTags]
        titles = [aTag.string for aTag in aTags]
        for index in range(len(hrefs)):
            articleInfoList.append({titles[index]: hrefs[index]})
        return articleInfoList
    except:
        print("解析时发生错误！")
        return []


# 解析article的头部信息, 返回发表时间、点击次数、评论人数的字典
def parseHTMLText_ArticleTitleInfo(html, url_id):
    try:

        soup = BeautifulSoup(html, 'html.parser')
        infoDiv = soup.find_all('div', {'class': 'info'})[0]  # 含有信息的div
        releaseDate = re.findall('[\u4E00-\u9FA5|0-9]+', str(infoDiv))[0]  # 发表日期
        url_infoAPI = 'http://cs.whu.edu.cn/tools/submit_ajax.ashx'
        paramsDict_comment = {
            'action': 'view_comment_count',
            'channel_id': 1,
            'id': url_id
        }
        commentAPIText = getHTMLText_Params(url_infoAPI, params=paramsDict_comment)
        commentVolume = re.findall(r'[0-9]+', commentAPIText)[0]  # 评论人数commentVolume
        paramsDict_click = {
            'action': 'view_article_click',
            'channel_id': 1,
            'id': url_id,
            'click': 1
        }
        clickAPIText = clickAPIText = getHTMLText_Params(url_infoAPI, params=paramsDict_click)
        clickVolume = re.findall(r'[0-9]+', clickAPIText)[0]  # 点击次数clickVolume
        articleTitleInfoDict = {
            '发表时间': releaseDate,
            '评论人数': commentVolume,
            '点击次数': clickVolume
        }
        return articleTitleInfoDict
    except:
        print("解析时发生错误！")
        return {}


# 解析article的内容信息，返回一个总信息字典
def parseHTMLText_ArticleContent(html):
    try:
        soup = BeautifulSoup(html, 'html.parser')
        articleBody = soup.find_all('div', attrs={'class': ''})[0]
        articleBody_Ps = articleBody.find_all('p')
        articleInfoDict = {}
        textList = []
        for p in articleBody_Ps:
            if 'style' in p.attrs and re.findall(r'<strong>', str(p.contents)) == []:
                infoString = ''
                for span in p.descendants:
                    infoString += str(span.string)
                infoString = re.sub(r'None', '', infoString)
                textList.append(infoString)
            # 处理两大段文本
            articleContents = re.findall('[\u4E00-\u9FA5|0-9]+[：]?<', str(p))
            infoList = []
            for itemls in articleContents:
                infoString = ''
                for item in itemls:
                    item = re.sub(r'<$', '', item)
                    item = re.sub(r'None', '', item)
                    infoString += item
                infoList.append(infoString)
            infoString = ''
            # 得到待处理的infoList，处理后将键值对写入字典articleBasicInfoDict
            if infoList == [] or len(re.findall(r'：', infoList[0])) != 1 or len(infoList) == 1:
                continue
            for item in infoList:
                infoString += item
            infoList = infoString.split('：')
            articleInfoDict[infoList[0]] = infoList[1]
        articleInfoDict["报告人简介"] = textList[0]
        articleInfoDict["报告摘要"] = textList[1]
        return articleInfoDict
    except:
        print('解析文章时出现错误！')
        return {}


