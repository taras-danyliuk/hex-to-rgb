(function() {
  const hexInput = document.querySelector("#hex");
  const rgbInput = document.querySelector("#rgb");


  // Listen to changes in HEX input
  hexInput.addEventListener("input", function(event) {
    let value = event.target.value.replace(/[^\w\d]/g, "");

    // Remove everything except digits and words
    value = value.replace(/[^\w\d]/g, "");
    
    console.log(value, "hex")
  });


  // Listen to changes in RGB input
  rgbInput.addEventListener("input", function(event) {
    console.log(event.target.value, "hex")
  })
})()