# coding=utf-8
from qrcode import *
def QRcode():
    filename = input("请输入文件名：")
    try:
        file = open(filename, "rt", encoding="utf-8")
    except:
        print("文件不存在！请检查文件目录！")
    else:
        string = file.read()
        file.close()
        img = make(string)
        img.save('{}.jpg'.format(filename))
        print("Done.")
