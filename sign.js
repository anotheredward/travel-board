/* global $, R */

const SIGN_IDS = [334, 335, 336]


$.get('https://crossorigin.me/http://trafficnz.info/service/traffic/rest/4/signs/tim/all',
  function (data) {
    const json = $.xml2json(data)['#document']['response']
    const signs = $.makeArray(json.tim)
    const lines = R.map(sign => ({id: sign.id, items: getItems(sign)}), signs)
    const convertedSigns = R.filter(x => R.contains(parseInt(x.id, 10), SIGN_IDS), lines)
    const convertedItems = R.pipe(
      R.uniqBy(R.prop('name')),
      R.pluck('items'),
      R.flatten
    )(convertedSigns)

    update(convertedItems)
  }
)

function getItems (sign) {
  const lines = R.path(['page', 'line'], sign)
  if (!lines || lines.length === 0) return []

  return R.pipe(
    R.reject(x => x.left == null || x.right == null),
    R.map(x => ({name: x.left, time: x.right}))
  )(lines)
}

function update (items) {
  $('.travel-list').empty()
  const str = R.join('', R.map(item => generateRow(item.name, item.time, item.time + 5), items))
  $('.travel-list').append(str)
}

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
