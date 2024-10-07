import { useState } from "react";
import styles from "./App.module.css";
import CSVReader, { type IFileInfo } from "react-csv-reader";

function App() {
  const [fileInfo, setFileInfo] = useState<IFileInfo>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [keyLength, setKeyLength] = useState<number>(0);
  return (
    <>
      <CSVReader
        parserOptions={{ header: true }}
        onFileLoaded={(data, fileInfo) => {
          setFileInfo(fileInfo);
          setData(data);
          setKeyLength(Object.keys(data[0]).length);
          console.dir(data);
        }}
      />
      <h2>{fileInfo?.name}</h2>
      <div className={styles.csvContainer} style={{ "--keyLength": keyLength } as React.CSSProperties}>
        {data.length > 0 &&
          Object.keys(data[0]).map((key) => (
            <div className={styles.csvBox} key={key}>
              {key}
            </div>
          ))}
        {data.map((row, rowIndex) =>
          Object.keys(row).map((key) => (
            <div className={styles.csvBox} key={`${rowIndex}-${key}`}>
              {row[key]}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
