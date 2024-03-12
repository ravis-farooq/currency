import React from "react";

type TableProps = {
  data: {
    [x: string]:
      | {
          [x: string]: number;
        }[]
      | undefined;
  }[];
  baseValue: number;
  currencyNames: Record<string, string>;

  handleRemoveCurrency: (currency: string) => void;
};
const Table: React.FC<TableProps> = ({
  data,
  handleRemoveCurrency,
  currencyNames,
  baseValue,
}) => {
  const keys = data[0]?.data?.map((el) => Object.keys(el)[0]);
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
            <th className="table-style">Date</th>

            {keys &&
              keys.length > 0 &&
              keys.map((item: string, i: number) => (
                <th key={i.toString()} className="table-style">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {currencyNames[item]}
                    <svg
                      cursor={"pointer"}
                      role="button"
                      onClick={() => handleRemoveCurrency(item)}
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.24292 4.97546C2.24292 4.605 2.54324 4.30469 2.9137 4.30469H14.9877C15.3581 4.30469 15.6584 4.605 15.6584 4.97546C15.6584 5.34592 15.3581 5.64624 14.9877 5.64624H2.9137C2.54324 5.64624 2.24292 5.34592 2.24292 4.97546Z"
                        fill="#FC8181"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.60913 2.96313C7.43123 2.96313 7.26062 3.03381 7.13482 3.1596C7.00903 3.2854 6.93835 3.45601 6.93835 3.63391V4.97546C6.93835 5.34592 6.63804 5.64624 6.26758 5.64624C5.89712 5.64624 5.5968 5.34592 5.5968 4.97546V3.63391C5.5968 3.10021 5.80882 2.58836 6.1862 2.21098C6.56358 1.83359 7.07543 1.62158 7.60913 1.62158H10.2922C10.8259 1.62158 11.3378 1.83359 11.7152 2.21098C12.0926 2.58836 12.3046 3.10021 12.3046 3.63391V4.97546C12.3046 5.34592 12.0042 5.64624 11.6338 5.64624C11.2633 5.64624 10.963 5.34592 10.963 4.97546V3.63391C10.963 3.45601 10.8923 3.2854 10.7665 3.1596C10.6408 3.03381 10.4701 2.96313 10.2922 2.96313H7.60913ZM4.25525 4.30469C4.62571 4.30469 4.92603 4.605 4.92603 4.97546V14.3663C4.92603 14.5442 4.9967 14.7148 5.12249 14.8406C5.24829 14.9664 5.4189 15.0371 5.5968 15.0371H12.3046C12.4825 15.0371 12.6531 14.9664 12.7789 14.8406C12.9047 14.7148 12.9753 14.5442 12.9753 14.3663V4.97546C12.9753 4.605 13.2757 4.30469 13.6461 4.30469C14.0166 4.30469 14.3169 4.605 14.3169 4.97546V14.3663C14.3169 14.9 14.1049 15.4119 13.7275 15.7893C13.3501 16.1666 12.8383 16.3787 12.3046 16.3787H5.5968C5.0631 16.3787 4.55125 16.1666 4.17387 15.7893C3.79649 15.4119 3.58447 14.9 3.58447 14.3663V4.97546C3.58447 4.605 3.88479 4.30469 4.25525 4.30469Z"
                        fill="#FC8181"
                      />
                    </svg>
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((item, index) => {
              return (
                <tr key={index.toString()} className="table-style">
                  <td className="table-style">
                    <>{item?.date}</>
                  </td>
                  {item && item?.data && item?.data.length > 0
                    ? item?.data?.map((e, i) => {
                        return (
                          <td key={i.toString()} className="table-style">
                            {+Object.values(e) * baseValue}
                          </td>
                        );
                      })
                    : Array(keys && keys.length)
                        ?.fill("-")
                        .map(() => {
                          return (
                            <td
                              className="table-style"
                              style={{ textAlign: "center", flex: 1 }}
                            >
                              Not available
                            </td>
                          );
                        })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
