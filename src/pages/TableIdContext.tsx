import React, { createContext, useContext, useState } from "react";

interface TableIdContextType {
  tableId: string;
  setTableId: (id: string) => void;
}

const TableIdContext = createContext<TableIdContextType>({
  tableId: "",
  setTableId: () => {},
});

export const useTableId = () => useContext(TableIdContext);

export const TableIdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tableId, setTableId] = useState("");

  return (
    <TableIdContext.Provider value={{ tableId, setTableId }}>
      {children}
    </TableIdContext.Provider>
  );
};
