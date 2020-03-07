TEST

const client = require('prom-client');

const gauge = new client.Gauge({ name: 'metric_name', help: 'metric_help' });
gauge.setToCurrentTime(); // Sets value to current time
const end = gauge.startTimer();
xhrRequest(function(err, res) {
  end(); // Sets value to xhrRequests duration in seconds
});


new client.Histogram({
  name: 'metric_name',
  help: 'metric_help',
  labelNames: ['status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});


const histogram = new client.Histogram({
  name: 'metric_name',
  help: 'metric_help'
});
histogram.observe(10); // Observe value in histogram
const end = histogram.startTimer();
xhrRequest(function(err, res) {
  end(); // Observes the value to xhrRequests duration in seconds
});


  buckets: client.linearBuckets(0, 10, 20) //Create 20 buckets, starting on 0 and a width of 10
  buckets: client.exponentialBuckets(1, 2, 5) //Create 5 buckets, starting on 1 and with a factor of 2


const summary = new client.Summary({
  name: 'metric_name',
  help: 'metric_help'
});
summary.observe(10);
const end = summary.startTimer();
xhrRequest(function(err, res) {
  end(); // Observes the value to xhrRequests duration in seconds
});

const end = startTimer({ method: 'GET' }); // Set method to GET, we don't know statusCode yet
xhrRequest(function(err, res) {
  if (err) {
    end({ statusCode: '500' }); // Sets value to xhrRequest duration in seconds with statusCode 500
  } else {
    end({ statusCode: '200' }); // Sets value to xhrRequest duration in seconds with statusCode 200
  }
});
