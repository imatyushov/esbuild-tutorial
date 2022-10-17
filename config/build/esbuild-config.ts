import {BuildOptions} from 'esbuild';
import path from "path";
import {CleanPlugin} from "./plugins /CleanPlugin";
import {HTMLPlugin} from "./plugins /HTMLPlugin/HTMLPlugin";

const mode = process.env.MODE || 'development';

const isDev = mode === 'development'
const isProd = mode === 'production'

const resolveRoots = (...segments: string[]) => {
    return path.resolve(__dirname, '..', '..', ...segments)
}

export const config: BuildOptions = {
    bundle: true,
    outdir: resolveRoots('build'),
    entryPoints: [resolveRoots('src', 'index.tsx')],
    entryNames: '[dir]/bundle.[name]-hash',
    allowOverwrite: true,
    tsconfig: resolveRoots('tsconfig.json'),
    minify: isProd,
    sourcemap: isDev,
    metafile: true,
    plugins: [
        CleanPlugin,
        HTMLPlugin({
            title: 'Html file title',
        })
    ],
    loader: {
        '.png': 'file',
        '.jpeg': 'file',
        '.svg': 'file'
    }
}
