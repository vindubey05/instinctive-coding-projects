import fetch from "node-fetch";
import btoa from "btoa";


const memoize = (func) => {
    const cache = {}
    const isAsync = func.constructor.name === 'AsyncFunction';

    return (...args) => {
        const key = btoa(args);
        if (key in cache){
            return isAsync ? Promise.resolve(cache[key]) : cache[key];
        } else {
            const result = func(args);
            if(isAsync) {
                return result.then(res => {
                    cache[key] = res;
                    return res;
                });
            } else {
                cache[key] = result;
                return result;
            }
        }
    }
}

/**
 * Checks whether the number is prime or not.
 * @param {*} number 
 */
function isPrime(number) {
    console.log('Executing isPrime function');
    // check if number is equal to 1
    if (number === 1) {
        return 0;
    }
    if (number > 1) {
        let isPrime = false;
        // looping through 2 to number-1
        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                isPrime = false;
                break;
            }
        }
        return isPrime ? 1 : -1;
    }
    return -1;
}

const memoizeIsPrime = memoize(isPrime);

console.log(memoizeIsPrime(932145654334433));
console.log(memoizeIsPrime(932145654334433));


/**
 * Gets the random number till maximum value.
 * 
 * @param {*} length 
 */
function getRandom(max) {
    return  Math.floor(Math.random() * Math.floor(max));
}

console.log(getRandom(5000));
console.log(getRandom(5000));

/**
 * Find the lat and long. for a given city.
 * 
 * @param {*} currency 
 */
async function findLatLong(city) {
    console.log(`Executing findLatLong for ${city}`);
    const temp = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
    .then(res => res.json())
    .then(res => res[0].latt_long);
    return temp;
}

const memoizeFindLatLong = memoize(findLatLong);

memoizeFindLatLong("London")
.then(res => console.log(res))
.catch(error => console.log(error));

setTimeout(() => {
    memoizeFindLatLong("London")
    .then(res => console.log(res))
    .catch(error => console.log(error));   
}, 5000);

