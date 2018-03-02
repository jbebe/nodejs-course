
$('#exitAdminMode').click(() => {
  $.ajax({
    type: 'delete',
    url: '/api/admin'
  }).done((data) => {
    location.reload();
  }).fail(() => {
    console.log('Could not exit from admin mode!');
  });
});

