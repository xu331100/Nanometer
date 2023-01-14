// rollup.config.js
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
// import dev from 'rollup-plugin-dev'
// import livereload from 'rollup-plugin-livereload'
// import jsx from 'rollup-plugin-jsx'
import rollupPostcss from 'rollup-plugin-postcss'
import sucrase from '@rollup/plugin-sucrase';
import typescript from '@rollup/plugin-typescript';
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
// import myExample from './module/rollup-plugin-my-example.js';

// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
const path = require('path')

export default {
  input: './index.ts',
  treeshake:true,
  output: {
    file: path.join(__dirname, './build/index.js'),
    format: 'umd',
    // dir:''
    name: '$message',
    sourcemap: true,
    globals: {
      // lodash: '_',
    },
    generatedCode:{
      arrowFunctions:true
    }
  },
  cache:true,
  watch: {
    include: ['index.ts','src/**'],
    exclude: 'node_modules/**',
    failAfterWarnings: true,
    clearScreen:false,
    buildDelay:300,

  },
  // external: ['lodash'],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    // jsx( {factory: 'React.createElement'} ),
    commonjs(),
    typescript({
      exclude:['dist/*','build/*'],
      include:['src/*','./index.ts']
    }),
    babel({
      exclude: 'node_modules/**' 
    }),
    json(),
    // peerDepsExternal(),
    scss({
      fileName: 'index.css',
      processor: () => postcss([autoprefixer()]),
      includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/'
      ],
      sass: require('sass')
    }),
    // optimizeLodashImports({useLodashEs:true}),
    optimizeLodashImports(),

    // myExample()

  ],

};