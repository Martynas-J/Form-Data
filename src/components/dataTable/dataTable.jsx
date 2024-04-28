"use client";
import { formItems, peopleTitleLine } from "@/config/var";
import { useState } from "react";
import Pagination from "../Pagination";

const DataTable = ({ peopleData, handleEdit, handleDelete }) => {
  const tableStyle = "border border-black px-2   break-normal";
  const [currentPageData, setCurrentPageData] = useState([]);

  const handlePageData = (pageData) => setCurrentPageData(pageData);

  return (
    <div className="dataTable ">
      <Pagination
        handlePageData={handlePageData}
        peopleData={peopleData}
      />
      <table className={`w-full table-auto text-center ${tableStyle}`}>
        <thead>
          <tr className={`bg-gray-400 ${tableStyle} `}>
            {peopleTitleLine.map((item, index) => (
              <th className={`  font-bold ${tableStyle} `} key={index}>
                <span className="">{item}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((person, index) => (
            <tr
              className={`${tableStyle} ${index % 2 !== 0 && "bg-gray-300"}`}
              key={index}
            >
              <td className={tableStyle}> {person.nr}</td>
              {formItems.map((item, index) => {
                return (
                  <td className={tableStyle} key={index}>
                    {person[item.field]}
                  </td>
                );
              })}
              <td className={tableStyle}>
                <div className="cursor-pointer flex gap-1  ">
                  <span
                    className=" hover:text-red-400"
                    onClick={() => handleEdit(person)}
                  >
                    Edit
                  </span>
                  <span
                    className=" hover:text-red-400"
                    onClick={() => handleDelete(person)}
                  >
                    Delete
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
