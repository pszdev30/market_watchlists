import time
import flask
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from flask import Flask
from selenium.webdriver.chrome.options import Options

app = Flask(__name__)

@app.route('/fetch_stock/<ticker>', methods=['GET'])
def fetchStock(ticker):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.get("https://finance.yahoo.com/")
    driver.find_element_by_id("yfin-usr-qry").send_keys(ticker)
    driver.find_element_by_id("header-desktop-search-button").click()
    response = requests.get(driver.current_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    price = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span', {'class': 'Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)'}).text
    change = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span', {'class': 'Trsdu(0.3s) Fw(500) Pstart(10px) Fz(24px) C($negativeColor)'}).text
    changeSplit = change.split('(')
    priceChange = changeSplit[0]
    percentChange = changeSplit[1]
    priceChange = priceChange.replace(' ', '')
    percentChange = percentChange.replace(')', '')
    driver.quit()

    time.sleep(300)

    return flask.jsonify(ticker, price, priceChange, percentChange)




if __name__ == '__main__':
    app.run(debug=True)