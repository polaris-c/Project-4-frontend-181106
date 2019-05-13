'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5c203c39d85a4b02d070fe89/mock-data"',
  // BASE_API: '"http://127.0.0.1:8000"',
  BASE_API: '"http://10.112.99.170:8000"'
})
