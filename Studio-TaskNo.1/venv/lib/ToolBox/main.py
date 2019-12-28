# coding=utf-8
print("Welcome to the earth!\nThere're three functions:")
print("1---Base64")
print("2---Dictionary_Reverse")
print("3---QRcode_Transfer")
while True:
    try:
        choice=input("Please input the number before a function(q to quit):")
    except:
        print("Invalid input! Try again!")
    else:
        if choice=='1':
            from Base64.Base64 import*
            while True:
                try:
                    cho=eval(input("1.加密\n2.解密\n"))
                except:
                    print("Invalid input! Try again!")
                    continue
                else:
                    if cho==1:
                        base64encode()
                        break
                    elif cho==2:
                        base64decode()
                        break
                    else:
                        print("Invalid input! Try again!")
                        continue
        elif choice=='2':
            from Dict_Reverse.Dict_Reverse import*
            dict_reverse()
            continue
        elif choice=='3':
            from Qrcode.QRcode import*
            QRcode()
            continue
        elif choice=='q':
            break
        elif choice not in [1,2,3,q]:
            print("Invalid input! Try again!")
            continue
print ("Program terminated.")