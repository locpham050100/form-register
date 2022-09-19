// doi tuong
function Validator(options) {
  const formElement = document.querySelector(options.form);

  if (formElement) {
    console.log(formElement);
  }
}
// dinh nghia rules
Validator.isRequired = function () {};

Validator.isEmail = function () {};
