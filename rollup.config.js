import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      name: 'node-mysql-sqlbuilder',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), typescript(), terser()],
  },
];
