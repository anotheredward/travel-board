/* global $, R */

const SIGN_IDS = [
  343, // undefined pages
  350, // array of pages
  334, // single page object
]
const loggedPipe = R.pipe(
  R.intersperse(R.tap(x => console.log(x))),
  R.apply(R.pipe)
)


$.get('https://crossorigin.me/http://trafficnz.info/service/traffic/rest/4/signs/tim/all',
  function (data) {
    const json = $.xml2json(data)['#document']['response']
    const signs = $.makeArray(json.tim)
    const convertedItems = loggedPipe([
      R.filter(isSelectedSign),

      // convert pages to always be an array
      R.reject(R.propEq('page', undefined)),
      R.map(R.prop('page')),
      R.map(page => R.isArrayLike(page) ? page : [page]), //Wrap in array if it's a single value

      // convert lines to always be an array
      R.reject(R.propEq('line', undefined)),
      R.map(R.prop('line')),
      R.map(line => R.isArrayLike(line) ? line : [line]),

      // extract items from line objects
      R.reject(x => x.left == null || x.right == null),
      R.map(x => ({name: x.left, time: x.right})),

      R.flatten,
      R.uniqBy(R.prop('name'))
      ])(signs)
    // simplify logic, filter signs first, disregard ids, should be able to reduce to a single pipeline
    // A sign is [{ id, page}]
    // A page can be undefined, Object containing a line, Array containing objects containing lines
    // R.reject, then wrap all objects in arrays, then we can treat the whole thing as [[line]]
    // A line can contain left/right OR a center key
    // The left key contains the name, the right key contains the time

    update(convertedItems)
  }
)

function isSelectedSign (sign) {
  return R.contains(parseInt(sign.id, 10), SIGN_IDS, sign)
}

function update (items) {
  $('.travel-list').empty()
  const str = R.join('', R.map(item => generateRow(item.name, parseInt(item.time, 10) + 5, item.time), items))
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
