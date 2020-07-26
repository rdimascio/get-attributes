import path from 'path';
import {uglify} from 'rollup-plugin-uglify';
import {getBabelOutputPlugin} from '@rollup/plugin-babel';

const config = {
	input: 'src/index.js',
	plugins: [
		getBabelOutputPlugin({
			configFile: path.resolve(__dirname, '.babelrc'),
			allowAllFormats: true
		}),
		uglify({
			compress: {
				pure_getters: true, // eslint-disable-line camelcase
				unsafe: true,
				unsafe_comps: true // eslint-disable-line camelcase
			}
		})
	],
	output: {
		exports: 'default',
		file: 'dist/index.min.js',
		format: 'umd',
		name: 'getAttributes'
	}
};

export default config;
