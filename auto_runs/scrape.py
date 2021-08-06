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



# ALL RETURNING PRICES ARE IN FLOAT FORMAT

def get_date():
    dateval=str(datetime.date.today()) #date
    date=dateval.split('-')
    date=date[2]+'-'+date[1]+'-'+date[0]
    return date


def amazon_india(url):
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    try:
        try:
            price=soup.find(id="priceblock_ourprice").text
        except:
            price=soup.find(id="priceblock_dealprice").text
        price=price[1:]
        price=price.split(",");
        price="".join(price)
        return float(price)
    except:
         return 0
         print("Price Unavailable --AMZ_IN")
    
    

def flipkart(url):
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    try:
        price=soup.find(class_="_30jeq3 _16Jk6d").text
        price=price[1:]
        price=price.split(",")
        price="".join(price)
        return float(price)
    except:
        return 0
        print("Price Unavailable --FLP")


def croma(url):
    session = HTMLSession()
    resp = session.get(url)
    resp.html.render()
    data=resp.html
    try:
        price=data.find(".amount")
        price=price[0].text
        price=price.split(",")
        price="".join(price)
        return float(price)
    except:
        return 0
        print("Price Unavailable --CROMA")
    



def rel_digital(url):
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    try:
        price=soup.find(class_="pdp__offerPrice").text
        price=price[1:]
        price=price.split(",")
        price="".join(price)
        return float(price)
    except:
        return 0
        print("Price Unavailable --REL_DIGI")

def dell_india_pc(url): #only for laptops & desktops
    page=requests.get(url,headers=headers)
    soup=BeautifulSoup(page.content,"html.parser")
    try:
        price=soup.find(class_="cf-dell-price")
        price=price.text
        price=price.split("\n")
        price=price[2][14:]
        price=price.split(",")
        price="".join(price)
        return float(price)
    except:
        return 0
        print("Price Unavailable --DELL-PC")


prd_id="1"

#getting data & running scrapping funcs from product_data.json
date=get_date() #getting date

p_data=open("JSON_Data/product_data.json")
p_data=json.load(p_data)
for i in range(0,len(p_data)):
    amazon_india_price=dell_india_pc_price=rel_digital_price=croma_price=flipkart_price=0
    sites=p_data[prd_id].keys()
    for site in sites:
        if(site=="p_name"):
            pass
        else:
            if(site=="amazon_in"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    amazon_india_price=amazon_india(p_data[prd_id][site])
            elif(site=="flipkart"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    flipkart_price=flipkart(p_data[prd_id][site])
            elif(site=="rel_digi"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    rel_digital_price=rel_digital(p_data[prd_id][site])
            elif(site=="croma"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    croma_price=croma(p_data[prd_id][site])
            elif(site=="dell_pc"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    dell_india_pc_price=dell_india_pc(p_data[prd_id][site])
            else:
                pass
            #opening price_data.json
            pr_data=open("JSON_Data/price_data.json")
            pr_data=json.load(pr_data)        

            #creating json object for price data
            price_data={
                    date:{
                        "amazon_india":amazon_india_price,
                        "flipkart":flipkart_price,
                        "rel_digi":rel_digital_price,
                        "croma":croma_price,
                        "dell_india_pc":dell_india_pc_price
                    }
            }

            #appending

            try:
                pr_data[prd_id].update(price_data)


            except:
                pr_data[prd_id]=price_data  #for new ids
            
            with open("JSON_Data/price_data.json", "w") as file:
                file.seek(0)
                json.dump(pr_data, file,indent=4)


    #incrementation
    print("PRD:",prd_id," -complete.")
    prd_id=int(prd_id)
    prd_id=prd_id+1
    prd_id=str(prd_id)