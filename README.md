# bitfinex-polybar

![Screenshot](https://i.imgur.com/W5ziQtJ.png)

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
cp -rf keys.json $HOME/.config/polybar/
```

Reload the polybar ($MOD + SHIFT + R).

## Run in shell

If you want to run it after the installation,
do not forget to run `cd $HOME/.config/polybar`.

Otherwise, if you want to run it inside the
development environment, only run the
followign command. Do not forget to
edit the `keys.json`.

```bash
node index.js
```
