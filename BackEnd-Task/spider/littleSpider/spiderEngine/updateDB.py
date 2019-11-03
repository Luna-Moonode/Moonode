from .littleSpider import *
import time
from ..models import ArticlesInfo


def update():
    id = 1
    time.sleep(0.1)
    for page in range(1, 6):
        articlesTitleInfoList = crawl_WholePage(page)
        if not articlesTitleInfoList:
            break
        for num in range(len(articlesTitleInfoList)):
            name_InfoDict = crawl_SingleArticle(articlesTitleInfoList, num)
            singleArticleDict = {'page': page}
            singleArticleDict.update(name_InfoDict)
            print(singleArticleDict)
            article = ArticlesInfo(
                id=id,
                name=singleArticleDict['name'],
                page=singleArticleDict['page'],
                info=singleArticleDict['info']
            )
            article.save()
            id += 1
