import React from "react";

import "./styles.css";

const ListHeader = ({ headerTitles, leftMarginKey }) => (
  <tr className="listHeader">
    <th />
    {headerTitles.map((key) => (
      <th key={key} className="capitalize">
        <div className="availableStatus">
          {leftMarginKey === key ? (
            <div className="availableStatusIndicatorWrapper" />
          ) : null}
          {key}
        </div>
      </th>
    ))}
  </tr>
);

export default ListHeader;
