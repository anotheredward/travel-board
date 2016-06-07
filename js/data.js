/* global $, R */
var SIGN_IDS = [
  369,
  642
]

function getRows(callback) {
  $.get({
    url: 'http://msprox.herokuapp.com/?url=http://trafficnz.info/service/traffic/rest/4/signs/tim/all?_=1465340442713',
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
    $('#loading').html("Service Unavailable")
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
    R.map( function (node) { return node.innerHTML || node.textContent } )
  )(signs)
}
