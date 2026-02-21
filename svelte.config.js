import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-bash.js';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: (code, lang) => {
			const grammar = Prism.languages[lang] || Prism.languages.javascript;
			const html = Prism.highlight(code, grammar, lang);
			return `{@html \`<pre class="language-${lang}"><code>${html}</code></pre>\`}`;
		}
	},
	extensions: ['.svx']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.svx']
};

export default config;
