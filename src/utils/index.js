/**
 * Cleans every html tag from a string
 *
 * @param {string} val Unformatted string
 * @returns {string} Formatted string
 */
export const removeHtmlTags = val => {
  return typeof val === 'string'
    ? val.replace(/<[^>]+>|<\/[^>]+>|<br>|\s|&nbsp;/gi, '')
    : null
}
