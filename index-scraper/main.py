import flask
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from flask import Flask
from flask_cors import CORS
from selenium.webdriver.chrome.options import Options
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

app = Flask(__name__)
CORS(app)

chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

# driver.implicitly_wait(10)

baseUrl = 'https://finance.yahoo.com/'


@app.route('/fetch_stock/<ticker>', methods=['GET'])
def fetch_stock(ticker):
    driver.get(baseUrl)
    driver.find_element_by_id("yfin-usr-qry").send_keys(ticker)
    driver.find_element_by_id("header-desktop-search-button").click()
    response = requests.get(driver.current_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    price = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span').text
    try:
        change = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span', {
            'class': 'Trsdu(0.3s) Fw(500) Pstart(10px) Fz(24px) C($negativeColor)'}).text
    except:
        try:
            change = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span', {
                'class': 'Trsdu(0.3s) Fw(500) Pstart(10px) Fz(24px) C($positiveColor)'}).text
        except:
            change = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span', {
                'class': 'Trsdu(0.3s) Mstart(4px) D(ib) Fz(24px)'}).text
    change_split = change.split('(')
    price_change = change_split[0]
    percent_change = change_split[1]
    price_change = price_change.replace(' ', '')
    percent_change = percent_change.replace(')', '')
    driver.quit()
    return flask.jsonify(ticker, price, price_change, percent_change)



if __name__ == '__main__':
    app.run(debug=True)
