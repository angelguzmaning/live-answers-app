import { None, Option, Some } from "@sniptt/monads/build";
import Axios from "axios";
import { guard, object, string } from "decoders";
import { jsendResultDecoder } from "../types/jsend";

export const liveAnswersServer = Axios.create();
export const serverUrl =
  process.env.REACT_APP_LIVE_SERVER_URL || "http://localhost:7501";
liveAnswersServer.defaults.baseURL = serverUrl;

export const webSocketUrl = serverUrl
  .replace("http", "ws")
  .replace("https", "ws");

export async function sendAnswer(answer: string): Promise<Option<string>> {
  const { data } = await liveAnswersServer.post("/answers", { answer });

  const result = guard(
    jsendResultDecoder(object({}), object({ error: string }))
  )(data);

  return result.status === "success" ? None : Some(result.data.error);
}
