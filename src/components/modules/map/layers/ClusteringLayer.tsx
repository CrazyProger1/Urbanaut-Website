import MarkerClusterGroup from "react-leaflet-cluster";
import React, { ReactNode } from "react";
import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

type Props = {
  children: ReactNode;
};

export const ClusteringLayer = ({ children }: Props) => {
  return <MarkerClusterGroup chunkedLoading>{children}</MarkerClusterGroup>;
};
