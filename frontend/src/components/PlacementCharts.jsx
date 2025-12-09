import React from "react";

export default function PlacementCharts() {
  return (
    <div>
      <h3>Summary</h3>
      <p>Model accuracy (holdout): ~75.8%</p>
      <div>
        <img src="/assets/placement_distribution.png" alt="placement distribution" style={{width:380, border:"1px solid #eee"}} />
      </div>
      <div style={{ marginTop: 12 }}>
        <img src="/assets/feature_importances.png" alt="feature importances" style={{width:380, border:"1px solid #eee"}} />
      </div>
    </div>
  );
}