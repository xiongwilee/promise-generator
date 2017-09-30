/* eslint-env mocha */

const pg = require('..')
const assert = require('assert')

const promises = [() => {
  return Promise.resolve(0)
}, () => {
  return new Promise((resolve) => {
    resolve(1)
  })
}, () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 100)
  })
}, () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3)
    }, 100)
  })
}, () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(4)
    }, 100)
  })
}]

describe('Peomise generator', () => {
  it('should work', () => {
    return pg(promises).then((data) => {
      data.should.eql([0, 1, 2, 3, 4])
    })
  })
})