import { IVehicle } from "../data/schema";
import { useGetVehicleData } from "../data/hooks";
import "./VehicleListItem.scss";

export const VehicleListItem = ({ vehicle }: { vehicle: IVehicle }) => {
  const [dataLoading, dataError, vehicleData] = useGetVehicleData(vehicle.url);
  if (dataError) return <strong className="Error">{dataError}</strong>;
  return (
    <article className="VehicleListItem">
      <div className="VehicleListItem__media">
        {vehicle.image && (
          <img src={vehicle.image.url} alt={vehicle.image.name} />
        )}
      </div>
      <div className="VehicleListItem__content">
        <h2 className="VehicleListItem__title">
          Jaguar <span>{vehicle.id}</span>
        </h2>
        {dataLoading ? (
          <strong className="loading">Loading</strong>
        ) : (
          <div className="VehicleListItem__data">
            <span className="VehicleListItem__price">
              From {vehicleData.price}
            </span>
            <p className="VehicleListItem__description">
              {vehicleData.description}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};
