import {Plugin} from "esbuild";
import {rm, writeFile} from 'fs/promises'
import path from "path";
import {renderHtml} from "./renderHtml";

export interface HTMLPluginOptions {
    template?: string;
    title?: string;
    jsPath?: string[];
    cssPath?: string[];
}

const preparePaths = (outputs: string[]) => {
    return outputs.reduce<Array<string[]>>((acc, path) => {
        const [js, css] = acc;
        const splittedFileName = path.split('/').pop()

        if (splittedFileName?.endsWith('.js')) {
            js.push(splittedFileName)
        } else if (splittedFileName?.endsWith('.css')) {
            css.push(splittedFileName)
        }
        return acc;
    },[[], []])
}

export const HTMLPlugin = (options: HTMLPluginOptions): Plugin => {
    return {
        name: 'HTMLPlugin',
        setup(build) {
            const outdir = build.initialOptions.outdir;

            build.onStart(async () => {
                try{
                    if (outdir) {
                        await rm(outdir, {recursive: true})
                    }
                } catch (e) {
                    console.log('Не удалось очистить папку')
                }
            })
            build.onEnd(async (result) => {
                const outputs = result.metafile?.outputs;
                const [jsPath, cssPath] = preparePaths(Object.keys(outputs || {}));
                if (outdir) {
                    await writeFile(path.resolve(outdir, 'index.html'),
                        renderHtml({jsPath, cssPath, ...options})
                    )
                }
            })

        }
    }

};
