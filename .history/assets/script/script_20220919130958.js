// doi tuong
function Validator(options) {
  var formElement = document.querySelector(options.form);
  var errorElement = inputElement.parentElement.querySelector('.form-message');
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        inputElement.onblur = function () {
            var errorMessage = rule.test(inputElement.value);
            if (errorMessage) {
                errorElement.innerText = errorMessage
            } else {
                errorElement.innerText = ''
            }
        };
      }
    });
  }
}
// dinh nghia rules
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này";
    },
  };
};

Validator.isEmail = function (selector) {
  return { selector: selector, test: function () {} };
};
