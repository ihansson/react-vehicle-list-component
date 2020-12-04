import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { VehicleList } from "./components/VehicleList";
import { DataContext, defaultDataContext } from "./data/context";
import "./theme/reset.scss";
import "./theme/base.scss";
import { Spinner } from "./components/Spinner";

ReactDOM.render(
  <React.StrictMode>
    {/* The DataContext provides { mode } to tell data providers whether to use live or mock data. */}
    <DataContext.Provider value={defaultDataContext}>
      <ErrorBoundary>
        {/* Suspense catches initial loading of vehicles */}
        <Suspense
          fallback={
            <div className="VehicleListPlaceholder">
              <Spinner />
            </div>
          }
        >
          <VehicleList />
        </Suspense>
      </ErrorBoundary>
    </DataContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
