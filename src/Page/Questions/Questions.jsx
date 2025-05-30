import { Link } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { useQuery } from '@tanstack/react-query';
import useAxios from "../../MainLayout/Shared/Hooks/useAxios"; // use your custom Axios hook
import { format } from "date-fns"; // For date formatting

const Questions = () => {
  const axiosSecure = useAxios(); // Use the custom axios hook

  const {
    data: questions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/questions");
      return data;
    },
  });
  console.log(questions);
  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold">All Questions</h2>
        <Link to="/askQuestion">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Ask a Question
          </button>
        </Link>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : questions?.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <Link to={`/questions/${question._id}`}>
                <h3 className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer">
                  {question.title}
                </h3>
              </Link>
              <div className="flex gap-4 text-xs justify-between mt-1">
                <span>Tag: {question.tag}</span>
                <span>
                  Date: {question.date && !isNaN(new Date(question.date))
                    ? format(new Date(question.date), "dd MMM yyyy")
                    : "Unknown"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default Questions;
