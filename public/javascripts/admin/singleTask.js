
$('.late-chkbox > input')
  .prop('disabled', false)
  .change(function(event){
    const $this = $(this);
    const taskId = $this.closest('tr').data('task-id');
    const userId = $this.closest('tr').data('user-id');
    $.ajax({
      type: 'put',
      url: `/api/submission/${taskId}`,
      contentType: 'application/json',
      data: JSON.stringify({
        neptun: userId,
        late: $this.prop('checked')
      })
    }).done((data) => {
      // location.reload();
    }).fail(() => {
      console.log('Could not change late state!');
    });
  });

$('.result-value').dblclick(function(event){
  const $this = $(this);
  $this.html(`<select>
      <option value="Bad">Bad</option>
      <option value="OK">OK</option>
      <option value="Good">Good</option>
  </select>`);
  $this.find('select').focus();
  $this.keydown(onResultEscape);
});

function onResultEscape(event){
  if (event.key === 'Escape'){
    let $this = $(this);
    const taskId = $this.closest('tr').data('task-id');
    const userId = $this.closest('tr').data('user-id');
    const inputValue = $this.find('select').val();
    $.ajax({
      type: 'put',
      url: `/api/submission/${taskId}`,
      contentType: 'application/json',
      data: JSON.stringify({
        neptun: userId,
        rating: inputValue
      })
    }).done((data) => {
      // location.reload();
    }).fail(() => {
      console.log('Could not change result!');
    });
    $this.text(inputValue);
  }
}

$('.comment-value').dblclick(function(event){
  const $this = $(this);
  $this.html(`<textarea style="width:${$this.innerWidth()}px">${$this.text()}</textarea>`);
  $this.find('textarea').focus();
  $this.keydown(onCommentEscape);
});

function onCommentEscape(event){
  if (event.key === 'Escape'){
    let $this = $(this);
    const inputValue = $this.find('textarea').val();
    const taskId = $this.closest('tr').data('task-id');
    const userId = $this.closest('tr').data('user-id');
    $.ajax({
      type: 'put',
      url: `/api/submission/${taskId}`,
      contentType: 'application/json',
      data: JSON.stringify({
        neptun: userId,
        comment: inputValue
      })
    }).done((data) => {
      // location.reload();
    }).fail(() => {
      console.log('Could not change result!');
    });
    $this.text(inputValue);
  }
}
