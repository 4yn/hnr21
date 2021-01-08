#!/usr/bin/env python3

from glob import glob
import re

def snake_to_camel(x):
    return "".join([i[0].upper() + i[1:] for i in x.split('_')])

assetList = [
    ('Bodies', glob('body/*.png')),
    ('Faces', glob('face/*.png')),
    ('Eyes', glob('eye/*.png')),
    ('Noses', glob('nose/*.png')),
    ('Mouths', glob('mouth/*.png')),
    ('Hair', glob('hair/*.png')),
]

for name, files in assetList:
    rows = [
        f"import {snake_to_camel(re.search(r'/(.+).png', file)[1])} from '../../res/{file}'"
        for file in files
    ]

    print("\n".join(rows))

    rows = [
        f"\t{snake_to_camel(re.search(r'/(.+).png', file)[1])},"
        for file in files
    ]
    print(f"export const {name} = [")
    print("\n".join(rows))
    print(f"]")