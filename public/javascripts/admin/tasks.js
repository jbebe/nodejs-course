$('.task-delete').click(function(event){
  event.preventDefault();
  const $link = $(this);
  $.ajax({
    type: 'delete',
    url: $link.attr('href')
  }).done((data) => {
    location.reload();
  }).fail(() => {
    console.log('Could not delete task!');
  });
  return false;
});

$('.task-title').dblclick(function(event){
  const $this = $(this);
  $this.html(`<input type="text" value="${$this.text()}">`);
  $this.find('input').focus();
  if (!$this.data('isEscapeRegistered')){
    $this.keyup(onTitleEscape);
    $this.data('isEscapeRegistered', true);
  }
});

function onTitleEscape(event){
  if (event.key === 'Escape'){
    let $this = $(this);
    let inputValue = $this.find('input').val();
    inputValue = inputValue || '<missing input>';
    const id = $this.data('id');
    $.ajax({
      type: 'put',
      url: `/api/task/${id}`,
      contentType: 'application/json',
      data: JSON.stringify({
        title: inputValue
      })
    }).done((data) => {
      // location.reload();
    }).fail(() => {
      console.log('Could not set new title!');
    });
    $this.text(inputValue);
  }
}

function onDateEscape(event){
  if (event.key === 'Escape'){
    let $this = $(this);
    let inputValue = $this.find('input').val();
    inputValue = inputValue || '<missing input>';
    const id = $this.data('id');
    $.ajax({
      type: 'put',
      url: `/api/task/${id}`,
      contentType: 'application/json',
      data: JSON.stringify({
        date: (new Date(inputValue)).toJSON()
      })
    }).done((data) => {
      // location.reload();
    }).fail(() => {
      console.log('Could not set new date!');
    });
    $this.text(inputValue);
  }
}

$('.task-date').dblclick(function(event){
  const $this = $(this);
  $this.html(`<input type="datetime-local" value="${$this.text()}">`);
  $this.find('input').focus();
  if (!$this.data('isEscapeRegistered')){
    $this.keyup(onDateEscape);
    $this.data('isEscapeRegistered', true);
  }
});

$('.create-new-task').submit(function(evt){
  evt.preventDefault();
  const $form = $(this);
  const nameValueArr = $form.serializeArray();
  const keyValueMap = {};
  nameValueArr.reduce(
    (_, curr) => (keyValueMap[curr.name] = curr.value),
    null
  );
  $.ajax({
    type: 'post',
    url: '/api/task',
    contentType: 'application/json',
    data: JSON.stringify(keyValueMap)
  }).done((data) => {
    location.reload();
  }).fail(() => {
    console.log('Could not create new date!');
  });
  return false;
});