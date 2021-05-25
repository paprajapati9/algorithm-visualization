import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import "regenerator-runtime/runtime";
import "core-js/stable";

export default {
    input: "viz.js",
    output: {
      file: "dist/PPviz.min.js",
      format: "iife", //cjs for production
      name: "algoviz",
      extend: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      postcss({
        plugins: [
          require("cssnano")({
            preset: "default"
          })
        ],
        extract: true
      }),
      uglify.uglify()
    ]
}