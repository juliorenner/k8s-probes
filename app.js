const express = require('express')
const app = express()
const port = 3000

let FAIL_READINESS_PROBE = false;
let FAIL_LIVENESS_PROBE = false;

app.get('/', (req, res) => {
  res.send('Hello World!')
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

  res.send('Ok')
})

app.get('/liveness', (req, res) => {
  if (FAIL_LIVENESS_PROBE) {
    res.sendStatus(503);
    return;
  }

  res.send('Ok')
})

app.listen(port, () => {
  console.log(`K8S Probes app listening on port ${port}`)
})