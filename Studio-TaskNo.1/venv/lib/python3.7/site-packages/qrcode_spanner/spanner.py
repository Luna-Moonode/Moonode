# coding=utf-8

import time
import argparse
import qrcode
import pyscreenshot
import zxing


class Spanner:

    def __init__(self):
        self.content = None

    def generate(self):
        img = qrcode.make(self.content)
        img.show()

    def scan(self, filename):
        if filename == 'screen':
            img = pyscreenshot.grab()
            img_file = ''.join(['/tmp/snap', str(time.time()), '.png'])
            img.save(img_file)
        else:
            img_file = filename

        reader = zxing.BarCodeReader()
        barcode = reader.decode(img_file)
        if barcode is None:
            return

        self.content = barcode.parsed
        return


def main():
    parser = argparse.ArgumentParser(description='QR code scanner and generator.')
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-g', '--generate', help='content of QR code to generate')
    group.add_argument('-s', '--scan', help='filename of QR code to scan')
    args = parser.parse_args()
    spanner = Spanner()
    if args.generate:
        spanner.content = args.generate
        spanner.generate()

    if args.scan:
        spanner.scan(args.scan)
        if spanner.content is None:
            print('No QR code detected.')
            exit(1)

        print(spanner.content)


if __name__ == '__main__':
    main()
