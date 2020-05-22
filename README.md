# Currency Converter:
Currency Converter is a sample web app make convert currencies from złoty to EUR.
It based on backend by Symfony and frontend by ReactJS with redux.
And the backend get the currencies from: [CurrencyConverterApi.com](https://www.currencyconverterapi.com/)

## First of all clone the project:
First make clone from currency-converter:
```bash
git clone https://github.com/mahmoudshedid/currency-converter.git
```
## Backend Installation:
Go to the currency-converter/backend directory:
```bash
cd currency-converter/backend
```
Then install dependencies by composer:
```bash
composer install
```
Then make sure you have install 'install Symfony CLI'
If you don't have it you can install by follow this page:
[Install Symfony CLI](https://symfony.com/download)

Then you can run the backend by:
```bash
symfony serve
```
## Frontend Installation:
Go to the currency-converter/frontend directory:
```bash
cd currency-converter/frontend
```
Make sure you have installed yarn, so if you don't have you can install it from:
[Install yarn CLI](https://classic.yarnpkg.com/en/docs/install#debian-stable)
Then install dependencies by yarn:
```bash
yarn install
```
Set environment by copy .env.example to .env
And set the REACT_APP_BACK_END_API_URL to the backend url, if you don't change the backend url leave it as is.
Then you can run the frontend by:
```bash
yarn start
```
