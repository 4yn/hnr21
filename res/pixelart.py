import requests
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import urllib.request
from PIL import Image

DRIVER_PATH = "C:\\Users\\lenovo\\Desktop\\HnR\\chromedriver",
wd = webdriver.Chrome(executable_path=DRIVER_PATH)

def download(fileName):
    f = open(fileName,'wb')
    f.write(requests.get('https://thispersondoesnotexist.com/image', headers={'User-Agent': 'My User Agent 1.0'}).content)
    f.close()

for i in range(27, 100, 1):
    download(str(i)+'.png')
    wd.get("https://pixel-me.tokyo/en/") #put here the adress of your page
    x = wd.find_element_by_id("input-image")
    x.send_keys('C:\\Users\\lenovo\\Desktop\\HnR\\' + str(i) + '.png')
    time.sleep(60)
    print("finished sleeping")
    #print(wd.find_elements_by_class_name("button"))
    #print(len(wd.find_elements_by_class_name("button")))
    #drv.find_element_by_class_name("button").send_keys(os.getcwd()+"/image.png")
    #elem = driver.find_elements_by_xpath("//*[@type='submit']")#put here the content you have put in Notepad, ie the XPath
    #button = driver.find_element_by_id('buttonID') //Or find button by ID.
    #print(elem.get_attribute("class"))
    img = wd.find_elements_by_class_name("thumbnail__image")
    src = img[1].get_attribute('src')
    print(src)
    print(len(img))
    urllib.request.urlretrieve(src, "raw/modified_" + str(i) + ".png")

    basewidth = 64
    img = Image.open("C:\\Users\\lenovo\\Desktop\\HnR\\raw\\modified_" + str(i) + ".png")
    wpercent = (basewidth/float(img.size[0]))

    hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize((basewidth,hsize), Image.ANTIALIAS)

    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)


    img.save("processed\\mt_" + str(i) + ".png", "PNG") 

    #img = driver.find_element_by_tag_name('canvas')
    #src = img.get_attribute('src')
    #download("modified_"+str(i)+'.jpg')
wd.close()
