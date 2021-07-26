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

def get_date():
    dateval=str(datetime.date.today()) #date
    date=dateval.split('-')
    date=date[2]+'-'+date[1]+'-'+date[0]
    return date


def amazon_india(url):
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    price=soup.find(id="priceblock_dealprice").text
    price=price[1:]
    
    

def flikart(url):
    pass


def croma(url):
    pass


def rel_digital(url):
    pass

def tata_clk(url):
    pass


amazon_india("https://www.amazon.in/Test-Exclusive_2020_1157-Multi-3GB-Storage/dp/B089MV3Q2G/?_encoding=UTF8&smid=A1K6XQ7KUWCZYH&pd_rd_w=DdpQm&pf_rd_p=7037cdee-6642-4363-bdd1-38a775cd69e9&pf_rd_r=QHPC5VQB8W20SGCBGK1E&pd_rd_r=1019d529-c37e-46c9-8727-0a0aca8d99b8&pd_rd_wg=kCrqa&ref_=pd_gw_unk")