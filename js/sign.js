/* global $, R */

var DELAY = 30 * 1000
var currentRows = Cookies.getJSON('currentRows') || []
var storedNewRows = Cookies.getJSON('storedNewRows') || []
var firstLoad = true

update()
firstLoad = false
window.setInterval(update, DELAY)

function update () {
  if (firstLoad && storedNewRows.length)
    render(currentRows, storedNewRows)

  getRows(function(newRows) {
    if (!R.equals(currentRows, newRows)) {
      render(currentRows, newRows)
      Cookies.set('currentRows', currentRows)
      Cookies.set('storedNewRows', newRows)
      currentRows = newRows
    }
  })
}
