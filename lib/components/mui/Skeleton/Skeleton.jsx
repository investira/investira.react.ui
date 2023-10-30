import { forwardRef } from "react";
import { default as MuiSkeleton } from "@mui/material/Skeleton";

const Skeleton = forwardRef((props, ref) => {
  return <MuiSkeleton {...props} ref={ref} />;
});

Skeleton.displayName = "Skeleton";

export default Skeleton;
