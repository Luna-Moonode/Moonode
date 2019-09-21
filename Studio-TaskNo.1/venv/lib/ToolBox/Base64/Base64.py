# coding=utf-8
# base64加密功能
# 加密原理：
# 字符串中每三个字符一组，换成二进制，如不能被3整除，在其后添加"0"补足位数，转码后将0转换为"="
# 再把二进制数（共24个）每六个一组，变成四个字符，高位用0补齐
# 转换成十进制，按照对照表的索引输出四个字符
table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
         'W', 'X', 'Y', 'Z',
         'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
         'w', 'x', 'y', 'z',
         '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']


def base64encode():
    # 对照表
    longstring = ""
    originalstring = input("请输入明文：")
    for i in originalstring:
        longstring += "{:0>8b}".format(ord(i))
    # 处理环节
    status = 0
    if len(longstring) % 24 == 8:
        longstring += "0" * 16
        status = 2
    elif len(longstring) % 24 == 16:
        longstring += "0" * 8
        status = 1
    # 我获得了长度能被24整除的一串数字longstring
    num = 0
    code = ""
    pwd = ""
    for i in longstring:
        num += 1
        code += i
        if num % 6 == 0:
            code = code.lstrip("0")
            if code != "":
                code = int(code, 2)
            else:
                code = 0
            pwd += table[code]
            code = ""
    if status == 1:
        pwd = pwd[0:-1] + "="
    if status == 2:
        pwd = pwd[0:-2] + "=="
    print("转码后的结果是：\n{}".format(pwd))


# decode part
def base64decode():
    # 检查输入部分
    num = 1
    while True:
        originalstring = input("请输入密文：")
        time = originalstring.count("=")
        if len(originalstring) % 4 != 0:
            print("密文格式错误！重新输入！")
            continue
        for i in originalstring:
            if i not in table and i != "=":
                print("密文中有非法字符！重新输入！")
                num = 0
                break
        if time > 2:
            print("密文格式错误！重新输入！")
            num = 0
        elif time == 1 and originalstring[-1] != "=":
            print("密文格式错误！重新输入！")
            num = 0
        elif time == 2 and originalstring[-2:] != "==":
            print("密文格式错误！重新输入！")
            num = 0
        if num == 0:
            continue
        else:
            break
    longstring = ""
    for i in originalstring:
        for j in range(64):
            if i == table[j]:
                longstring += "{:0>6b}".format(j)
    '''获得longstring字符串'''
    # longstring处理部分
    counter = 0
    pwd = ""
    code = ""
    for i in longstring:
        counter += 1
        pwd += i
        if counter % 8 == 0:
            pwd = pwd.lstrip("0")
            code += chr(int(pwd, 2))
            pwd = ""
    print("转码后的结果是{}".format(code))
