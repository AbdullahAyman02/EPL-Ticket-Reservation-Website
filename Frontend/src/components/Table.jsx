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
          setDataSet(data.filter((user) => user.username !== username));
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const upgradeUser = (username) => {
      // Implement your logic to handle the upgrade action
      checkToken();
      console.log(username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
        "token"
      )}`;
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/user/upgrade`, {
          data: { username: username },
        })
        .then((res) => {
          setDataSet(data.filter((user) => user.username !== username));
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const isFan = (role) => role === 'F';

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
            const username = row[0];
            const role = row[1];

            return `<button class="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-900 mr-2">Delete</button>
                    ${isFan(role) ? `<button class="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-900">Upgrade</button>` : ''}`;
          },
          targets: -1,
        },
      ],
      destroy: true,
    });

    table.on("click", "button", function (e) {
      let rowData = table.row(e.target.closest("tr")).data();
      if (rowData) {
        const username = rowData[0];
        if (e.target.textContent === "Delete") {
          deleteUser(username);
        } else if (e.target.textContent === "Upgrade") {
          upgradeUser(username);
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
