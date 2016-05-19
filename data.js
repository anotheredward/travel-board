/* global $, R */
const SIGN_IDS = [
  369,
  642
]

function getRows(callback) {
  $.get('https://crossorigin.me/http://trafficnz.info/service/traffic/rest/4/signs/tim/all',
    function (data) {
      const ids = '(' + SIGN_IDS.join(', ') + ')'
      const query = '/response/tim[id=' + ids + ']/page/line/(left, right)'
      const signs = $(data).xpath(query)
      const lines = convertSignsToLines(signs)
      const rows = R.pipe(
        R.splitEvery(2),
        R.map(R.zipObj(['name', 'time']))
      )(lines)
      callback(rows)
    }
  )
}

/**
 * Converts a NodeList to an [string]
 * @param  {NodeList} signs A list of Nodes containing text
 * @return {[string]} A list of the Node values
 */
function convertSignsToLines (signs) {
  return R.pipe (
    $.makeArray,
    R.pluck('innerHTML')
  )(signs)
}
