import requests
from bs4 import BeautifulSoup
from flask import Flask

url = "https://finance.yahoo.com/quote/NFLX?p=NFLX&.tsrc=fin-srch"


app = Flask(__name__)


@app.route('/get_stock', methods=['GET'])
def getStock():
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    price = soup.find_all('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span').text
    return price


if __name__ == '__main__':
    app.run(debug=True)