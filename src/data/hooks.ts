import { useContext, useEffect, useState } from "react";
import { API_URL, IVehicle, IVehicleData } from "./schema";
import axios from "axios";
import { wrapPromise } from "./utils";
import { DataContext, TEST_MODE } from "./context";
import { mock_getVehicleData, mock_loadVehiclesResource } from "./mocks";
import { getBasicCache, setBasicCache } from "./cache";

// Get individual vehicle data

export function useGetVehicleData(url: string) {
  // Get mode from context, either LIVE_MODE or TEST_MODE

  const { mode } = useContext(DataContext);

  // Handle hook state

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vehicleData, setVehicleData] = useState({} as IVehicleData);
  const [cancelled, setCancelled] = useState(false);

  // Effect to handle axios request or return cache, dependent on the mode and url.
  // Should only fire once per component.

  useEffect(() => {
    // If we have the vehicle in the cache retrieve it

    const cache = getBasicCache(`/vehicles${url}`);
    if (cache) {
      setVehicleData(cache);
      return;
    }

    // Make async request for new vehicles

    async function getVehicleData() {
      if (cancelled) return;

      // Error if we don't provide a url or the response data is not as expected

      const genericError: Error = new Error("Product Not Found.");
      setLoading(true);

      try {
        if (!url) throw genericError;
        let response: any;

        // Make live request or get mock data depending on mode

        if (mode === TEST_MODE) {
          response = await mock_getVehicleData(url);
        } else {
          response = await axios.get(`${API_URL}${url}`);
        }

        // Set vehicle data and save cache

        if (!cancelled) {
          setVehicleData(response.data as IVehicleData);
          setBasicCache(`/vehicles${url}`, response.data as IVehicleData);
        }
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      }

      setLoading(false);
    }

    getVehicleData();

    // Cancel on unmount to prevent setting vehicledata if component got dismounted
    return () => {
      setCancelled(true);
    };
  }, [url, mode, cancelled]);

  return [loading, error, vehicleData] as [boolean, string, IVehicleData];
}

// Get all vehicles
// The vehiclesResource is a wrapped promise (see wrapPromise) which can be used to access the data or throw messages to suspense

let vehiclesResource: { read: () => string } | null = null;

function loadVehiclesResource() {
  // Get vehicle list data

  vehiclesResource = wrapPromise(
    axios
      .get(`${API_URL}/api/vehicle`)
      .then((response) => {
        // Return vehicles or throw error if unexpected response

        if (!response.data?.vehicles || response.data?.vehicles.length === 0) {
          throw new Error("No vehicles found.");
        } else {
          return response.data.vehicles;
        }
      })
      .then((vehicles) =>
        // Store the vehicles first image as an image property or null if non exists
        vehicles.map((vehicle: IVehicle) => {
          vehicle.image = vehicle.media.length === 0 ? null : vehicle.media[0];
          return vehicle;
        })
      )
  );
}

function loadVehiclesMock() {
  // Get vehicle list mock data
  vehiclesResource = wrapPromise(mock_loadVehiclesResource());
}

export function useGetVehicles() {
  // Get mode from context, either LIVE_MODE or TEST_MODE
  const { mode } = useContext(DataContext);

  // If we have the list in the cache retrieve it
  const cache = getBasicCache("/vehicles");
  if (cache) return cache;

  // If no vehiclesResource has been created
  if (!vehiclesResource) {
    // Make live request or get mock data depending on mode
    if (mode === TEST_MODE) {
      loadVehiclesMock();
    } else {
      loadVehiclesResource();
    }
  }

  if (vehiclesResource === null) return [];

  // Store vehicles list in cache

  const results = (vehiclesResource.read() as unknown) as IVehicle[];
  setBasicCache("./vehicles", results);

  return results;
}
