#!/usr/bin/env python3

from glob import glob
import re

def snake_to_camel(x):
    return "".join([i[0].upper() + i[1:] for i in x.split('_')])

for gender in ['m', 'f']:

    assetList = [
        ('body', glob(f'body/*{gender}.png')),
        ('face', glob(f'face/*{gender}.png')),
        ('eyes', glob(f'eye/*{gender}.png')),
        ('nose', glob(f'nose/*{gender}.png')),
        ('mouth', glob(f'mouth/*{gender}.png')),
        ('hair', glob(f'hair/*{gender}.png')),
    ]

    for name, files in assetList:
        rows = [
            f"import {snake_to_camel(re.search(r'/(.+).png', file)[1])} from '../../res/{file}'"
            for file in files
        ]

        print("\n".join(rows))

    
    print(f"export const PersonParts{gender.upper()} = {{")
    for name, files in assetList:
        rows = [
            f"{snake_to_camel(re.search(r'/(.+).png', file)[1])}"
            for file in files
        ]
        print(f"\t{name.lower()}: [{', '.join(rows)}],")
    print(f"}}")