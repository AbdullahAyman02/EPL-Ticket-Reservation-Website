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
          defaultContent: `<button class="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-900">Delete</button>`,
          targets: -1,
        },
      ],
      destroy: true,
    });

    table.on("click", "button", function (e) {
      let data = table.row(e.target.closest("tr")).data();
      console.log(data);
      if (data) deleteUser(data[0]);
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
