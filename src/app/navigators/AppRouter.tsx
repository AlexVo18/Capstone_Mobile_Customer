import React, { useState } from "react";
import CustomerNavigators from "./CustomerNavigators/CustomerNavigators";
import AuthNavigator from "./AuthNavigators/AuthNavigator";

const AppRouter = () => {
  const [state, setState] = useState<boolean>(true);
  return <>{state ? <AuthNavigator /> : <CustomerNavigators />}</>;
};

export default AppRouter;
