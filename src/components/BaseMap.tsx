/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MapContainer,
  Marker,
  Popup,
  Circle,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useEffect } from "react";
import logo from "../assets/icons/arrow03.png";
import Lineicon from "../assets/icons/Lineicon.png";
import bezier from "../assets/icons/bezier-curve-tool-icon-illustration-design-GM4X6P.jpg";
import cursor from "../assets/icons/cursor.png";
import spaErase from "../assets/icons/spaErase.png";
import move from "../assets/icons/move.png";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ===================== WMS Layer =====================
function WMSLayer() {
  const map = useMap();

  useEffect(() => {
    const wmsLayer = L.tileLayer.wms(
      "https://www.wms.nrw.de/geobasis/wms_nw_dop",
      {
        layers: "nw_dop_rgb",
        format: "image/png",
        transparent: true,
        attribution: "© WMS NRW",
      }
    );

    wmsLayer.addTo(map);

    return () => {
      map.removeLayer(wmsLayer);
    };
  }, [map]);

  return null;
}
// ===================== CustomTools =====================
export function CustomTools({ setSelectedAreas }: { setSelectedAreas: any }) {
  const map = useMap();

  useEffect(() => {
    // ================= Load saved shapes =================
    const saved = localStorage.getItem("savedShapes");
    if (saved) {
      const layers = JSON.parse(saved);
      setSelectedAreas(layers);
      layers.forEach((geo: any) => {
        const layer = L.geoJSON(geo).addTo(map);
        layer.eachLayer((lyr) => {
          if (
            lyr instanceof L.Polygon ||
            lyr instanceof L.Polyline ||
            lyr instanceof L.Marker ||
            lyr instanceof L.Circle
          ) {
            if (lyr.pm) lyr.pm.enabled();
          }
        });
      });
    }

    // ================= Auto-save + update state =================
    const handleLayerChange = (e: any) => {
      const layer = e.layer;

      if (
        layer instanceof L.Polygon ||
        layer instanceof L.Polyline ||
        layer instanceof L.Marker ||
        layer instanceof L.Circle
      ) {
        const geo = layer.toGeoJSON();
        setSelectedAreas((prev: any) => {
          const newAreas = [...prev, geo];
          localStorage.setItem("savedShapes", JSON.stringify(newAreas));
          return newAreas;
        });
      }
    };

    map.on("pm:create", handleLayerChange);
    map.on("pm:edit", () => {
      const all: GeoJSON.GeoJsonObject[] = [];
      map.eachLayer((layer) => {
        if (
          layer instanceof L.Polygon ||
          layer instanceof L.Polyline ||
          layer instanceof L.Marker ||
          layer instanceof L.Circle
        ) {
          all.push(layer.toGeoJSON());
        }
      });
      localStorage.setItem("savedShapes", JSON.stringify(all));
      setSelectedAreas(all);
    });
    map.on("pm:remove", () => {
      const all: GeoJSON.GeoJsonObject[] = [];
      map.eachLayer((layer) => {
        if (
          layer instanceof L.Polygon ||
          layer instanceof L.Polyline ||
          layer instanceof L.Marker ||
          layer instanceof L.Circle
        ) {
          all.push(layer.toGeoJSON());
        }
      });
      localStorage.setItem("savedShapes", JSON.stringify(all));
      setSelectedAreas(all);
    });

    return () => {
      map.off("pm:create", handleLayerChange);
      map.off("pm:edit");
      map.off("pm:remove");
    };
  }, [map, setSelectedAreas]);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("select-area")!.onclick = () => {
        const onMapClick = () => {
          map.pm.enableDraw("Polygon", {
            finishOn: "dblclick",
            templineStyle: { color: "blue", dashArray: "5,5" },
            hintlineStyle: { color: "blue", dashArray: "5,5" },
          });
          map.pm.setGlobalOptions({ snappable: true, snapDistance: 20 });
          map.off("click", onMapClick);
        };
        map.on("click", onMapClick);
      };

      document.getElementById("adjust-edge")!.onclick = () => {
        map.pm.disableDraw();
        map.pm.disableGlobalRemovalMode();
        map.pm.enableGlobalEditMode();
      };

      document.getElementById("erase-shape")!.onclick = () => {
        map.pm.disableDraw();
        map.pm.disableGlobalEditMode();
        map.pm.enableGlobalRemovalMode();
      };

      document.getElementById("normal-mode")!.onclick = () => {
        map.pm.disableDraw();
        map.pm.disableGlobalEditMode();
        map.pm.disableGlobalRemovalMode();
      };

      document.getElementById("move-shape")!.onclick = () => {
        map.pm.disableDraw();
        map.pm.disableGlobalEditMode();
        map.pm.disableGlobalRemovalMode();
        map.pm.enableGlobalDragMode();
      };
    }, 300);
  }, [map]);

  return (
    <div className="absolute top-20 right-2.5 z-999 bg-white p-4 rounded-[9px] flex flex-col gap-5 w-[66px]">
      <button id="select-area">
        <img src={Lineicon} alt="" className="w-8" />
      </button>
      <button id="adjust-edge">
        <img src={bezier} alt="" className="w-8" />
      </button>
      <button id="normal-mode">
        <img src={cursor} alt="" className="w-20" />
      </button>
      <button id="erase-shape">
        <img src={spaErase} alt="" className="w-8" />
      </button>
      <button id="move-shape">
        <img src={move} alt="" className="w-8" />
      </button>
    </div>
  );
}
export function BasicToolsControl() {
  const map = useMap();

  useEffect(() => {
    //  Custom Control
    const MyControl = L.Control.extend({
      options: { position: "topright" },
      onAdd: function () {
        const container = L.DomUtil.create("div", "basic-tools-control");
        container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        container.style.position = "absolute";
        container.style.top = "350px";
        container.style.right = "10px";
        container.style.zIndex = "1000";

        container.innerHTML = `
          <div style="margin-bottom:8px; background-color:white; padding:8px; border-radius:9px;">
            <img src="${logo}" style="width:30px; transform:rotate(120deg);" />
            <span style="font-size:9px; display:block; text-align:center;">Assist</span>
          </div>
          <div style="background-color:white; padding:8px; border-radius:9px; display:flex; align-items:center; flex-direction:column;">
            <i class="fa-solid fa-comment" style="color:#B8642B; font-size:1.5rem; margin-bottom:8px;"></i>
            <button id="zoom-in" style="font-size:1.5rem; font-weight:bold; border-bottom:2px solid #edd8ca; width:24px; color:#B8642B; margin-bottom:4px;">+</button>
            <button id="zoom-out" style="font-size:1.5rem; font-weight:bold; color:#B8642B;">-</button>
          </div>
        `;

        return container;
      },
    });

    const control = new MyControl();
    map.addControl(control);

    const btnIn = document.getElementById("zoom-in");
    const btnOut = document.getElementById("zoom-out");

    const zoomIn = () => map.zoomIn();
    const zoomOut = () => map.zoomOut();

    btnIn?.addEventListener("click", zoomIn);
    btnOut?.addEventListener("click", zoomOut);

    return () => {
      btnIn?.removeEventListener("click", zoomIn);
      btnOut?.removeEventListener("click", zoomOut);
      map.removeControl(control);
    };
  }, [map]);

  return null;
}
// ===================== MAIN MAP =====================
export default function AOI({ setSelectedAreas }: { setSelectedAreas: any }) {
  return (
    <>
      <MapContainer
        center={[51.5, 7]}
        zoom={17}
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
        attributionControl={false}
        className="absolute top-0 z-0"
      >
        <WMSLayer />

        <Marker position={[51.5, -0.09]}>
          <Popup>Popup Example</Popup>
        </Marker>

        <Circle
          center={[51.508, -0.11]}
          radius={500}
          pathOptions={{ color: "red" }}
        />

        <Polygon
          positions={[
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047],
          ]}
        />
        <BasicToolsControl />
        <CustomTools setSelectedAreas={setSelectedAreas} />
      </MapContainer>
    </>
  );
}
