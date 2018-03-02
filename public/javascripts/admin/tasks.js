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
    $this.text(inputValue);
  }
}

$('.task-date').dblclick(function(event){
  const $this = $(this);
  $this.html(`<input type="datetime-local" value="${$this.text()}">`);
  $this.find('input').focus();
  if (!$this.data('isEscapeRegistered')){
    $this.keyup(onTitleEscape);
    $this.data('isEscapeRegistered', true);
  }
});
