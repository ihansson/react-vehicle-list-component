export const ContentPlaceholder = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => {
  return (
    <svg height={height} width={width} style={{ borderRadius: "5px" }}>
      <rect
        x="0"
        y="0"
        height={height}
        width={width}
        style={{ fill: "rgba(0,0,0,0.05)" }}
      />
    </svg>
  );
};
