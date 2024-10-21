import LoaderKit from "react-native-loader-kit";
import React from "react";

const DotLoading = () => {
  return (
    <LoaderKit
      style={{ width: 20, height: 20 }}
      name={"BallPulse"}
      color={"white"}
    />
  );
};

export default DotLoading;
