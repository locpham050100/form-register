// doi tuong
function Validator(options) {
  var formElement = document.querySelector(options.form);
  console.log(options.rules);
  if (formElement) {
    console.log(formElement);
  }
}
// dinh nghia rules
Validator.isRequired = function () {
    return 1
};

Validator.isEmail = function () {};
