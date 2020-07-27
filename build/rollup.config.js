const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
// import { version } from '../package.json';
const itemName = require('./projectName')//'test'
const resolveFile = function(...dir){return path.join(__dirname,`../${itemName}`, ...dir)};

const plugins = [
  commonjs(),
  json(),
  resolve(),
  babel({
    babelrc: false,
    // presets:[["@babel/plugin-proposal-private-methods", { "loose": true }]],
    presets: [['@babel/preset-env', { modules: false }] ],
    plugins: [["@babel/plugin-transform-classes", { "loose": true}] ]
  })
]


module.exports = [
  {
    input: resolveFile('src/iife.js'),
    output: [{
      file: resolveFile('dist/DomObserver.iife.js'),
      format: 'iife'
    }],
    plugins
  },
  {
    input: resolveFile('src/esm.js'),
    output: [{
      file: resolveFile('dist/DomObserver.esm.js'),
      format: 'esm'
    }],
    plugins
  }
]

