import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
    {
        input: "src/client/index.ts",
        output: {
            file: "dist/client/index.js",
            format: 'esm',
        },
        external: [''],
        plugins: [typescript(), nodeResolve(), commonjs(), terser()],
    },
    {
        input: "src/server/index.ts",
        output: {
            file: "dist/server/index.js",
            format: 'esm',
        },
        external: ['fs', 'path'],
        plugins: [typescript(), nodeResolve(), commonjs(), terser()],
    }
]