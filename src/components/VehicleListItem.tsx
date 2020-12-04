import { Fragment, useState, useEffect } from "react";
import { IVehicle } from "../data/schema";
import { useGetVehicleData } from "../data/hooks";
import "./VehicleListItem.scss";
import { ImageWithFallback } from "./ImageWithFallback";
import { ContentPlaceholder } from "./ContentPlaceholder";

export const VehicleListItem = ({
  vehicle,
  delayAppearance = 0,
}: {
  vehicle: IVehicle;
  delayAppearance?: number;
}) => {
  // Get additional data on the fly
  const [dataLoading, dataError, vehicleData] = useGetVehicleData(vehicle.url);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, delayAppearance);
    return () => {
      clearTimeout(timeout);
    };
  }, [delayAppearance]);

  return (
    <article className={"VehicleListItem " + (visible ? "hasAppeared" : "")}>
      <figure className="VehicleListItem__media">
        <ImageWithFallback image={vehicle.image} />
      </figure>
      <div className="VehicleListItem__content">
        <h2 className="VehicleListItem__title">
          Jaguar <span>{vehicle.id}</span>
        </h2>
        {/* If additional data has errored we don't show anything additional */}
        {dataError ? null : (
          <div className="VehicleListItem__data">
            <span className="VehicleListItem__price">
              {/* While additional data is loading we show placeholders. We could do this in one big
                 block and avoid multiple conditionals but we only have two properties and this prevents
                 additional styling */}
              {dataLoading ? (
                <ContentPlaceholder width="5em" height="1em" />
              ) : (
                <Fragment>From {vehicleData.price}</Fragment>
              )}
            </span>
            <p className="VehicleListItem__description">
              {dataLoading ? (
                <ContentPlaceholder width="100%" height="2.5em" />
              ) : (
                <Fragment>{vehicleData.description}</Fragment>
              )}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};
