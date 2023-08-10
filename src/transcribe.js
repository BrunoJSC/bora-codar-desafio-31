import { pipeline } from "@xenova/transformers";
import { loadingMessage } from "./loading";
import data from "./data.json";

// let data = null;

export async function transcribeAudio() {
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: "portuguese",
    task: "transcribe",
    return_timestamps: true,
  };

  try {
    console.time("transcribeAudio");
    loadingMessage("Iniciando proceso de transcripcion");

    let transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    ); // <-- Replace with your own model
    // data = await transcribe("../audio.mp3", options);
  } catch (error) {
    console.log("Iniciando proceso de transcripcion", error);
  } finally {
    console.timeEnd("transcribeAudio");
    loadingMessage("Proceso de transcripcion finalizado");
    return data;
  }
}
