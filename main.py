import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from flask import Flask


app = Flask(__name__)


@app.route('/get_stock/<ticker>', methods=['GET'])
def getStock(ticker):
    driver = webdriver.Chrome()
    driver.get("https://finance.yahoo.com/")
    driver.find_element_by_id("yfin-usr-qry").send_keys(ticker)
    driver.find_element_by_id("header-desktop-search-button").click()
    response = requests.get(driver.current_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    price = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span').text
    driver.quit()
    return price


if __name__ == '__main__':
    app.run(debug=True)