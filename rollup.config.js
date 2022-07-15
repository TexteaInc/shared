import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

const config = {
  input: './dist/es/index.mjs',
  output: [
    { file: './dist/umd/index.cjs', format: 'umd', name: '@textea/shared' }
  ],
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
      mainFields: ['module', 'main']
    }),
    replace({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    commonjs({
      extensions: ['.js', '.ts', '.tsx'],
      exclude: ['node_modules/lodash-es/']
    })
  ]
}

export default config
