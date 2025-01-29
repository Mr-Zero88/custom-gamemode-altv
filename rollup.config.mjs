// import typescript from "rollup-plugin-typescript2";
// import { terser } from "rollup-plugin-terser";

import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const input = "src/server/index.ts";
const output = "dist/server/index.js";

export default {
    input: [input],
    output: {
        file: output,
        format: 'esm',
    },
    external: ['alt-server', 'fs', 'path'],
    plugins: [typescript(), nodeResolve(), commonjs(), terser()],
};