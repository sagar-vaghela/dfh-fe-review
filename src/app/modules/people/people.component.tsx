import { Person } from "./model";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchPeople } from "../../../redux/slices/peopleSlices";
import { Loader } from "../../../component/loader/loader";

const headers = [
  { label: "Name", key: "name" },
  { label: "Show", key: "show" },
  { label: "Actor/Actress", key: "actor" },
  { label: "Date of Birth", key: "dob" },
  { label: "Movies", key: "movies" },
];

export function People() {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.people,
  );

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  const itemsPerPage = 10;

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const currentData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderCells = ({ name, show, actor, movies, dob }: Person) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {show}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {actor}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {dob}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          dangerouslySetInnerHTML={{
            __html: movies.map(({ title }) => title).join(", "),
          }}
        ></span>
      </td>
    </>
  );

  if (loading) {
    return <Loader />;
  }

  if (data === undefined || error) {
    return (
      <h2 className="text-center text-xl text-red-500">
        Oops! Looks like something went wrong!
      </h2>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-100">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData?.map((person, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {renderCells(person)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center space-x-2 mt-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer flex items-center justify-center w-10 h-10 !border-[#2E4E6F] border text-[#2E4E6F] disabled:opacity-50 disabled:border-[#D1D5DB] disabled:text-gray-400 rounded"
        >
          <ChevronLeftIcon className="h-7 w-7" />
        </button>

        <span className="text-sm text-gray-700">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="cursor-pointer flex items-center justify-center w-10 h-10 !bg-[#4576a9] text-white disabled:opacity-50 disabled:bg-[#D1D5DB] disabled:text-gray-400 rounded"
        >
          <ChevronRightIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
