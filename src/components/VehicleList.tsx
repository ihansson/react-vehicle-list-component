import { VehicleListItem } from "./VehicleListItem";
import { useGetVehicles } from "../data/hooks";

export const VehicleList = () => {
  const vehicles = useGetVehicles();
  return (
    <ul>
      {vehicles.map((vehicle: any) => (
        <VehicleListItem key={vehicle.id} {...{ vehicle }} />
      ))}
    </ul>
  );
};
