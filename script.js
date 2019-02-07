var data = [];
var page = 1;

// Prevent double click
var loadingData = false;

// Init data for page
loadDataForPage(page);

// Call get from api and construct result in table
function loadDataForPage(page) {
  $('#app-spinner').css('display', 'block');
  
  // Call API
  $.getJSON( "https://randomuser.me/api/?page=" + page + "&results=10", function(apiResult) {
    $('#app-table-body').append('<tr style="display: none"></tr>');
    data = [];
    $.each(apiResult.results, function(index, value) {
      data.push(value);
      addTableLine(value);
    });
    
    loadingData = false;
    $('#app-spinner').css('display', 'none');

  }).fail(function() {
    loadingData = false;
    $('#app-spinner').css('display', 'none');
    console.log( "error" );
  });
}


// Build line in table with api result
function addTableLine(oneData) {
  var imgUrl = oneData.picture.large;
  var name = oneData.name.first + ' ' + oneData.name.last;   
  $('#app-table-body tr:last').after('' +
    '<tr onclick="showDialog(\''+ imgUrl + '\', \''+ name + '\')">' +
      '<td class="mdl-data-table__cell--non-numeric">' + oneData.name.title + '</td>' +
      '<td class="mdl-data-table__cell--non-numeric">' + oneData.name.first + '</td>' +
      '<td class="mdl-data-table__cell--non-numeric">' + oneData.name.last + '</td>' +
      '<td class="mdl-data-table__cell--non-numeric">' + oneData.email + '</td>' +
    '</tr>');
}


function backPage() {
  if (page && page > 1 && !loadingData) {
    loadingData = true;
    $("#app-table-body").empty();
    changePage(false);
    loadDataForPage(page);
  }
}


function forwardPage() {
  if (!loadingData) {
    loadingData = true;
    $("#app-table-body").empty();
    changePage(true);
    loadDataForPage(page);
  }
}


function changePage(add) {
  page = add ? page + 1 : page - 1;
  $('#app-span-page').text('Page : ' + page);
}


// ******************************************************************************* //
// Dialog modal (problem on firefox)
// On firefox you need to set to true the pramater dom.dialog_element.enabled
// Where ? juste tape "about:config" in you url bar on firefox

var dialog = document.querySelector('#dialog');
var showDialogButton = document.querySelector('.dialog-button');

if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

function showDialog(imgUrl, name) {
  document.querySelector("div.app-user-image > img").src = imgUrl;
  $(".app-dialog-name").text(name);
  dialog.showModal();
};

dialog.querySelector('.close').addEventListener('click', function() {
  dialog.close();
});

// ******************************************************************************* //
// ******************************************************************************* //
