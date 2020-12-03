import { VehicleListItem } from "./VehicleListItem";
import { useGetVehicles } from "../data/hooks";
import "./VehicleList.scss";

export const VehicleList = () => {
  const vehicles = useGetVehicles();
  return (
    <section className="VehicleList">
      {vehicles.map((vehicle: any) => (
        <VehicleListItem key={vehicle.id} {...{ vehicle }} />
      ))}
    </section>
  );
};
