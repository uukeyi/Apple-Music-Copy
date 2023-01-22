export const formatAndSetCcNumber = (e ,inputName , setCcNumber) => {
    const inputVal = e.target.value.replace(/ /g, "");
    let inputNumbersOnly = inputVal.replace(/\D/g, "");

    if (inputNumbersOnly.length > 16) {
        inputNumbersOnly = inputNumbersOnly.substr(0, 16);
    }
    const splits = inputNumbersOnly.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
        spacedNumber = splits.join(" ");
    }

    setCcNumber(inputName ,spacedNumber);
};