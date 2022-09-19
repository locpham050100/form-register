// doi tuong
function Validator(options) {
  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        if (inputElement) {
            inputElement.onblur = function () {
                console.log(rule)
            }
        }
    })
  }
}
// dinh nghia rules
Validator.isRequired = function (selector) {
  return { selector: selector, test: function () {} };
};

Validator.isEmail = function (selector) {
  return { selector: selector, test: function () {} };
};
