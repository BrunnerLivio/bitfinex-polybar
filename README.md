# bitfinex-polybar

Bitfinex module for polybar

## Install

```bash
cd bitfinex-polybar
npm install

cat config >> $HOME/.config/polybar/config
cp package.json $HOME/.config/polybar/
cp wallet-sum.js $HOME/.config/polybar/
cp -rf node_modules $HOME/.config/polybar/
```


## Run in shell

```bash
watch -n 60 "node wallet-sum.js"
```