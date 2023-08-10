import { loadingMessage } from "./loading";

let tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPplayer = null;

export function getVideoId(url) {
  const [part1, part2] = url.split("?v=");
  const [videoId] = part2.split("&");

  return videoId;
}

export function loadVideo(url) {
  loadingMessage("Carregando video");

  return new Promise((resolve, reject) => {
    window.YTPplayer = new YT.Player("youtubeVideo", {
      videoId: getVideoId(url),
      events: {
        onReady: () => resolve(),
      },
    });
  });
}
