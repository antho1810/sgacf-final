import React from "react";
import axios from "axios";
import ActaService from "../../services/ActasDataService";

function Test2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ActaService.getAllActas()
      .then((res) => setData(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="container">
      <div className="mt-3">
        
      </div>
    </div>
  );
}

export default Test2;
