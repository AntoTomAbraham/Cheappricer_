from bs4 import BeautifulSoup
import requests,datetime,json,time

headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 
    'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
    'Accept-Language' : 'en-US,en;q=0.5',
    'Accept-Encoding' : 'gzip', 
    'DNT' : '1', # Do Not Track Request Header 
    'Connection' : 'close'
}
headers1={'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}

def get_date():
    dateval=str(datetime.date.today()) #date
    date=dateval.split('-')
    date=date[2]+'-'+date[1]+'-'+date[0]
    return date


def amazon_india(url):
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    price=soup.find(id="priceblock_dealprice").text
    return price[1:]
    

def flikart(url):
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    price=soup.find(class_="_30jeq3 _16Jk6d").text
    return price[1:]

def croma(url):
    page=requests.get(url,headers=headers1)
    #soup=BeautifulSoup(page.content,"html.parser")
    #price=soup.find("div",class_="cp-price main-product-price")
    print(page.content)


def rel_digital(url):
    pass

def tata_clk(url):
    pass


croma("https://www.croma.com/bose-sleepbuds-ii-in-ear-passive-noise-cancellation-truly-wireless-earbuds-bluetooth-5-0-user-tested-sleep-technology-white-/p/238781")