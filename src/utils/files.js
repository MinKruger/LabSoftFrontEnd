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
