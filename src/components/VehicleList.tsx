import { VehicleListItem } from "./VehicleListItem";
import { useGetVehicles } from "../data/hooks";
import "./VehicleList.scss";
import { IVehicle } from "../data/schema";

export const VehicleList = () => {
  // Get vehicles resource, will throw to Suspense if not ready
  const vehicles = useGetVehicles();
  const staggerAppear = 320;
  let delay = -staggerAppear;
  return (
    <section className="VehicleList">
      {vehicles.map((vehicle: IVehicle) => {
        delay += staggerAppear;
        return (
          <VehicleListItem
            key={vehicle.id}
            delayAppearance={delay}
            {...{ vehicle }}
          />
        );
      })}
    </section>
  );
};
