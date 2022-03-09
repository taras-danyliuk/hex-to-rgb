(function () {
  const hexRegExShort = /[\da-f]{3}/i;
  const hexRegExLong = /[\da-f]{6}/i;
  const rgbReplace = /[rgba()]/g;
  const rgbReplaceComma = /,\s?/g;


  const inputs = document.querySelectorAll(".input");
  const firstInput = document.querySelector("#first");
  const secondInput = document.querySelector("#second");

  // Add listeners
  inputs.forEach(input => {
    input.addEventListener("input", event => {
      let value = event.target.value;

      // RGB value
      if (
        value.includes(" ") ||
        value.includes(",")
      ) {
        value = value.replace(rgbReplace, "").replace(rgbReplaceComma, " ").split(" ");

        if (value.length >= 3) setValues(event.target, value.slice(0, 3), "rgb");
        else resetValues(event.target);
      }
      // HEX value
      else {
        value = value.replace(/[^\w\d]/g, "");

        if (
          (hexRegExShort.test(value) && value.length === 3) ||
          (hexRegExLong.test(value) && value.length === 6)
        ) {
          if (value.length === 3) value = value.split("").reduce((r, c) => r + `${c}${c}`, "");
          setValues(event.target, `#${value}`, "hex");
        } else {
          resetValues(event.target)
        }
      }
    });
  });

  function resetValues(target) {
    document.body.style.backgroundColor = "#f7f7f8";
    document.documentElement.style.setProperty("--color", "#000000");
    if (target === firstInput) secondInput.value = "";
    else firstInput.value = "";
  }

  function setValues(target, color, type) {
    const oppositeValue = type === "hex" ? hexToRgb(color) : rgbToHex(...color);

    document.body.style.backgroundColor = oppositeValue;
    document.documentElement.style.setProperty("--color", getContrastColor(type === "hex" ? color : oppositeValue));

    if (target === firstInput) secondInput.value = oppositeValue;
    else firstInput.value = oppositeValue;
  }

  function rgbToHex(r, g, b) {
    const hexR = r.toString(16);
    const hexG = g.toString(16);
    const hexB = b.toString(16);

    return "#" + `0${hexR}`.slice(-2) + `0${hexG}`.slice(-2) + `0${hexB}`.slice(-2);
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
  }

  function getContrastColor(hex) {
    const [_, red, green, blue] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return (parseInt(red, 16) * 0.299 + parseInt(green, 16) * 0.587 + parseInt(blue, 16) * 0.114) > 150 ?
      "#000000" :
      "#ffffff";
  }
})();
