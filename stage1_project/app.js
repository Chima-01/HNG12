const axios = require('axios').default;
const cors = require('cors');
const express = require('express');

const app = express();
const port = 5000 || 8000;

app.use(cors());

function sumOfDigits(num) {
  let number = num;
  let sum = 0;

  while(number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }

  return sum;
}

const isPrime = (num) => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) {
          return false;
        }
    }
    return num > 1;
}

const armStrong = (num) => {
  let oddEven = num % 2 === 0 ? "Even" : "odd";

  let sum = 0;
  const numberString = num.toString();
  const numberOfDigits = numberString.length;

  for (let i = 0; i < numberOfDigits; i++) {
    sum += Math.pow(Number(numberString[i]), numberOfDigits);
  }

  return num === sum ? ["armstrong", oddEven] : [oddEven];
} 

app.get('/api/classify-number', async (req, res) => {
  const number = req.query.number || "nil";

  try {
    const num = Number(number);

    if (isNaN(num) || num < 0) {
      return res.status(400).json({
        number: "alphabet",
        "error": true 
      });
    }
  
    const fact = await axios.get(`http://numbersapi.com/${num}/math`, { timeout: 5000 });

    return res.status(200).json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: num === sumOfDigits(num),
       properties: armStrong(num),
      digit_sum: sumOfDigits(num),
      fun_fact: `${fact.data}`
    });

  } catch (err) {
    res.status(500).json ({
      Error: err.message,
      error: true
    });
  }
});

app.listen(port, () => {
  console.log( `server listening on port ${port}`);
});