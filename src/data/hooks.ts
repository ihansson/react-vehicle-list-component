import { useContext, useEffect, useState } from "react";
import { API_URL, IVehicle, IVehicleData } from "./schema";
import axios from "axios";
import { wrapPromise } from "./utils";
import { DataContext, TEST_MODE } from "./context";
import { mock_loadVehiclesResource, mock_getVehicleData } from "./mocks";
import { getBasicCache, setBasicCache } from "./cache";

// Get individual vehicle data

export function useGetVehicleData(url: string) {
  const { mode } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vehicleData, setVehicleData] = useState({} as IVehicleData);

  useEffect(() => {
    const cache = getBasicCache(`/vehicles${url}`);
    if (cache) {
      setVehicleData(cache);
      return;
    }

    async function getVehicleData() {
      const genericError: Error = new Error("Product Not Found.");
      setLoading(true);
      try {
        if (!url) throw genericError;
        let response: any;
        if (mode === TEST_MODE) {
          response = await mock_getVehicleData(url);
        } else {
          response = await axios.get(`${API_URL}${url}`);
        }
        if (!response.data) {
          throw genericError;
        } else {
          setVehicleData(response.data as IVehicleData);
          setBasicCache(`/vehicles${url}`, response.data as IVehicleData);
        }
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      }
      setLoading(false);
    }

    getVehicleData();
  }, [url, mode]);

  return [loading, error, vehicleData] as [boolean, string, IVehicleData];
}

// Get all vehicles

let vehiclesResource: any = null;

function loadVehiclesResource() {
  vehiclesResource = wrapPromise(
    axios
      .get(`${API_URL}/api/vehicle`)
      .then((response) => {
        if (!response.data?.vehicles || response.data?.vehicles.length === 0) {
          throw new Error("No vehicles found.");
        } else {
          return response.data.vehicles;
        }
      })
      .then((vehicles) =>
        vehicles.map((vehicle: IVehicle) => {
          vehicle.image = vehicle.media.length === 0 ? null : vehicle.media[0];
          return vehicle;
        })
      )
  );
}

function loadVehiclesMock() {
  vehiclesResource = wrapPromise(mock_loadVehiclesResource());
}

export function useGetVehicles() {
  const { mode } = useContext(DataContext);

  const cache = getBasicCache("/vehicles");
  if (cache) return cache;

  if (!vehiclesResource) {
    if (mode === TEST_MODE) {
      loadVehiclesMock();
    } else {
      loadVehiclesResource();
    }
  }

  const results = (vehiclesResource.read() as unknown) as IVehicle[];
  setBasicCache("./vehicles", results);

  return results;
}
