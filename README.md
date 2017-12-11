# bitfinex-polybar

Bitfinex module for Polybar. It shows your total Bitfinex deposit in dollars.

## Dependencies

- NodeJS 8.x.x
- polybar

## Installation

```bash

git clone https://github.com/BrunnerLivio/bitfinex-polybar.git
cd bitfinex-polybar

# Edit Keys. Get API keys from your Bitfinex Account
mv keys.json.template keys.json
vi keys.json

# Download NodeJS dependencies
npm install

# Install files
cat config >> $HOME/.config/polybar/config
cp package.json $HOME/.config/polybar/
cp index.js $HOME/.config/polybar/wallet-sum.js
cp -rf node_modules $HOME/.config/polybar/
```

## Run in shell

```bash
watch -n 60 "node wallet-sum.js"
```
