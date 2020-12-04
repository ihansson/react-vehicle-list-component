import { IVehicle, IVehicleData } from "./schema";

// Returns a promise to resolve to mock vehicles list after a timeout

export function mock_loadVehiclesResource() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: "xe",
            modelYear: "k17",
            url: "/api/vehicle/xe",
            media: [
              {
                name: "vehicle",
                url: "/images/xe_k17.jpg",
              },
            ],
          },
          {
            id: "xf",
            modelYear: "k17",
            url: "/api/vehicle/xf",
            media: [
              {
                name: "vehicle",
                url: "/images/broken.jpg",
              },
            ],
          },
        ] as IVehicle[]),
      500
    )
  ).then((vehicles: unknown) => {
    if (Array.isArray(vehicles)) {
      return vehicles.map((vehicle: IVehicle) => {
        vehicle.image = vehicle.media.length === 0 ? null : vehicle.media[0];
        return vehicle;
      });
    } else {
      return null;
    }
  });
}

// Returns a promise to resolve to mock individual vehicle data after a timeout

export function mock_getVehicleData(url: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: "xj",
          description:
            "Premium luxury saloon, spacious and beautiful yet powerfully agile.",
          price: "£50,000",
          meta: {
            passengers: 5,
            drivetrain: ["AWD", "RWD"],
            bodystyles: ["saloon (SWB)", "saloon (LWB)"],
            emissions: {
              template: "CO2 Emissions $value g/km",
              value: 149,
            },
          },
        } as IVehicleData,
      });
    }, 500);
  });
}

// Single Vehicle for testing

export const testVehicle = {
  id: "xe",
  modelYear: "k17",
  url: "/api/vehicle/xe",
  image: {
    name: "vehicle",
    url: "/images/xe_k17.jpg",
  },
  media: [
    {
      name: "vehicle",
      url: "/images/xe_k17.jpg",
    },
  ],
};
