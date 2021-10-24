const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 3001;

const app = express();
let inputNumber = 0; 
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.post('/create', function (req, res) {
  inputNumber = req.body.inputValue;
  console.log("I got the number: ", inputNumber);
});

app.get('/getEratosthenes', (req, res) => {
  //https://stackoverflow.com/questions/15471291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number
  var eratosthenes = function (n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [], upperLimit = Math.sqrt(n), output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
      array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
      if (array[i]) {
        for (var j = i * i; j < n; j += i) {
          array[j] = false;
        }
      }
    }

    for (var i = 2; i < n; i++) {
      if (array[i]) {
        output.push(i);
      }
    }

    return output;
  }
  // https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/median.md
  // https://stackoverflow.com/questions/45309447/calculating-median-javascript
  const median = dataSet => {
    if (dataSet.length === 1) return dataSet[0]
    const sorted = dataSet.sort((a, b) => a - b);
    const ceil = Math.ceil(sorted.length / 2)
    const floor = Math.floor(sorted.length / 2)
    if (ceil === floor) return [sorted[ceil - 1], sorted[ceil]]
    return [sorted[floor]]
  }
  let medians = [];
  medians.push(median(eratosthenes(inputNumber)));
  res.send({ express: medians.toString() });
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})