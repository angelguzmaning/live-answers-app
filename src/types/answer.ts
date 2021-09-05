import { array, Decoder, guard, object, string } from "decoders";
import { useEffect, useState } from "react";
import { webSocketUrl } from "../services/liveAnswersService";
import { useWebSocket } from "./webSocket";

export interface Answer {
  answer: string;
  id: string;
}

export const answerDecoder: Decoder<Answer> = object({
  answer: string,
  id: string,
});

export function useLiveAnswers(): Answer[] {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const message = useWebSocket(webSocketUrl);
  useEffect(() => {
    if (message !== "") {
      setAnswers(guard(array(answerDecoder))(JSON.parse(message)));
    }
  }, [message]);

  return answers;
}
