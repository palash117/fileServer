import axios from "axios";

var getOriginIp = async () => {
  let response = await axios.get("/fs/localIp");
  return response.data;
};
export default getOriginIp;
