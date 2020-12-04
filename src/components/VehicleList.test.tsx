import React, { Suspense } from "react";
import { DataContext, testDataContext } from "../data/context";
import { render, screen, waitFor } from "@testing-library/react";
import { VehicleList } from "./VehicleList";

const { getByText, queryByText } = screen;

const TestProvider: React.FC = ({ children }) => (
  <DataContext.Provider value={testDataContext}>
    <Suspense fallback={<div>Has fallen back</div>}>{children}</Suspense>
  </DataContext.Provider>
);

const VehicleListWithProvider = () => (
  <TestProvider>
    <VehicleList />
  </TestProvider>
);

describe("Vehicle List", () => {
  it("should render without error", () => {
    render(<VehicleListWithProvider />);
  });

  it("should display suspense fallback", () => {
    render(<VehicleListWithProvider />);
    expect(getByText(/Has fallen back/i)).toBeInTheDocument();
  });

  it("should display vehicles after loading and not before", async () => {
    render(<VehicleListWithProvider />);
    expect(queryByText(/xe/i)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText(/xe/i)).toBeInTheDocument();
    });
  });
});
