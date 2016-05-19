/* global $, R */

var DELAY = 30 * 1000
var currentRows = []

update()
window.setInterval(update, DELAY)

function update () {
  getRows(function(newRows) {
    if (!R.equals(currentRows, newRows)) {
      render(currentRows, newRows)
      currentRows = newRows
    }
  })
}
