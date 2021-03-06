const { assoc, isNil } = require('ramda')
const versionService = require('../services/version')

const currentVersion = (req, res, next) => {
  versionService.currentVersion()
    .then((version) => {
      isNil(version) ? next() : res.send(version) // eslint-disable-line no-unused-expressions
    })
    .catch(err => next(assoc('status', 400, err)))
}

const incrementVersion = (req, res, next) => {
  versionService.incrementVersion()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => next(assoc('status', 400, err)))
}

module.exports = {
  currentVersion,
  incrementVersion,
}
