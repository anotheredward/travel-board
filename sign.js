/* global $, R */

const SIGN_IDS = [
  369,
  642
]

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
    update(rows)
  }
)

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

function update (rows) {
  $('.travel-list').empty()
  $('.travel-list').append('<tr>'
    + '<th class="route_col">From AMA to</th>'
    + '<th class="mins_col">Mins</th>'
    + '<th class="trend_col"></th>'
    + '</tr>')
  const str = R.pipe(
    R.map(function(item) {
      return generateRow(item.name, parseInt(item.time, 10) + 5, item.time)
    }),
    R.join('')
    )(rows)
  $('.travel-list').append(str)
}

function generateRow (name, previousTime, currentTime) {
  return '<tr>'
  + '<td class="route_col">' + name + '</td>'
  + '<td class="mins_col">' + currentTime + '</td>'
  + '<td class="trend_col">' + getChevron(previousTime, currentTime) + '</td>'
  + '</tr>'
}

function getChevron (previousTime, currentTime) {
  if (previousTime < currentTime) return '<i class="fa fa-chevron-up"></i>'
  if (previousTime > currentTime) return '<i class="fa fa-chevron-down"></i>'
  return ''
}
