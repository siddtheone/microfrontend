import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  onNavigate && history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      pathname !== nextPathname && history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_auth-dev-root");
  el && mount(el, { defaultHistory: createBrowserHistory() });
}

export { mount };
