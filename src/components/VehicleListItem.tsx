import { IVehicle } from "../data/schema";
import { useGetVehicleData } from "../data/hooks";

export const VehicleListItem = ({ vehicle }: { vehicle: IVehicle }) => {
  const [dataLoading, dataError, vehicleData] = useGetVehicleData(vehicle.url);
  if (dataError) return <div>{dataError}</div>;
  return (
    <li>
      {vehicle.image && (
        <img src={vehicle.image.url} alt={vehicle.image.name} />
      )}
      <h2>
        Jaguar <span>{vehicle.id}</span>
      </h2>
      {dataLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <h3>From {vehicleData.price}</h3>
          <p>{vehicleData.description}</p>
        </div>
      )}
    </li>
  );
};
