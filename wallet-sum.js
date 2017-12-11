const BFX = require('bitfinex-api-node');
const async = require('async');
const keys = require('./keys.json');

const API_KEY = keys.API_KEY;
const API_SECRET = keys.API_SECRET;

const bfxRest = new BFX(API_KEY, API_SECRET, { version: 1 }).rest;

let lastSum;

/**
 * Get a list of the users account wallet balances
 * @returns {Promise<Object[]>} List of the users account wallet balances
 */
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

/**
 * Returns the given Cryptobalance in USD
 * @param {string} type The Cryptocoins type e.g. IOT
 * @param {Number} balance The balance as number to convert the price
 * @returns {Promise<Number>} The given balance converted in USD
 */
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

/**
 * Returns the sum of the given balances
 * @param {Object[]} balances The balances you want to get the USD sum of
 * @returns {Promise<Number>} The sum of the given balances in USD
 */
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

/**
 * Get the current Balance of the set API Keys in USD
 * @returns {Promise<Number>} The current Bitfinex balance in USD
 */
const getWalletSum = () => {
    return new Promise((resolve, reject) => {
        loadWalletBalances()
            .then(balances => convertBalancesToUSDSum(balances)
                .then(resolve)
                .catch(reject))
            .catch(reject);

    });
};

/**
 * Returns an ASCII icon, depending if the balance increased or decreased.
 * @param {Number} sum The current sum
 * @returns {String} The icon
 */
getIconFromSum = sum => {
    let icon = '';
    if (lastSum) {    
       icon = sum > lastSum ? '▲' : (sum < lastSum ? '▼' : '=');
    }
    lastSum = sum;
    return icon;
};

/**
 * Formats the sum by flooring it, and adding an icon
 * @param {Number} sum The sum to format
 * @returns {String} The formatted sum
 */
const formatSum = sum => {
    const icon = getIconFromSum(sum);
    return `${icon} ${sum.toFixed(2)}$`;
};

/**
 * Runs the program
 */
const run = () => {
    getWalletSum()
        .then(sum => console.log(formatSum(sum)))
        .catch(console.err);
};


run();