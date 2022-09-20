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
    // neu co loi thi dung viec kiem tra
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
    return !errorMessage;
  }
  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      // thuc hien lap qua tung rule va validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // truong hop submit voi js
        if (typeof options.onSubmit === "function") {
          var enableInputs = formElement.querySelectorAll("[name]");
          var formValues = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            return (values[input.name] = input.value) && values;
          },
          {});
          options.onSubmit(formValues);
        }
        // truong hop submit voi mac dinh
        else {
          formElement.submit();
        }
      }
    };
    // lap qua moi rule va xu ly ( lang nghe su kien blur, input,.. )
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
