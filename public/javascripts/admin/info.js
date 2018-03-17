// we are after document loaded

const infoContainer = $('#info-container');
let markdownText = infoContainer.text();
const converter = new showdown.Converter();

const md2html = (md) => {
  const html = converter.makeHtml(md);
  infoContainer.html(html);
};

(() => {
  md2html(markdownText);
})();

infoContainer.dblclick(function(){
  infoContainer.html(`<textarea>${markdownText}</textarea>`);
});

infoContainer.keydown(function(event){
  if (event.key === 'Escape'){
    markdownText = $(this).find('textarea').val();
    md2html(markdownText);
    $.ajax({
      type: 'put',
      url: '/api/info',
      contentType: 'application/json',
      data: JSON.stringify({
        content: markdownText
      })
    }).done((data) => {
      // location.reload();
    }).fail(() => {
      console.log('Could not save info text!');
    });
  }
});