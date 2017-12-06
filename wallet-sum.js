const BFX = require('bitfinex-api-node');
const async = require('async');
const keys = require('./keys.json');

const API_KEY = keys.API_KEY;
const API_SECRET = keys.API_SECRET;

const bfxRest = new BFX(API_KEY, API_SECRET, { version: 1 }).rest;

const loadWalletBalances = () => {
    return new Promise((resolve, reject) => {
        bfxRest.wallet_balances((err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
};

const getBalanceInUsd = (type, balance) => {
    return new Promise((resolve, reject) => {
        bfxRest.ticker(`${type.toUpperCase()}USD`, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res.last_price * balance);
        });
    });
};

const convertBalancesToUSDSum = balances => {
    return new Promise((resolve, reject) => {
        const cryptoBalances = balances.filter(balance => balance.currency !== 'usd' && balance.currency !== 'eur')
        async.reduce(cryptoBalances, 0, (sum, balance, callback) => {
            getBalanceInUsd(balance.currency, balance.amount)
                .then(conversion => callback(null, conversion + sum))
                .catch(err => callback(err));
        }, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const getWalletSum = () => {
    return new Promise((resolve, reject) => {
        loadWalletBalances()
            .then(balances => convertBalancesToUSDSum(balances)
                .then(resolve)
                .catch(reject))
            .catch(reject);

    });
};

getWalletSum()
    .then(sum => console.log(sum))
    .catch(console.err);