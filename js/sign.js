/* global $, R */

var DELAY = 30 * 1000
var currentRows = JSON.parse(localStorage.getItem('currentRows')) || []
var storedNewRows = JSON.parse(localStorage.getItem('storedNewRows')) || []
var firstLoad = true

update()
window.setInterval(update, DELAY)

function update () {
  if (firstLoad && storedNewRows.length) {
    render(currentRows, storedNewRows)
    firstLoad = false
  }

  getRows(function(newRows) {
    if (!R.equals(currentRows, newRows)) {
      render(currentRows, newRows)
      localStorage.setItem('currentRows', JSON.stringify(currentRows))
      localStorage.setItem('storedNewRows', JSON.stringify(newRows))
      currentRows = newRows
    }
  })
}
