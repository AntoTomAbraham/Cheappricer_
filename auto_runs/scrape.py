from bs4 import BeautifulSoup
import requests,json,time,math,random,os
from requests_html import HTMLSession
from datetime import datetime
from dotenv import load_dotenv,find_dotenv,set_key
from scrapingant_client import ScrapingAntClient
from pytz import timezone


headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 
    'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
    'Accept-Language' : 'en-US,en;q=0.5',
    'Accept-Encoding' : 'gzip', 
    'DNT' : '1', # Do Not Track Request Header 
    'Connection' : 'close'
}

#ScrapingAnt 
api=["6c5f48cb84d547bd919b47d1c2a07c83",
    "8bc22ffde48a4ca580c17c0e08f1aa06",
    "a85797bb968b4ac09465c211cd1a0316",
    "544254820d31456f94d480390a8468fc",
    "fcf34ccf1ad0455ba3b16c844009edd0",
    "424f238f608b4fa5aba61633b89a12bd",
    "3d40b80970c640d086e3198712f2feda",
    "02440684342341728a9a74e55aee1a61",
    "2227f6b9c0c14b03b6b4bc4626bf03fa",
    "d8904e15572c4c0d8e55c4699afef215",
    "1b1b9a94e5e94265a8a31614b4f2c58c",
    "616fbfeffed146f0af10843360a7e114",
    "0e55b0dc4682490580199b1ebe8b69f1",
    "68e064407dc540a488b44743b2308852",
    "5f41628cee464b1ca69e98617ab65971"
]

client = ScrapingAntClient(token=api[random.randint(0,len(api)-1)])
now = datetime.now()
dotenv_file =find_dotenv()
load_dotenv()

# ALL RETURNING PRICES ARE IN FLOAT FORMAT

def get_date():
    dt_string = now.strftime("%d-%m-%Y")
    return dt_string

def date_update():
    format = "%d-%m %H:%M %Z"
    now_utc = datetime.now(timezone('UTC'))
    now_asia = now_utc.astimezone(timezone('Asia/Kolkata'))
    os.environ['PRICE_UPD_TIME']=now_asia.strftime(format)
    set_key(dotenv_file, "PRICE_UPD_TIME", os.environ["PRICE_UPD_TIME"])

def amazon_india(url):
    try:
        time.sleep(3)
        try:
            #page=requests.get(url,headers=headers)
            page = client.general_request(url)
            soup=BeautifulSoup(page.content,"html.parser")
            price=soup.find(class_="a-size-medium a-color-price priceBlockDealPriceString").text
        except:
            #page=requests.get(url,headers=headers)
            page = client.general_request(url)
            soup=BeautifulSoup(page.content,"html.parser")
            price=soup.find(class_="a-size-medium a-color-price priceBlockBuyingPriceString").text
        price=price[1:]
        price=price.split(",");
        price="".join(price)
        return float(price)
    except:
        return 0
        print("Price Unavailable --AMZIN")



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
        x=float(price)
        if(math.isnan(x)==True):
            croma(url);
        else:
            return x
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


#mailing
def mail_notify(url,site,p_name):
    #https://maker.ifttt.com/trigger/0_price_trigger/with/key/d644tRYtonOY6HC4kM02Zg?Value1=Alex&Value2=Helen
    url="https://maker.ifttt.com/trigger/0_price_trigger/with/key/d644tRYtonOY6HC4kM02Zg?value1="+site+"&value2="+url+"&value3="+p_name
    requests.post(url)
    


prd_id="1"
failures=0 #setting failures to 0!
#getting data & running scrapping funcs from product_data.json
date=get_date() #getting date

p_data=open("JSON_Data/product_data.json")
p_data=json.load(p_data)
for i in range(0,len(p_data)):
    amazon_india_price=dell_india_pc_price=rel_digital_price=croma_price=flipkart_price=-1
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
                    if(amazon_india_price==0):
                        failures+=1
                        mail_notify(p_data[prd_id][site],"Amazon_India",p_data[prd_id]["p_name"])

            elif(site=="flipkart"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    flipkart_price=flipkart(p_data[prd_id][site])
                    if(flipkart_price==0):
                        failures+=1
                        mail_notify(p_data[prd_id][site],"Flipkart",p_data[prd_id]["p_name"])

            elif(site=="rel_digi"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    rel_digital_price=rel_digital(p_data[prd_id][site])
                    if(rel_digital_price==0):
                        failures+=1
                        mail_notify(p_data[prd_id][site],"Reliance_Digital",p_data[prd_id]["p_name"])

            elif(site=="croma"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    croma_price=croma(p_data[prd_id][site])
                    if(croma_price==0):
                        failures+=1
                        mail_notify(p_data[prd_id][site],"croma",p_data[prd_id]["p_name"])
                    
            elif(site=="dell_pc"):
                if(p_data[prd_id][site]==""):
                    pass
                else:
                    dell_india_pc_price=dell_india_pc(p_data[prd_id][site])
                    if(dell_india_pc_price==0):
                        failures+=1
                        mail_notify(p_data[prd_id][site],"Dell_India_pc",p_data[prd_id]["p_name"])
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
date_update()
os.environ['FAILURES']=str(failures)
set_key(dotenv_file, "FAILURES", os.environ["FAILURES"]) #saving failures