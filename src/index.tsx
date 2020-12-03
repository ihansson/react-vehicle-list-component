import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { VehicleList } from "./components/VehicleList";
import {
  defaultDataContext,
  DataContext,
  testDataContext,
} from "./data/context";

ReactDOM.render(
  <React.StrictMode>
    <DataContext.Provider value={true ? defaultDataContext : testDataContext}>
      <ErrorBoundary>
        <Suspense fallback={<h1>Suspense</h1>}>
          <VehicleList />
        </Suspense>
      </ErrorBoundary>
    </DataContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
