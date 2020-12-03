import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { VehicleList } from "./components/VehicleList";
import {
  DataContext,
  defaultDataContext,
  testDataContext,
} from "./data/context";
import "./theme/reset.scss";
import "./theme/base.scss";

ReactDOM.render(
  <React.StrictMode>
    <DataContext.Provider value={true ? defaultDataContext : testDataContext}>
      <ErrorBoundary>
        <Suspense fallback={<strong className="Loading">Loading</strong>}>
          <VehicleList />
        </Suspense>
      </ErrorBoundary>
    </DataContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
