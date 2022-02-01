var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var calcData = [{ id: "clear", value: "AC" }, { id: "divide", value: "/" }, { id: "multiply", value: "x" }, { id: "seven", value: 7 }, { id: "eight", value: 8 }, { id: "nine", value: 9 }, { id: "subtract", value: "-" }, { id: "four", value: 4 }, { id: "five", value: 5 }, { id: "six", value: 6 }, { id: "add", value: "+" }, { id: "one", value: 1 }, { id: "two", value: 2 }, { id: "three", value: 3 }, { id: "equals", value: "=" }, { id: "zero", value: 0 }, { id: "decimal", value: "." }];

var operators = ["AC", "/", "x", "+", "-", "="];

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var Display = function Display(_ref) {
  var input = _ref.input,
      output = _ref.output;
  return React.createElement(
    "div",
    { className: "output" },
    React.createElement(
      "span",
      { className: "result" },
      output
    ),
    React.createElement(
      "span",
      { id: "display", className: "input" },
      input
    )
  );
};

var Key = function Key(_ref2) {
  var _ref2$keyData = _ref2.keyData,
      id = _ref2$keyData.id,
      value = _ref2$keyData.value,
      handleInput = _ref2.handleInput;
  return React.createElement(
    "button",
    { id: id, onClick: function onClick() {
        return handleInput(value);
      } },
    value
  );
};

var Keyboard = function Keyboard(_ref3) {
  var handleInput = _ref3.handleInput;
  return React.createElement(
    "div",
    { className: "keys" },
    calcData.map(function (key) {
      return React.createElement(Key, { key: key.id, keyData: key, handleInput: handleInput });
    })
  );
};

var App = function App() {
  var _React$useState = React.useState("0"),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      input = _React$useState2[0],
      setInput = _React$useState2[1];

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      output = _React$useState4[0],
      setOutput = _React$useState4[1];

  var _React$useState5 = React.useState(""),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      calculatorData = _React$useState6[0],
      setCalculatorData = _React$useState6[1];

  var handleSubmit = function handleSubmit() {
    console.log({ calculatorData: calculatorData });

    var total = eval(calculatorData);
    setInput(total);
    setOutput(total + " = " + total);
    setCalculatorData("" + total);
  };

  var handleClear = function handleClear() {
    setInput("0");
    setCalculatorData("");
  };

  var handleNumbers = function handleNumbers(value) {
    if (!calculatorData.length) {
      setInput("" + value);
      setCalculatorData("" + value);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData("" + calculatorData);
      } else {
        var lastChat = calculatorData.charAt(calculatorData.length - 1);
        var isLastChatOperator = lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? "" + value : "" + input + value);
        setCalculatorData("" + calculatorData + value);
      }
    }
  };

  var dotOperator = function dotOperator() {
    var lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(calculatorData + " 0.");
      } else {
        setInput(lastChat === "." || input.includes(".") ? "" + input : input + ".");
        var formattedValue = lastChat === "." || input.includes(".") ? "" + calculatorData : calculatorData + ".";
        setCalculatorData(formattedValue);
      }
    }
  };

  var handleOperators = function handleOperators(value) {
    if (calculatorData.length) {
      setInput("" + value);
      var beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

      var beforeLastChatIsOperator = operators.includes(beforeLastChat) || beforeLastChat === "*";

      var lastChat = calculatorData.charAt(calculatorData.length - 1);

      var lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";

      var validOp = value === "x" ? "*" : value;
      if (lastChatIsOperator && value !== "-" || beforeLastChatIsOperator && lastChatIsOperator) {
        if (beforeLastChatIsOperator) {
          var updatedValue = "" + calculatorData.substring(0, calculatorData.length - 2) + value;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData("" + calculatorData.substring(0, calculatorData.length - 1) + validOp);
        }
      } else {
        setCalculatorData("" + calculatorData + validOp);
      }
    }
  };

  var handleInput = function handleInput(value) {
    var number = numbers.find(function (num) {
      return num === value;
    });
    var operator = operators.find(function (op) {
      return op === value;
    });

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  var handleOutput = function handleOutput() {
    setOutput(calculatorData);
  };

  React.useEffect(function () {
    handleOutput();
  }, [calculatorData]);

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "calculator" },
      React.createElement(Display, { input: input, output: output }),
      React.createElement(Keyboard, { handleInput: handleInput })
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));