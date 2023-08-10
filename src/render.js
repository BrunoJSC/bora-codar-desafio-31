const renderChunk = ({ timestamp, text }) => `
<div class="chunk">
<time>${getMinutes(timestamp)}</time>
<p>
  ${groupedText(text, timestamp)}
</p>
</div>
`;

window.seek = function (event) {
  const seekTo = event.target.dataset.seekTo;
  window.YTPlayer.seekTo(seekTo);
  window.YTPlayer.playVideo();
};

export function renderText({ chunks }) {
  const formattedTranscription = chunks.map(renderChunk).join("");
  document.querySelector(".transcription .content").innerHTML =
    formattedTranscription;
}
function getMinutes(timestamp) {
  let date = new Date(null);

  date.setTime(timestamp[0] * 1000);
  return date.toISOString().slice(11, 19);
}

function groupedText(text, timestamp) {
  const words = text.split(" ");
  const group = [];

  for (let index = 0; index < words.length; index++) {
    if (index % 3 === 0) {
      console.log(words.slice(index, index + 3).join(" "));
      group.push(words.slice(index, index + 3).join(" "));
    }
  }

  return group
    .map((item, index) => {
      const [initialTime, finalTime] = timestamp;
      const seekTo =
        index === 0
          ? initialTime
          : (finalTime - initialTime) / (group.length - index) + initialTime;
      return `<span onclick=seek(event) data-seek-to${seekTo} class="word" data-start="${timestamp[index]}">${item}</span>`;
    })
    .join("");
}
