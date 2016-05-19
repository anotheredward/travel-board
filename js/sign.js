/* global $, R */

const DELAY = 30 * 1000
let currentRows = []

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
