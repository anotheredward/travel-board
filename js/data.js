/* global $, R */
var SIGN_IDS = [
  369,
  642
]

function getRows(callback) {
  $.get({
    url: 'https://crossorigin.me/http://trafficnz.info/service/traffic/rest/4/signs/tim/all',
    cache: false
  }, function (data) {
      var ids = '(' + SIGN_IDS.join(', ') + ')'
      var query = '/response/tim[id=' + ids + ']/page/line/(left, right)'
      var signs = $(data).xpath(query)
      var lines = convertSignsToLines(signs)
      var rows = R.pipe(
        R.splitEvery(2),
        R.map(R.zipObj(['name', 'time']))
      )(lines)
      callback(rows)
    }
  ).fail(function (error) {
    console.log(error, new Date())
    $('#loading').html(error.statusText)
  })
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
