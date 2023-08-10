const copyButton = document.querySelector("button.copy");
copyButton.addEventListener("click", (event) => {
  const texts = document.querySelectorAll(".transcription .content p");

  const output = [...texts].reduce((acc, text) => {
    acc += text.innerText + "\n";
  }, "");
  navigator.clipboard.writeText(output.trim());

  const icon = copyButton.querySelector("i.ph");
  icon.setAttribute("class", "ph ph-check-circle");

  setTimeout(() => {
    icon.setAttribute("class", "ph ph-copy-simple");
    copyButton.blur();
  }, 1000);
});
