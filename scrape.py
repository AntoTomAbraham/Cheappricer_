from bs4 import BeautifulSoup
import requests,datetime,json,time
from requests_html import HTMLSession

headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 
    'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
    'Accept-Language' : 'en-US,en;q=0.5',
    'Accept-Encoding' : 'gzip', 
    'DNT' : '1', # Do Not Track Request Header 
    'Connection' : 'close'
}

prd_id="1"

#getting data & running scrapping funcs from product_data.json










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
    session = HTMLSession()
    resp = session.get(url)
    resp.html.render()
    data=resp.html
    price=data.find(".amount")
    return price[0].text
    



def rel_digital(url):
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    price=soup.find(class_="pdp__offerPrice").text
    return price[1:]

def dell_india_pc(url): #only for laptops & desktops
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    price=soup.find(class_="cf-dell-price")
    price=price.text
    price=price.split("\n")
    return price[2][14:]

