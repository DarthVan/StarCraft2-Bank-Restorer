import reactPlugin from '@vitejs/plugin-react';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { BuildOptions, ConfigEnv, PluginOption, defineConfig, loadEnv } from 'vite';
import pkg from './package.json' assert { type: 'json' };

const date: string = new Date().toUTCString().replace(/GMT/g, 'UTC');

export default defineConfig(({ command, mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd(), '');
	//console.log(env.BUILD_LOCAL, env.BUILD_DIR);

	const isLocal: boolean = env.IS_LOCAL == 'true';
	const buildDir: string = isLocal ? 'A:/' + pkg.name : 'dist';

	return {
		base: '/',
		root: 'src',
		publicDir: '../public',
		cacheDir: isLocal ? 'A:/vite-cache' : undefined,
		build: getBuildOptions(buildDir),
		define: {
			'process.env': env,
		},
		resolve: {
			alias: [
				{ find: '@src', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
			],
		},
		plugins: [
			reactPlugin({
				include: '**/*.{jsx,tsx}',
			}),
			isLocal ? updateSitemap(buildDir) : null,
		],
		server: {
			port: 8080,
			host: 'localhost',
			hmr: true,
		},
		preview: {
			port: 8080,
			host: 'localhost',
		},
		optimizeDeps: {
			esbuildOptions: {
				sourcemap: false,
			}
		}
	};
});

// Making good file structure
function getBuildOptions(buildDir: string): BuildOptions {
	return {
		outDir: buildDir,
		emptyOutDir: true,
		sourcemap: false,
		rollupOptions: {
			output: {
				chunkFileNames: 'js/[name]-[hash].js',
				entryFileNames: 'js/[name]-[hash].js',

				assetFileNames: ({ name }) => {
					if (/\.(css|s?css|less)$/.test(name ?? '')) // scss and less for exapmle only
						return 'css/[name]-[hash][extname]';

					return 'assets/[name]-[hash][extname]';
				},

				banner: (chunk): string => {
					const banner: string = '/*!\n * ' + pkg.name + ' v.' + pkg.version +
						'\n *\n * Compiled from:\n *\n' +
						chunk.moduleIds.map((moduleId: string): string => {
							const str: string = moduleId.replaceAll(
								// eslint-disable-next-line no-control-regex
								/[\u0000-\u001F\u007F-\u009F]/g,
								'',
							).trim();
							let index: number = str.indexOf(pkg.name);
							index = index < 0 ? str.indexOf('node_modules') : index;
							return ' * ' + str.substring(index);
						}).join('\n') +
						'\n *\n * Сompiled on ' + date + '\n */';
					return banner;
				},
			},
		}
	}
}

// Plugin for updating sitemap.xml
function updateSitemap(buildDir: string): PluginOption {
	const yymmdd: string = new Date().toISOString().slice(0, 10);
	return {
		name: 'generateSitemap',
		apply: 'build',
		writeBundle(): void {
			let sitemap: string = fs.readFileSync('./public/sitemap.xml', 'utf-8');
			sitemap = sitemap.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${yymmdd}</lastmod>`);
			fs.writeFileSync(buildDir + '/sitemap.xml', sitemap);
		},
	};
}