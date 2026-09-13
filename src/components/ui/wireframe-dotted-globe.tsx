"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  // AWS Region Coordinates
  const awsRegions = [
    { name: "US East (N. Virginia)", lng: -77.4875, lat: 38.9072 },
    { name: "US West (Oregon)", lng: -119.648, lat: 45.8491 },
    { name: "Europe (Ireland)", lng: -6.2603, lat: 53.3498 },
    { name: "Europe (Frankfurt)", lng: 8.6821, lat: 50.1109 },
    { name: "Asia Pacific (Mumbai)", lng: 72.8777, lat: 19.076 },
    { name: "Asia Pacific (Tokyo)", lng: 139.6503, lat: 35.6762 },
    { name: "Asia Pacific (Sydney)", lng: 151.2093, lat: -33.8688 },
    { name: "South America (São Paulo)", lng: -46.6333, lat: -23.5505 },
    { name: "Africa (Cape Town)", lng: 18.4241, lat: -33.9249 },
    { name: "Asia Pacific (Singapore)", lng: 103.8198, lat: 1.3521 },
    { name: "Asia Pacific (Seoul)", lng: 127.0276, lat: 37.4979 },
    { name: "Europe (London)", lng: -0.1278, lat: 51.5074 },
    { name: "Asia Pacific (Hyderabad)", lng: 78.4867, lat: 17.385 },
    { name: "Middle East (UAE)", lng: 55.2708, lat: 25.2048 },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set up responsive dimensions - more resilient for mobile
    const containerWidth = width;
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) / 2.8; // Reverted from 2.2

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    context.scale(dpr, dpr);

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (
      point: [number, number],
      polygon: number[][],
    ): boolean => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    };

    type LandFeature = {
      type: "Feature";
      geometry:
        | { type: "Polygon"; coordinates: number[][][] }
        | { type: "MultiPolygon"; coordinates: number[][][][] };
      properties: { featurecla?: string } | null;
    };

    type LandData = {
      features: LandFeature[];
    };

    const pointInFeature = (
      point: [number, number],
      feature: LandFeature,
    ): boolean => {
      const geometry = feature.geometry;

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false; // Point is in a hole
          }
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }

      return false;
    };

    const generateDotsInPolygon = (feature: LandFeature, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      const stepSize = dotSpacing * 0.08;
      let pointsGenerated = 0;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
            pointsGenerated++;
          }
        }
      }

      console.log(
        `[v0] Generated ${pointsGenerated} points for land feature:`,
        feature.properties?.featurecla || "Land",
      );
      return dots;
    };

    interface DotData {
      lng: number;
      lat: number;
      visible: boolean;
    }

    const allDots: DotData[] = [];
    let landFeatures: LandData | null = null;

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background)
      context.beginPath();
      context.arc(
        containerWidth / 2,
        containerHeight / 2,
        currentScale,
        0,
        2 * Math.PI,
      );
      context.fillStyle = "#000000";
      context.fill();
      context.strokeStyle = "#ffffff";
      context.lineWidth = 2 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "#ffffff";
        context.lineWidth = 1 * scaleFactor;
        context.globalAlpha = 0.25;
        context.stroke();
        context.globalAlpha = 1;

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature);
        });
        context.strokeStyle = "#ffffff";
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              1.2 * scaleFactor,
              0,
              2 * Math.PI,
            );
            context.fillStyle = "#999999";
            context.fill();
          }
        });

        // Draw AWS Regions with pulsing animation
        const pulse = (Math.sin(Date.now() / 400) + 1) / 2; // Slower, clearer pulse

        awsRegions.forEach((region) => {
          const projected = projection([region.lng, region.lat]);

          // Only draw if the point is on the visible side of the globe
          const isVisible =
            d3.geoDistance(
              [region.lng, region.lat],
              [-projection.rotate()[0], -projection.rotate()[1]],
            ) <
            Math.PI / 2;

          if (isVisible && projected) {
            // Inner core
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              4 * scaleFactor,
              0,
              2 * Math.PI,
            );
            context.fillStyle = "#4ade80"; // Brighter green-400
            context.fill();

            // Outer pulse - enlarged and more visible
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              (4 + pulse * 12) * scaleFactor,
              0,
              2 * Math.PI,
            );
            context.strokeStyle = "#4ade80";
            context.lineWidth = 2 * scaleFactor;
            context.globalAlpha = (1 - pulse) * 0.8;
            context.stroke();
            context.globalAlpha = 1;
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = (await response.json()) as LandData;

        // Generate dots for all land features
        let totalDots = 0;
        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true });
            totalDots++;
          });
        });

        console.log(
          `[v0] Total dots generated: ${totalDots} across ${landFeatures.features.length} land features`,
        );

        render();
      } catch {
        setError("Failed to load land map data");
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Set up rotation and interaction
    const rotation: [number, number] = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.5;

    const rotate = () => {
      if (autoRotate && isVisible) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [...rotation] as [number, number];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newRadius = Math.max(
        radius * 0.5,
        Math.min(radius * 3, projection.scale() * scaleFactor),
      );
      projection.scale(newRadius);
      render();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("wheel", handleWheel);

    // Load the world data
    loadWorldData();

    // Cleanup
    return () => {
      observer.disconnect();
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [width, height]);

  if (error) {
    return (
      <div
        className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}
      >
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">
            Error loading Earth visualization
          </p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="block mx-auto dark"
        style={{ maxWidth: "100%", height: "auto", aspectRatio: "1/1" }}
      />
    </div>
  );
}
