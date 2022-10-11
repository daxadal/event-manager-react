import React, { useState } from "react";

export interface TableProps<T> {
  hasRowSelection: boolean;
  columns: {
    label: string;
    display: (row: T) => string;
  }[];
  data: T[];
}

export default function Table<T>(props: TableProps<T>) {
  const { hasRowSelection, columns, data } = props;

  const [selectedRows, setSelectedRows] = useState(
    new Array(data.length).fill(false)
  );

  const check = (index: number) => {
    selectedRows[index] = !selectedRows[index];
    setSelectedRows([...selectedRows]);
  };

  const areAllSelected = () => !selectedRows.some((value) => value === false);

  const checkAll = () => {
    if (areAllSelected()) {
      setSelectedRows(new Array(data.length).fill(false));
    } else {
      setSelectedRows(new Array(data.length).fill(true));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {hasRowSelection && (
            <th>
              <input
                type="checkbox"
                checked={areAllSelected()}
                onClick={checkAll}
              />
            </th>
          )}
          {columns.map((column) => (
            <th>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr>
            {hasRowSelection && (
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows[index]}
                  onClick={() => check(index)}
                />
              </td>
            )}
            {columns.map((column) => (
              <td>{column.display(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
