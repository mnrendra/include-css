#!/usr/bin/env node

const includeCSS = require('../lib')

const { argv } = process
// const argument = argv[argv.length - 1]

let origDir
let destDir

argv.forEach(arg => {
  if (arg.includes('--origin=')) origDir = arg.split('--origin=')[1]
  if (arg.includes('--destination=')) destDir = arg.split('--destination=')[1]
})

includeCSS(origDir, destDir)
