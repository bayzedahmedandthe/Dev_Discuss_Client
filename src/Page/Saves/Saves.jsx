import { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";


const Saves = () => {
  const [saveData, setSavedata] = useState();
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  axios.get(`http://localhost:5000/saves?email=${user?.email}`)
    .then(res => {
      setSavedata(res.data)

    })
    .catch(error => {
      console.log(error);
    })
  return (
    <div>
      {
        saveData?.map(question => (
          <div key={question._id}>
            <div className="border p-4 rounded shadow">
              <h2 className="text-2xl font-bold text-blue-600">{question.title}</h2>
              <p className="mt-2 text-gray-700">{question.body}</p>
              <div className="flex items-center justify-between">
                <div className="mt-4 text-sm text-gray-500">
                  <span>Tag: {question.tag}</span> | <span>{question.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Saves;