import React, { Suspense } from "react";
import { DataContext, testDataContext } from "../data/context";
import { render, screen, waitFor } from "@testing-library/react";
import { VehicleListItem } from "./VehicleListItem";
import { testVehicle } from "../data/mocks";

const { queryByText, queryByAltText } = screen;

const TestProvider: React.FC = ({ children }) => (
  <DataContext.Provider value={testDataContext}>
    <Suspense fallback={<div>Has fallen back</div>}>{children}</Suspense>
  </DataContext.Provider>
);

const VehicleListItemWithProvider = () => (
  <TestProvider>
    <VehicleListItem vehicle={testVehicle} />
  </TestProvider>
);

describe("Vehicle List", () => {
  it("should render without error", () => {
    render(<VehicleListItemWithProvider />);
  });

  it("should display vehicle title instantly", async () => {
    render(<VehicleListItemWithProvider />);
    expect(queryByText(/Jaguar/i)).toBeInTheDocument();
  });

  it("should display image fallback", async () => {
    render(<VehicleListItemWithProvider />);
    expect(queryByAltText("vehicle")).not.toBeInTheDocument();
  });

  it("should display vehicle data after load", async () => {
    render(<VehicleListItemWithProvider />);
    await waitFor(() => {
      expect(queryByText(/Premium Luxury/i)).toBeInTheDocument();
    });
  });
});
