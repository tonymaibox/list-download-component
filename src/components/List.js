import React, { useEffect, useRef, useState } from "react";

import { getFiles } from "../data/files";
import ListActions from "./ListActions";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";

import "./styles.css";

const fetchFiles = async (setLoading, setFiles, setFileKeys, setFormState) => {
  // We could define this in useEffect,
  // and since the uE will only run on init, the fetch function
  // would only be defined once
  setLoading(true);
  const files = await getFiles();
  const initialValues = files.length
    ? files.reduce((acc, cur) => {
        if (cur.status === "available") {
          return {
            ...acc,
            [cur.name]: { selected: "", path: cur.path, device: cur.device }
          };
        }
        return acc;
      }, {})
    : {};
  // create the initialValues form obj and save to state:
  // {
  //   [name]: {
  //     selected: 'boolean to flag a selected file',
  //     path: '/some/path/to/file',
  //     device: 'device name',
  //   }
  // }
  setFormState(initialValues);
  setFiles(files);
  const fileKeys = Object.keys(files[0]);
  setFileKeys(fileKeys);
  setLoading(false);
};

const List = () => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [fileKeys, setFileKeys] = useState([]);
  const [selectAll, setSelectAll] = useState();
  const selectAllRef = useRef(null);
  const [formState, setFormState] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const availableFiles = Object.keys(formState);

  useEffect(() => {
    fetchFiles(setLoading, setFiles, setFileKeys, setFormState);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <form>
      <ListActions
        selectAllRef={selectAllRef}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        selectedCount={selectedCount}
        setSelectedCount={setSelectedCount}
        formState={formState}
        setFormState={setFormState}
        availableFiles={availableFiles}
      />
      <table>
        <tbody>
          <ListHeader headerTitles={fileKeys} leftMarginKey="status" />
          {files.map(({ device, name, path, status }) => (
            <ListItem
              key={name}
              device={device}
              name={name}
              path={path}
              status={status}
              selectAll={selectAll}
              setSelectAll={setSelectAll}
              formState={formState}
              setFormState={setFormState}
              selectAllRef={selectAllRef}
              selectedCount={selectedCount}
              setSelectedCount={setSelectedCount}
              availableFiles={availableFiles}
            />
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default List;
