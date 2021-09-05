import { useState } from "react";
import { sendAnswer } from "../../services/liveAnswersService";
import { setOnChange } from "../../types/event";
import { Message } from "../../types/message";
import { None, Option, Some } from "@sniptt/monads/build";
import { MessageView } from "../MessageView/MessageView";
import { ColumnContainer } from "../ColumnContainer/ColumnContainer";
import { Link } from "react-router-dom";

function AnswerFormPage() {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState<Option<Message>>(None);

  return (
    <ColumnContainer>
      <span>Is a hot dog a sandwich? Why?</span>
      <input
        placeholder="Insert Answer"
        value={answer}
        onChange={setOnChange(setAnswer)}
      ></input>
      <button onClick={() => onSend(answer, setAnswer, setMessage)}>
        Send
      </button>

      {message.isSome() && (
        <MessageView message={message.unwrap()}></MessageView>
      )}

      <Link to="/liveAnswers">See Live Answers</Link>
    </ColumnContainer>
  );
}

export default AnswerFormPage;

async function onSend(
  answer: string,
  setAnswer: (url: string) => void,
  setMessage: (message: Option<Message>) => void
) {
  const result = await sendAnswer(answer);

  const message = result.match<Message>({
    some: (err) => ({ type: "fail", text: err }),
    none: () => {
      setAnswer("");
      return { type: "success", text: `Your answer has been submitted` };
    },
  });

  setMessage(Some(message));
}
