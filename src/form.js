import axios from "axios";
import { loadingMessage, startLoading, stopLoading } from "./loading";
import { getVideoId, loadVideo } from "./youtube-api";
import { transcribeAudio } from "./transcribe";
import { renderText } from "./render";

const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    loadingMessage("Iniciando a aplicação");
    startLoading();

    const formData = new FormData(form); // pega os dados do formulário
    const url = formData.get("url"); // pega url

    await loadVideo(url);

    loadingMessage("Video em processamento");
    await axios.get("http://localhost:3333/audio?v=" + getVideoId(url));

    const data = await transcribeAudio();
    console.log(data);

    renderText(data);

    loadingMessage("Processamento finalizado");
  } catch (error) {
    console.log(error);
  } finally {
    stopLoading();
  }
});
