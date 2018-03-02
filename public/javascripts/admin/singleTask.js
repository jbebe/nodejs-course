
$('.late-chkbox > input')
  .prop('disabled', false)
  .change(function(event){
    console.log('changed');
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
    const inputValue = $this.find('select').val();
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
    $this.text(inputValue);
  }
}
