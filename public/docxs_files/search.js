$(document).ready(function() {
  var resetSelects = function() {
    $('#attachments-picker').prop('checked', false);
    $('#no-attachments').prop('checked', false);
    $('.attachment-type-opt').prop('checked', false);
  };
  // Reset attachments radio buttons
  resetSelects();
  // Adv search on click handler
  $('#advanced-search-btn').on('click', function(e) {
    e.preventDefault();
    $('#advanced-search').slideToggle();
  });
  // Attachment types on change handler
  $('.attachments-check').on('change', function(e) {
    if($('#attachments-picker').prop('checked')) {
      $('#attachment-types').slideDown();
    }
    else {
      $('#attachment-types').slideUp();
    }
  });
});
