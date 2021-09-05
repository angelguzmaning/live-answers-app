import ReactDOM from "react-dom";
import AnswerFormPage from "./components/AnswerFormPage/AnswerFormPage";
import { HashRouter, Route, Switch } from "react-router-dom";
import { LiveAnswersPage } from "./components/LiveAnswersPage/LiveAnswersPage";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <AnswerFormPage></AnswerFormPage>
      </Route>
      <Route exact path="/liveAnswers">
        <LiveAnswersPage></LiveAnswersPage>
      </Route>
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
