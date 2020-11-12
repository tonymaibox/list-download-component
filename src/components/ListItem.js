import React, { useEffect, useState } from "react";

import "./styles.css";

const ListItem = ({
  name,
  device,
  path,
  status,
  setSelectAll,
  selectAll,
  formState,
  setFormState,
  selectAllRef,
  selectedCount,
  setSelectedCount,
  availableFiles
}) => {
  const [checked, setChecked] = useState();
  const isAvailable = status === "available";

  const handleOnChange = (e) => {
    const targetChecked = e.target.checked;
    const updatedCount = targetChecked ? selectedCount + 1 : selectedCount - 1;
    const availableCount = availableFiles.length;

    setFormState({
      ...formState,
      [name]: { selected: targetChecked, path, device }
    });

    if (updatedCount === availableCount) {
      selectAllRef.current.indeterminate = false;
      selectAllRef.current.checked = true;
      setSelectAll(true);
    } else if (updatedCount === 0) {
      selectAllRef.current.indeterminate = false;
      selectAllRef.current.checked = false;
      setSelectAll(false);
    } else {
      selectAllRef.current.indeterminate = true;
    }
    setSelectedCount(updatedCount);
    setChecked(!checked);
  };

  // initialize/reload the checked state based on the parent selectAll state
  useEffect(() => {
    if (isAvailable) {
      setChecked(selectAll);
    }
  }, [selectAll, isAvailable]);

  return (
    <tr
      className={
        checked
          ? "listItem listItemSelected listItemAvailable"
          : "listItem listItemAvailable"
      }
    >
      <td className="listItemCell">
        <input
          type="checkbox"
          disabled={!isAvailable}
          checked={(checked && isAvailable) || false}
          onChange={handleOnChange}
        />
      </td>
      <td className="listItemCell">{name}</td>
      <td className="listItemCell">{device}</td>
      <td className="listItemCell">{path}</td>
      <td className="listItemCell capitalize">
        <div className="availableStatus">
          <div className="availableStatusIndicatorWrapper">
            {isAvailable ? <div className="availableStatusIndicator" /> : null}
          </div>
          {status}
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
