import { IVehicle, IVehicleData } from "./schema";

export function mock_useGetVehicles() {
  return [
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
          url: "/images/xf_k17.jpg",
        },
      ],
    },
  ] as IVehicle[];
}

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
                url: "/images/xf_k17.jpg",
              },
            ],
          },
        ] as IVehicle[]),
      500
    )
  );
}

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
    }, 1000);
  });
}
