// doi tuong
function Validator(options) {
  // lay element cua form
  var formElement = document.querySelector(options.form);
  // ham thuc hien validate
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        // xu ly blur khoi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // xu ly khi nguoi dung nhap
        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
          );
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
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
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Trường này phải là email";
    },
  };
};

Validator.minLenght = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Mật khẩu tối thiểu ${min} kí tự`;
    },
  };
};
