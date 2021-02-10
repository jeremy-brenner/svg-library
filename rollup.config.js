import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'app/app.js',
	external: ['Vue'],
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		resolve({
			browser: true
		}),
		vue({
		  compileTemplate: true,
		  css: false,
		  needMap: false
		}),
		postcss({
			config: {
				path: './postcssrc.js'
			},
			extract: false,
			minimize: production
		}),
		production && terser()
	]
};
