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
export function CustomTools() {
  const map = useMap();

  setTimeout(() => {
    document.getElementById("draw-polygon")!.onclick = () => {
      map.pm.disableGlobalEditMode();
      map.pm.disableGlobalRemovalMode();
      map.pm.disableDraw();
      map.pm.enableDraw("Polygon");
    };

    document.getElementById("edit-polygon")!.onclick = () => {
      map.pm.disableDraw();
      map.pm.disableGlobalRemovalMode();
      map.pm.enableGlobalEditMode();
    };

    document.getElementById("delete-shape")!.onclick = () => {
      map.pm.disableDraw();
      map.pm.disableGlobalEditMode();
      map.pm.enableGlobalRemovalMode();
    };

    document.getElementById("pointer-tool")!.onclick = () => {
      map.pm.disableDraw();
      map.pm.disableGlobalEditMode();
      map.pm.disableGlobalRemovalMode();
    };
  }, 300);

  return null;
}

export function BasicToolsControl() {
  const map = useMap();

  useEffect(() => {
    // إنشاء Custom Control
    const MyControl = L.Control.extend({
      options: { position: "topright" }, // مكان الزرار
      onAdd: function () {
        const container = L.DomUtil.create("div", "basic-tools-control");
        container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        container.style.position = "absolute";
        container.style.top = "510px";
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

    // إضافة الأحداث
    const btnIn = document.getElementById("zoom-in");
    const btnOut = document.getElementById("zoom-out");

    const zoomIn = () => map.zoomIn();
    const zoomOut = () => map.zoomOut();

    btnIn?.addEventListener("click", zoomIn);
    btnOut?.addEventListener("click", zoomOut);

    // تنظيف عند إزالة control
    return () => {
      btnIn?.removeEventListener("click", zoomIn);
      btnOut?.removeEventListener("click", zoomOut);
      map.removeControl(control);
    };
  }, [map]);

  return null;
}
// ===================== MAIN MAP =====================
export default function AOI() {
  return (
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
      <CustomTools />
      <BasicToolsControl />
    </MapContainer>
  );
}
