import "./styles.css";

// example from
// <https://github.com/formatjs/formatjs/blob/28d8a81675bcc8ae5232562a4ac84e94a132022c/packages/react-intl/examples/StaticTypeSafetyAndCodeSplitting/StaticTypeSafetyAndCodeSplitting.tsx>

import * as React from "react";
import { useFormatMessage, IntlProvider, LocaleMessages, importMessages } from "./translations/intlHelpers";

const Component: React.FC = () => {
  const formatMessage = useFormatMessage();
  return (
    <div className="App">
      <h1>Static type safety + code splitting example</h1>
      <p>Have a look at DevTools &gt; Network: only "it.json" is loaded, not "en".</p>
      <p>Also have a look at the examples source code for helpers allowing to obtain static type safety</p>
      <p>Translated content: {formatMessage("hello") /* only valid keys can be passed here */}</p>
    </div>
  );
};

const App: React.FC = (props) => {
  const locale = "it";
  const [messages, setMessages] = React.useState<LocaleMessages | null>(null);
  React.useEffect(() => {
    importMessages(locale).then(setMessages);
  }, []);

  return messages ? (
    <IntlProvider locale={locale} messages={messages}>
      <Component {...props} />
    </IntlProvider>
  ) : null;
};

export default App;
