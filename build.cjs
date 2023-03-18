require('esbuild').buildSync({
    entryPoints: ['electron/main.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: 'electron-build/app.js'
})
