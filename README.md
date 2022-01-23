# Typescript-Dev-Env

- `npm i`
- init setup for typescript + debugger.
- jest with typescript was hard to set up, so bailed

## using for algos

- in a new file, write the code
- run `tsc src/${filename}` to make sure it compiles without type errors. fix if necessary
- for simple tests, run a bunch of console logs
- hit the debugger green play button to start
- type in debugger console for variables during that frozen time

## how to setup debugger from scratch (1/15/22)

- npm i typescript
- npm i -D ts-node
- `tsc --init --sourceMap --rootDir src --outDir build`
- write main.ts in src
- hit debug "Make launch file" or something like that, look up current typescript deugger setup
- now hitting the green play button on any file will start debugger in vsc
