/**
 * Checks whether the number is prime or not.
 * @param {*} number 
 */
 function isPrime(number) {
    // check if number is equal to 1
    if (number === 1) {
        return 0;
    }
    if (number === 2) {
        return 1;
    }
    if (number > 1) {
        let isPrime = true;
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

const memoizeIsPrime = memoize(isPrime);

function findPrimes(value) {
    setTimeout(() => {
        const primes = [];
        for(let i = 2 ; i <= value; i++) {
            if(memoizeIsPrime(i) === 1) {
                console.log(i);
                primes.push(i);
            }
        }
        self.postMessage(primes.length);
    }, 500);
}

self.onmessage = function(message) {
    findPrimes(message.data);
}
