import { useEffect, useRef } from "react";
import DataTable from "datatables.net-dt";
import checkToken from "../scripts/checkToken.js";
import Cookie from "js-cookie";
import axios from "axios";
import $ from "jquery";

const Table = ({ data, setDataSet }) => {
  const tableRef = useRef();
  $.DataTable = DataTable;

  useEffect(() => {
    const deleteUser = (username) => {
      checkToken();
      console.log(username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
        "token"
      )}`;
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/user/delete`, {
          data: { username: username },
        })
        .then((res) => {
          setDataSet((prev) => prev.filter((row) => row[0] !== username));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const upgradeUser = (username) => {
      checkToken();
      console.log(username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
        "token"
      )}`;
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/user/upgrade`, {
          username: username,
        })
        .then((res) => {
          setDataSet((prev) => {
            return prev.map((row) => {
              if (row[0] === username) {
                return [row[0], 'M', ...row.slice(2, row.length - 2), false, row[row.length - 1]];
              }
              return row;
            })
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const approveUser = (username) => {
      checkToken();
      console.log(username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
        "token"
      )}`;
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/user/approve`, {
          username: username,
        })
        .then((res) => {
          setDataSet((prev) => {
            return prev.map((row) => {
              console.log(row)
              if (row[0] === username) {
                console.log([...row.slice(0, row.length - 1), false]);
                return [...row.slice(0, row.length - 1), false];
              }
              return row;
            })
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const rejectRequest = (username) => {
      checkToken();
      console.log(username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
        "token"
      )}`;
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/user/reject`, {
          username: username,
        })
        .then((res) => {
          console.log(res.data.to_delete)
          if(res.data.to_delete){
            setDataSet((prev) => prev.filter((row) => row[0] !== username));
          }
          else
            setDataSet((prev) => {
              return prev.map((row) => {
                if (row[0] === username) {
                  return [...row.slice(0, row.length - 2), false, row[row.length - 1]];
                }
                return row;
              })
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const table = $(tableRef.current).DataTable({
      data: data,
      columns: [
        { title: "Username" },
        { title: "Role" },
        { title: "Email" },
        {
          title: "Actions",
          searchable: false,
          orderable: false,
        },
      ],
      columnDefs: [
        {
          data: null,
          render: function (data, type, row) {
            const request = row[3];
            const pending = row[4];
            console.log(request);

            return `${
                      !pending 
                      ? `<button class="bg-yellow-600 text-white px-2 py-1 rounded-md hover:bg-yellow-900 mr-2">Delete</button>`
                      : ""
                    }
                    ${
                      request
                        ? `<button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-900">Upgrade</button>`
                        : pending ? `<button class="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-900">Approve</button>` :
                        ""
                    }
                    ${
                      request || pending
                        ? `<button class="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-900">Reject</button>`
                        : ""
                    }`;
          },
          targets: -1,
        },
      ],
      destroy: true,
      bAutoWidth: false,
    });

    table.on("click", "button", function (e) {
      let rowData = table.row(e.target.closest("tr")).data();
      if (rowData) {
        const username = rowData[0];
        console.log(username);
        if (e.target.textContent === "Delete") {
          deleteUser(username);
        } else if (e.target.textContent === "Upgrade") {
          upgradeUser(username);
        } else if (e.target.textContent === "Approve") {
          approveUser(username);
        } else {
          rejectRequest(username);
        }
      }
    });

    return function () {
      console.log("Table destroyed");
      table.destroy();
    };
  }, [data, setDataSet]);

  return (
    <div className="mt-12 w-3/4 m-auto">
      <table className="display min-w-fit" ref={tableRef}></table>
    </div>
  );
};

export default Table;
