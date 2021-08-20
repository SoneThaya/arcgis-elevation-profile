import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const Map = () => {
  const MapEl = useRef(null);

  useEffect(() => {
    loadModules([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/widgets/ElevationProfile",
    ]).then((WebScene, SceneView, ElevationProfile) => {
      const scene = new WebScene({
        portalItem: {
          id: "9a542f6755274436985617a462ffdf44",
        },
      });

      // create the scene view
      const view = new SceneView({
        container: "viewDiv",
        map: scene,
        camera: {
          position: {
            spatialReference: { latestWkid: 3857, wkid: 102100 },
            x: -8238359,
            y: 4967229,
            z: 686,
          },
          heading: 353,
          tilt: 66,
        },
      });

      // create the elevation profile widget
      const elevationProfile = new ElevationProfile({
        view: view,
        // configure widget with desired profile lines
        profiles: [
          {
            type: "ground", // first profile line samples the ground elevation
          },
          {
            type: "view", // second profile samples the view and shows building profiles
          },
        ],
        // hide the select button
        // this button can be displayed when there are polylines in the
        // scene to select and display the elevation profile for
        visibleElements: {
          selectButton: false,
        },
      });

      // add the widget to the view
      view.ui.add(elevationProfile, "top-right");
    });
  }, []);

  return (
    <div
      id="viewDiv"
      style={{ height: "100vh", width: "100vw" }}
      ref={MapEl}
    ></div>
  );
};

export default Map;
