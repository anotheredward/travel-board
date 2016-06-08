/* global $, R */

function render(currentRows, newRows) {
  $('.travel-list').empty()
  $('.travel-list').append('<tr>'
    + '<th class="route_col">From Greenlane to</th>'
    + '<th class="mins_col">Mins</th>'
    + '<th class="trend_col"></th>'
    + '</tr>')

  var formattedRows = newRows.map(function(row, key) {
    var currentTime = R.path([key, 'time'], currentRows) || row.time
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
  if (currentTime < newTime) return '<img src="images/arrows_0002_up.png"></img>'
  if (currentTime > newTime) return '<img src="images/arrows_0001_down.png"></img>'
  return ''
}
