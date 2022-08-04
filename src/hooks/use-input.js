import { useReducer } from "react";

const initialState = {
  enteredValue: "",
  isInputTouched: false,
};

const inputReducer = (state = initialState, action) => {
  if (action.type === "INPUT") {
    return {
      enteredValue: action.payload,
      isInputTouched: state.isInputTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isInputTouched: true,
      enteredValue: state.enteredValue,
    };
  }
  if (action.type === "RESET") {
    return {
      enteredValue: "",
      isInputTouched: false,
    };
  }

  return state;
};

const useInput = (validateFn) => {
  const [inputState, dispatchInputAction] = useReducer(
    inputReducer,
    initialState,
    () => initialState
  );

  const isInputValid = validateFn(inputState.enteredValue);
  const hasError = !isInputValid && inputState.isInputTouched;

  const enteredValueChangeHandler = ({ target: { value } }) => {
    dispatchInputAction({ type: "INPUT", payload: value });
  };

  const reset = () => {
    dispatchInputAction({ type: "RESET" });
  };

  const inputBlurHandler = () => {
    dispatchInputAction({ type: "BLUR" });
  };

  return {
    enteredValue: inputState.enteredValue,
    isInputValid,
    hasError,
    valueChangeHandler: enteredValueChangeHandler,
    reset,
    inputBlurHandler,
  };
};

export default useInput;