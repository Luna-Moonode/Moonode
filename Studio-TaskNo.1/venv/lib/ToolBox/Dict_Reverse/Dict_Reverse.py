# coding=utf-8
# 键值对反转功能
def dict_reverse():
    print("本功能可以将你输入的字符串制作成字典，并将键值反转")
    print("请输入键值对，用空格分隔，输入空回车结束（例：a 3):")
    ls = []
    tryls = []
    while True:
        try:
            element = input()
            if element in tryls:
                print("数据已存在！重新输入！")
                continue
            elif element == "":
                break
            elif element.count(" ") != 1 or element[-1] == " " or element[0] == " ":
                print("输入格式错误！重新输入！")
                continue
            for i in element.split(sep=" "):
                ls.append(i)
            tryls.append(element)
        except:
            print("输入格式错误！重新输入！")
            continue
    # 我得到了一个列表ls，里面有偶数个元素

    length = len(ls)
    for i in range(length):
        if '0'<=ls[i]<='9':
            ls[i]=eval(ls[i])
        elif (ls[i][0]=="'" and ls[i][-1]=="'") or (ls[i][0]=='"' and ls[i][-1]=='"'):
            ls[i]=ls[i].strip("'")
            ls[i]=ls[i].strip('"')
    # 列表处理模块
    dictionary = {}
    for i in range(0, length, 2):
        if ls[i] in dictionary:
            vb = dictionary.pop(ls[i])
            if isinstance(vb, list):
                vb.append(ls[i + 1])
            elif isinstance(vb, str):
                vb = [vb, ls[i + 1]]
            elif isinstance(vb,int):
                vb = [vb, ls[i + 1]]
            dictionary[ls[i]] = vb
        else:
            dictionary[ls[i]] = ls[i + 1]
    # 我获得了目标字典dictionary
    strdic = str(dictionary)[1:-1]
    print("JSON字符串：" + strdic)
    # 获取打印json字符串
    dictionary1 = {}
    for i in range(1, length, 2):
        if ls[i] in dictionary1:
            vb = dictionary1.pop(ls[i])
            if isinstance(vb, list):
                vb.append(ls[i - 1])
            elif isinstance(vb, str):
                vb = [vb, ls[i - 1]]
            elif isinstance(vb,int):
                vb=[vb,ls[i-1]]
            dictionary1[ls[i]] = vb
        else:
            dictionary1[ls[i]] = ls[i - 1]
    print("反转后的字典：" + str(dictionary1))
    print("他们的类型分别是：")
    print(type(strdic))
    print(type(dictionary1))


# 老老实实转字典的方法如下：
'''
revdict=[]
for key in dictionary:
    one=key
    two=dictionary[key]
    revdict.append(two)
    revdict.append(one)
#获得反转列表revdict，后序操作类似
'''
