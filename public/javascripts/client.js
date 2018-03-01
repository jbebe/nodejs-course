$('#uploadNeptunInput').keyup(function (event) {
  const input = this.value;
  const matches = input.match(/^[a-zA-Z\d]{1,6}/) || [''];
  this.value = matches[0].toUpperCase();
});