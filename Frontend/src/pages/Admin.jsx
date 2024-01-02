import Table from "../components/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

const Admin = () => {
  const [dataSet, setDataSet] = useState([]);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
      "token"
    )}`;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/getAllUsers`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setDataSet([]);
          res.data.users.map((user) => {
            setDataSet((prev) => [
              ...prev,
              [user.username, user.role, user.email, user.request, user.pending],
            ]);
          });
        }
      });
  }, []);
  return (
    <div className="w-full overflow-auto">
      <Table data={dataSet} setDataSet={setDataSet} />
    </div>
  );
};

export default Admin;
