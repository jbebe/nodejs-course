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
  }
});