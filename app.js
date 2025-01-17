/* global FileReader, Papa, Handsontable */

var input = document.getElementById('input-file')
var handsontableContainer = document.getElementById('handsontable-container')

input.onchange = function () {
  var file = this.files[0]
  var reader = new FileReader()

  reader.onload = function (e) {
    var csv = e.target.result
    var data = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      error: function(err, file) {
        console.error("CSV parsing error", err);
      }
    })

    // reset container
    handsontableContainer.innerHTML = ''
    handsontableContainer.className = ''

    Handsontable(handsontableContainer, {
      width: "90%",
      data: data.data,
      rowHeaders: true,
      colHeaders: data.meta.fields,
      columnSorting: true,
      licenseKey: 'non-commercial-and-evaluation'
    })
  }

  file && reader.readAsText(file)
}
