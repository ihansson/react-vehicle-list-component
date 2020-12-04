import React from "react";

export const LIVE_MODE = "LIVE_MODE";
export const TEST_MODE = "TEST_MODE";

// Data provider context to allow for switching between live and mock data

export const defaultDataContext = { mode: LIVE_MODE };
export const testDataContext = { mode: TEST_MODE };
export const DataContext = React.createContext(defaultDataContext);
