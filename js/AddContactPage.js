function phoneNumberFields(value) {
        if (!value)
                return value;

        const input = value.replace(/[^\d]/g, '');
        const inputLength = input.length;

        if (inputLength < 4) {
                return input;
        }
        else if (inputLength < 7) {
          return `(${input.slice(0, 3)}) ${input.slice(3)}`;
        }
        else {
          return `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 9)}`;
        }
}

function formatPhoneNumber() {
  const inputField = document.getElementById('phone-number');
  const formattedInputValue = phoneNumberFields(inputField.value);
  inputField.value = formattedInputValue;
}
