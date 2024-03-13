const express = require('express')
const app = express()
const port = 3000

let FAIL_READINESS_PROBE = false;
let FAIL_LIVENESS_PROBE = false;
let SUCCEED_STARTUP_PROBE = false;

app.get('/', (req, res) => {
  console.log('/ called')
  res.send('Hello World!')
})

app.get('/succeed-startup', (req, res) => {
  SUCCEED_STARTUP_PROBE = true;
  res.send('App is ready to start')
})

app.get('/break-liveness', (req, res) => {
  FAIL_LIVENESS_PROBE = true;
  res.send('Trouble ahead!')
})

app.get('/break-readiness', (req, res) => {
  FAIL_READINESS_PROBE = true;
  res.send('Trouble ahead!')
})

app.get('/readiness', (req, res) => {
  if (FAIL_READINESS_PROBE) {
    res.sendStatus(503);
    return;
  }

  console.log('/readiness called')

  res.send('Ok')
})

app.get('/liveness', (req, res) => {
  if (FAIL_LIVENESS_PROBE) {
    res.sendStatus(503);
    return;
  }

  console.log('/liveness called')
  res.send('Ok')
})

app.get('/startup', (req, res) => {
  if (SUCCEED_STARTUP_PROBE) {
    console.log('/startup called successfully')
    res.send('Ok')
    return;
  }

  res.sendStatus(503);
})


// Delay server startup
const delay = 10000;

setTimeout(() => {
  app.listen(port, () => {
    console.log(`K8S Probes app listening on port ${port}`)
  })
}, delay);