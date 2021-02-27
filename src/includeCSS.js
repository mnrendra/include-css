const fs = require('fs')
const lsSync = require('@mnrendra/lssync')
const mkdirFullPath = require('./mkdirFullPath')

/**
 * includeCSS
 * @param {String} originDir the origin root directory
 * @param {String} destinationDir the distination root directory
 */
const includeCSS = (originDir = '', destinationDir = './destinationDir') => {
  if (!fs.existsSync(originDir)) throw new Error('origin directory does not exist!')
  if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir)

  const allFiles = lsSync(originDir)
  allFiles.forEach(file => {
    if (file.extension === '.css') {
      const targetLocation = process.platform === 'win32'
        ? file.directory
            .replace(originDir, destinationDir + '\\')
            .replace(/\\\\\\\\/g, '\\')
            .replace(/\\\\\\/g, '\\')
            .replace(/\\\\/g, '\\')
        : file.directory
          .replace(originDir, destinationDir + '/')
          .replace(/\/\/\/\//g, '/')
          .replace(/\/\/\//g, '/')
          .replace(/\/\//g, '/')
      if (!fs.existsSync(targetLocation)) mkdirFullPath(targetLocation)
      fs.createReadStream(file.path).pipe(fs.createWriteStream(targetLocation + file.file))
      console.log('copying .css file from: ' + file.path + ' to: ' + targetLocation + file.file)
    }
  })
}

module.exports = includeCSS
