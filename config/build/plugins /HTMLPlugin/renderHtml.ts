import {HTMLPluginOptions} from "./HTMLPlugin";

export const renderHtml = (options: HTMLPluginOptions): string => {
    return options.template || `
                         <!doctype html>
                         <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport"
                                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>${options.title}</title>
                                ${options?.cssPath?.map(path => `<link href=${path} rel='stylesheet'><link>`).join(' ')}
                            </head>
                            <body>
                            <div id="root"></div>
                                ${options?.jsPath?.map(path => `<script src=${path}></script>`).join(' ')}
                                <script>
                                const eventSource = new EventSource('http://localhost:3000/subscribe')
                                eventSource.onopen = function () {console.log('open')}
                                eventSource.onmessage = function () {
                                    console.log('message')
                                    window.location.reload()
                                }
                                eventSource.onerror = function () {console.log('error')}
                                </script>
                                       
                            </body>
                           </html>
                                        `
}