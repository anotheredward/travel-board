/* global $ */


$.get('http://cors.io/?u=http://trafficnz.info/service/traffic/rest/4/signs/tim/all',
  function (data) {
    console.log($.parseXML(data).find)
  }
)

$('.travel-list').append(
  generateRow('Airport', 30, 15)
)

function generateRow (name, previousTime, currentTime) {
  return `<tr>
  <td class="route_col">${name}</td>
  <td class="mins_col">${currentTime}</td>
  <td class="trend_col">${getChevron(previousTime, currentTime)}</td>
  </tr>`
}

function getChevron (previousTime, currentTime) {
  if (previousTime < currentTime) return '<i class="fa fa-chevron-up"></i>'
  if (previousTime > currentTime) return '<i class="fa fa-chevron-down"></i>'
  return ''
}
