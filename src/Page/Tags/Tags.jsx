import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../redux/tagsSlice";
import { fetchQuestionsByTag, clearTaggedQuestions } from "../../redux/questionsSlice";
import LoadingPage from "../Loading/LoadingPage";
import { Link } from "react-router-dom";

const Tags = () => {
  const dispatch = useDispatch();

  const { tags, loading: tagsLoading } = useSelector((state) => state.tags);
  const { taggedQuestions, taggedLoading } = useSelector((state) => state.questions);

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTag) {
      dispatch(fetchQuestionsByTag(selectedTag));
    } else {
      dispatch(clearTaggedQuestions());
    }
  }, [dispatch, selectedTag]);

  const filteredTags = tags.filter((tag) =>
    tag.tag.toLowerCase().includes(search.toLowerCase())
  );

  if (tagsLoading) return <LoadingPage />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Popular Tags</h2>
        <p className="text-gray-600 dark:text-gray-400">Browse the most used tags in the community</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredTags.length > 0 ? (
          filteredTags.map((tagData, index) => (
            <div
              key={index}
              onClick={() => setSelectedTag(tagData.tag)}
              className={`grid gap-2 px-5 py-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md hover:shadow-blue-300  transition-shadow 
                ${selectedTag === tagData.tag ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base truncate">
                #{tagData.tag}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {tagData.count} questions
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">No tags found</p>
        )}
      </div>

      {selectedTag && (
        <div className="mt-6 text-right">
          <button
            onClick={() => setSelectedTag(null)}
            className="text-sm text-blue-500 hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}

      {selectedTag && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Questions tagged with #{selectedTag}
          </h3>

          {taggedLoading ? (
            <LoadingPage />
          ) : (
            <div className="space-y-4">
              {taggedQuestions.length > 0 ? (
                taggedQuestions.map((question) => (
                  <div
                    key={question._id}
                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
                  >
                    <Link to={`/questions/${question._id}`}>
                      <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        {question.title}
                      </h4>
                    </Link>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{question.body}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No questions found for this tag.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tags;