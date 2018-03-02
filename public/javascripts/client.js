
//
// Global
//

const modalWindow = $('#modalWindow');
const modalPassword = $('#modalPassword');
let isModalWindowShown = false;

$(window).keydown(function(event){
  if (!isModalWindowShown && event.ctrlKey && event.keyCode === 'A'.charCodeAt(0)){
    isModalWindowShown = true;
    modalWindow.modal('show');
    event.preventDefault();
    return false;
  }
});

modalWindow.on('hidden.bs.modal', () => {
  isModalWindowShown = false;
});

modalWindow.on('shown.bs.modal', () => {
  modalPassword.focus();
});

modalPassword.keypress(function(event){
  if (event.key === 'Enter' && this.value.length > 0){
    $.ajax({
      type: 'post',
      url: '/api/admin',
      data: {
        password: this.value
      }
    }).done(data =>{
      location.reload();
    }).fail(() =>{
      console.log('could not authenticate');
    });
    event.preventDefault();
    return false;
  }
});

//
// Info page
//

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

//
// Upload page
//

$('#uploadNeptunInput').keyup(function(event){
  const input = this.value;
  const matches = input.match(/^[a-zA-Z\d]{1,6}/) || [''];
  this.value = matches[0].toUpperCase();
});