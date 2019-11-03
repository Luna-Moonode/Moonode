from .spiderFunc import *


# 爬取一页的所有文章信息，传入页数page，返回一个列表[{name: url},]
def crawl_WholePage(page):
    url_Inform = 'http://cs.whu.edu.cn/news_list.aspx'
    param = {"page": page, "category_id": 53}
    pageText = getHTMLText_Params(url_Inform, param)
    # 测试通过，得到目标页码的文章list页面pageText
    articlesTitleInfoList = parseHTMLText_Page_P(pageText)
    # 测试通过，得到文章list页面的文章和链接字典的列表articleTitleInfoList [{文章名: 链接},...]
    return articlesTitleInfoList


# 爬取单个文章信息，传入一页的文章列表和要爬取的文章的序数num，返回字典{name: ..., info: ...}，表示单个文章的信息
def crawl_SingleArticle(articlesTitleInfoList, num):
    num -= 1
    url_Root = 'http://cs.whu.edu.cn'
    url = ''
    articleName = ''
    for name in articlesTitleInfoList[num]:
        articleName = name
        url = articlesTitleInfoList[num][name]
    url_article = url_Root + url
    url_id = re.findall(r'id=[0-9]+', url)[0][3:]
    # 测试通过，获得单个文章的URL和ID： url_article, url_id
    article = getHTMLText(url_article)  # 文章HTML内容article
    trigger = 1
    if re.findall(r'</table>', str(article)):
        trigger = 0
    articleHeadInfoDict = {"文章标题": articleName}
    articleHeadInfoDict.update(parseHTMLText_ArticleTitleInfo(article, url_id))
    # 测试通过，获得单个文章的头部信息的字典articleHeadInfoDict：文章标题，发表时间，评论人数，点击次数
    articleContentInfoDict = parseHTMLText_ArticleContent(article)
    # 测试通过，获得单个文章的内容信息的字典articleContentInfoDict
    # 整合
    articleDetailedInfoDict = {}
    articleDetailedInfoDict.update(articleHeadInfoDict)
    articleDetailedInfoDict.update(articleContentInfoDict)
    # 输出
    articleInfoList = []
    for key in articleDetailedInfoDict:
        littleDict = {key: articleDetailedInfoDict[key]}
        articleInfoList.append(littleDict)
    integrateDict = {'name': articleName}
    if trigger:
        integrateDict['info'] = articleInfoList
        return integrateDict
    else:
        integrateDict['info'] = []
        return integrateDict
