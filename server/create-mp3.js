import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

export const createMP3 = () =>
  new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic);

    // Run FFmpeg
    ffmpeg()
      // Input file
      .input("audio.mp4")

      // Audio bit rate
      .outputOptions("-ab", "20k")

      // Output file
      .saveToFile("audio.mp3")

      // Log the percentage of work completed
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
      })

      // The callback that is run when FFmpeg is finished
      .on("end", () => {
        console.log("Audio converted successfully");
        resolve();
      })

      // The callback that is run when FFmpeg encountered an error
      .on("error", (error) => {
        console.error(error);
        reject(error);
      });
  });
