from django.shortcuts import render
from .models import ArticlesInfo
from .spiderEngine import updateDB


def index(request):
    return render(request, 'index.html')


def refresh(request):
    datals = []
    for n in range(1, 6):
        count = 1
        articles_pagen = ArticlesInfo.objects.filter(page=n)
        ls = []
        for article in articles_pagen:
            tinydict = {'count': count}
            tinydict.update(eval(str(article)))
            ls.append(tinydict)
            count += 1
        datals.append(ls)
    data = {
        'datals': datals,
        'keywords': 'keywords here!'
    }
    if request.method == 'POST' and request.POST.get("refreshButton") == 'Refresh':
        updateDB.update()
    elif request.method == 'POST' and request.POST.get("go") == '←input&go!':
        page = eval(request.POST.get("page"))
        number = eval(request.POST.get("number"))
        totalInfoDict = datals[page - 1][number - 1]
        infoList = totalInfoDict['info']
        infoDict = {}
        for info in infoList:
            for key in info:
                infoDict[key] = info[key]
        data = {
            'data': infoDict,
            'keywords': 'keywords here!'
        }
        return render(request, 'article.html', data)
    if request.method == 'POST' and request.POST.get('searchButton') == 'search':
        token = request.POST.get('searchinput')
        if token == '':
            return render(request, 'spider.html', data)
        searchOutput = ArticlesInfo.objects.filter(info__contains=token)
        outputls = [[] for _ in range(5)]
        for output in searchOutput:
            infoDict = eval(str(output))
            page = infoDict['page']
            name = infoDict['name']
            for data in datals:  # data 是个列表
                for item in data:
                    dic = {'name': item['name'], 'page': item['page'], 'info': item['info']}
                    if infoDict == dic:
                        infoDict['count'] = item['count']
                        outputls[datals.index(data)].append(infoDict)
        data = {
                'datals': outputls,
                'keywords': token
            }
        return render(request, 'spider.html', data)
    return render(request, 'spider.html', data)
