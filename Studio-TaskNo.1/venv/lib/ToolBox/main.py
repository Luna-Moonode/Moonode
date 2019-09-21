print("Welcome to the earth!\nThere're three functions:")
print("1---Base64")
print("2---Dictionary_Reverse")
print("3---QRcode_Transfer")
try:
    choice=eval(input("Please input the number before a function:"))
except:
    print("Invalid input! Program terminated.")
else:
    if choice==1:
        from Base64.Base64 import*
        try:
            cho=eval(input("1.加密\n2.解密\n"))
        except:
            print("Invalid input! Program terminated.")
        else:
            if cho==1:
                base64encode()
            elif cho==2:
                base64decode()
            else:
                print("Invalid input! Program terminated.")
    elif choice==2:
        from Dict_Reverse.Dict_Reverse import*
        dict_reverse()
    elif choice==3:
        from Qrcode.QRcode import*
        QRcode()
    elif choice not in [1,2,3]:
        print("Invalid input! Program terminated.")