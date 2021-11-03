export const sizeTypes = {
  KB: 1024,
  MB: 1048576,
  GB: 1073741824
}

export const regexSizeInString = /^(\d+)\s*(KB|MB|GB)$/

/**
 * Converts a string with its unit of measurement
 *
 * @param {number|string} size Size to be converted string (case-insensitive) or number in bytes
 *
 * Exemplos:
 * - getSizeInBytes(1024)
 * - getSizeInBytes('1 KB')
 * - getSizeInBytes('3 mb')
 * - getSizeInBytes('1024 Gb')
 *
 * @returns {number} Size in bytes
 */
export const getSizeInBytes = size => {
  if (typeof size === 'number') return size
  if (typeof size !== 'string') return null

  size = size.toUpperCase()

  let [, _size, type] = size.match(regexSizeInString)

  _size = parseInt(_size)

  return _size * sizeTypes[type]
}

/**
 * Returns if a file type matches an accepted types string
 * @param {File}   file   File to be tested if matches
 * @param {string} accept Accepted file types (same as 'accept' attribute in input tags)
 */
export const checkFileType = (file, accept) => {
  if (file instanceof File === false) return false
  if (!accept || accept === '*') return true

  return accept.split(',').some(acceptedType => {
    const trimmed = acceptedType.trim()

    // Se o tipo for .ext (Exemplo: .pdf)
    if (trimmed.match(/^\.[-+.\w]+$/)) {
      return file.name.endsWith(trimmed)
    }

    // Se o tipo for mimetype (Exemplo: application/pdf)
    if (trimmed.match(/^\w+\/[-+.\w]+$/)) {
      return file.type === trimmed
    }

    // Se o tipo for mimetype/* (Exemplo: image/*)
    if (trimmed.match(/^\w+\/\*$/)) {
      return file.type.slice(0, file.type.indexOf('/')) === trimmed.slice(0, -2)
    }

    return false
  })
}

/**
 * Converts a file upload into a base64 string
 *
 * @param {File} fileUpload File upload object
 *
 * @returns {string} Converted base64 string
 */
export const getFileBase64 = async fileUpload => {
  return new Promise((resolve, reject) => {
    if (!fileUpload) {
      return reject()
    }
    const reader = new FileReader()
    reader.readAsDataURL(fileUpload)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
