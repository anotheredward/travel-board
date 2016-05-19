/* global $, R */

const SIGN_IDS = [
  369,
  642
]
const DELAY = 5 * 60 * 100
let currentRows = []

getRows()
window.setInterval(getRows, DELAY)

function getRows() {
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
      console.log(rows)
      update(rows)
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

function update (newRows) {
  if (R.difference(currentRows, newRows).length) {
    render(newRows)
    currentRows = newRows
  }
}

function render(rows) {
  $('.travel-list').empty()
  $('.travel-list').append('<tr>'
    + '<th class="route_col">From AMA to</th>'
    + '<th class="mins_col">Mins</th>'
    + '<th class="trend_col"></th>'
    + '</tr>')

  const formattedRows = rows.map(function(row, key) {
    const currentTime = R.path([key, 'time'], currentRows) || row.time
    return generateRow(row.name, currentTime, row.time)
  }).join('')

  $('.travel-list').append(formattedRows)
}

function generateRow (name, currentTime, newTime) {
  return '<tr>'
  + '<td class="route_col">' + name + '</td>'
  + '<td class="mins_col">' + newTime + '</td>'
  + '<td class="trend_col">' + getChevron(currentTime, newTime) + '</td>'
  + '</tr>'
}

function getChevron (currentTime, newTime) {
  if (currentTime < newTime) return '<i class="fa fa-chevron-up"></i>'
  if (currentTime > newTime) return '<i class="fa fa-chevron-down"></i>'
  return ''
}
