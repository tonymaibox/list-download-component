import React from "react";

import "./styles.css";

const ListActions = ({
  formState,
  setFormState,
  availableFiles,
  selectAllRef,
  selectAll,
  setSelectAll,
  selectedCount,
  setSelectedCount
}) => {
  const displaySelectedCount =
    selectedCount === 0 ? "None Selected" : `Selected ${selectedCount}`;
  const displaySelectedText = Object.values(formState)
    .map(({ device, path, selected }) =>
      selected ? `\ndevice: ${device}\npath: ${path}\n` : ""
    )
    .join("");

  const checkAllHandler = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const newState = Object.assign(formState, {});
      availableFiles.forEach((key) => {
        newState[key].selected = true;
      });
      setFormState(newState);
      setSelectedCount(availableFiles.length);
    } else {
      setSelectedCount(0);
    }
  };

  const downloadButtonHandler = (e) => {
    e.preventDefault();
    // some thunk/fetch function here to download the files
    alert(
      `The Three-Eyed Raven is sending you the following files:\n${displaySelectedText}`
    );
  };

  return (
    <div className="listActions">
      <div className="selectAllWrapper">
        <div className="selectAllCheckbox">
          <input type="checkbox" onClick={checkAllHandler} ref={selectAllRef} />
        </div>
        {displaySelectedCount}
      </div>
      <button disabled={selectedCount === 0} onClick={downloadButtonHandler}>
        Download Selected
      </button>
    </div>
  );
};

export default ListActions;
