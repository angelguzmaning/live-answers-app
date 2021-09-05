import { Link } from "react-router-dom";
import { useLiveAnswers } from "../../types/answer";
import { ColumnContainer } from "../ColumnContainer/ColumnContainer";

export function LiveAnswersPage() {
  const answers = useLiveAnswers();

  return (
    <ColumnContainer>
      <Link to="/">Go to form</Link>

      <span>Answers to "Is a hot dog a sandwich? Why?":</span>
      {answers.map(({ answer, id }) => (
        <div key={id}>{answer}</div>
      ))}
    </ColumnContainer>
  );
}
