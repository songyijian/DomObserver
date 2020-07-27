// process.env.NODE_ENV = 'development';

const path = require('path');
const serve = require('rollup-plugin-serve');
const configList = require('./rollup.config');
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';

const itemName = require('./projectName')//'/test'
const resolveFile = function(...dir){return path.join(__dirname,`../${itemName}`, ...dir)};

const PORT = 7001;
const devSite = `http://127.0.0.1:${PORT}`;
const devPath = path.join(itemName, 'index.html');
const devUrl = `${devSite}/${devPath}`;

setTimeout(()=>{
  console.log(`[dev]: ${devUrl}`)
}, 1000);

configList.map((config, index) => {

  config.output.sourcemap = true;

  if( index === 0 ) {
    config.plugins = [
      ...config.plugins,
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify('dev'),
      }),
      livereload({
        watch: resolveFile('') // default
      }),
      ...[
        serve({
          host:'10.131.134.84',
          port: PORT,
          open: true, // 自动打开页面
          openPage: '/index.html', // 打开的页面
          contentBase: [resolveFile('')]
        })
      ]
    ]
  }

  return config;
})


module.exports = configList;