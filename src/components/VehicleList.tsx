import { VehicleListItem } from "./VehicleListItem";
import { useGetVehicles } from "../data/hooks";
import "./VehicleList.scss";
import { IVehicle } from "../data/schema";

export const VehicleList = () => {
  // Get vehicles resource, will throw to Suspense if not ready
  const vehicles = useGetVehicles();
  return (
    <section className="VehicleList">
      {vehicles.map((vehicle: IVehicle) => (
        <VehicleListItem key={vehicle.id} {...{ vehicle }} />
      ))}
    </section>
  );
};
