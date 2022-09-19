// doi tuong
function Validator(options) {
  var selectorRules = {};
  // lay element cua form
  var formElement = document.querySelector(options.form);
  // ham thuc hien validate
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage;
    // lay cac rules cua selector
    var rules = selectorRules[rule.selector];
    // lap qua tung rule va kiem tra

    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      // neu co loi thi dung viec
      if (errorMessage) break;
    }

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
      // luu lai cac rules cho moi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

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
    console.log(selectorRules);
  }
}
// dinh nghia rules
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Trường này phải là email";
    },
  };
};

Validator.minLenght = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Mật khẩu phải có tối thiểu ${min} kí tự`;
    },
  };
};

Validator.isConfirmed = function (selector, setConfirmedValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === setConfirmedValue()
        ? undefined
        : message || "Giá trị nhập vào chưa chính xác";
    },
  };
};
