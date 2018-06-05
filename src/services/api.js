const fetch = require('node-fetch')
const profilesServiceURL = process.env.PROFILES_SERVICE_URL
const fileServiceURL = process.env.FILE_SERVICE_URL

function increasePoints(profileId, pointsAmount, cb) {
  const url = profileServiceURL + '/' + profileId + '/increasePoints'
  const body = { pointsAmount }
  makeBodyRequest(url, 'POST', body, cb)
}

function getBufferFromFile(fileName, cb) {
  const url = fileServiceURL + '/' + fileName
  fetch(url, {
    method: 'GET'
  }).then(res => {
    if (!res.ok) {
      return cb(null, res.status)
    }
    return res.arrayBuffer()
  })
  .then(arrayBuffer => {
    const buffer = Buffer.from(arrayBuffer)
    return cb(null, 200, buffer)
  })
  .catch(err => {
    cb(err)
  })
}

function makeBodylessRequest(url, method, cb) {
  const promise = fetch(url, {
    method: method
  })
  .then(response => response.json())
  
  return promise
}

function makeBodyRequest(url, method, body, cb) {
  fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(res => {
    if (!res.ok) {
      return cb(null, res.status)
    }
    return res.json()
  })
  .then(json => {
    return cb(null, 200, json)
  })
  .catch(err => {
    cb(err)
  })
}

module.exports = {
  increasePoints,
  getBufferFromFile
}
