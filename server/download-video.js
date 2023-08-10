import ytdl from "ytdl-core";
import fs from "fs";

export const downloader = (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log("Download....", videoUrl);

    ytdl(videoUrl, {
      quality: "lowestaudio",
      filter: "audioonly",
    })
      .on("end", () => {
        console.log("Download complete");
        resolve();
      })
      .on("error", () => {
        console.log("Download error");
        reject();
      })
      .pipe(fs.createWriteStream(`audio.mp4`));
  });
