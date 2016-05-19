/* global $, R */

const DELAY = 5 * 60 * 100
let currentRows = []

getRows()
window.setInterval(getRows, DELAY)

function update (newRows) {
  if (!R.equals(currentRows, newRows)) {
    render(newRows)
    currentRows = newRows
  }
}
