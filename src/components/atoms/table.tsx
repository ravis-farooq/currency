import React from "react";
import { TableProps } from "../../types/atomicType";
import { formatNumber } from "../../utils/formatNumber";
import Button from "./button";

const Table: React.FC<TableProps> = ({
  data,
  baseValue,
  symbols,
  baseCurrency,
  handleRemoveCurrency,
}) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <table
        style={{
          border: "2px solid white",
          borderCollapse: "collapse",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th className="table-style">Currency</th>
            <th className="table-style">Amount x V.O.C</th>
            <th className="table-style">Start Rate</th>
            <th className="table-style">End Rate</th>
            <th className="table-style">Change</th>
            <th className="table-style">Change (%)</th>
            <th className="table-style">Action </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data)
            ?.filter(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ([currency, _]) =>
                symbols.includes(currency) && currency !== baseCurrency
            )
            ?.map(([currency, rates]) => (
              <tr key={currency} className="table-style">
                <td className="table-style">{currency}</td>
                <td className="table-style">
                  {formatNumber(baseValue * rates.end_rate)}
                </td>
                <td className="table-style">
                  {formatNumber(rates.start_rate)}
                </td>
                <td className="table-style">{formatNumber(rates.end_rate)}</td>
                <td className="table-style">{formatNumber(rates.change)}</td>
                <td className="table-style">
                  {formatNumber(rates.change_pct)}
                </td>
                <td className="table-style">
                  <Button
                    btnLabel="Delete"
                    handleClick={() => handleRemoveCurrency(currency)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
