// doi tuong
function Validator(options) {
  var formElement = document.querySelector(options.form);
    console.log(options.rules)
  if (formElement) {
    console.log(formElement);
  }
}
// dinh nghia rules
Validator.isRequired = function () {};

Validator.isEmail = function () {};
