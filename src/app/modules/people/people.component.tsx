import { useState, useMemo } from "react";
import { usePeopleQuery } from "./query";
import "./people.css";

export function People() {
  const { data: people = [], loading, error } = usePeopleQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredPeople = useMemo(() => {
    return people.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [people, searchTerm]);

  const sortedPeople = useMemo(() => {
    return [...filteredPeople].sort((a, b) => {
      return sortOrder === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }, [filteredPeople, sortOrder]);

  const paginatedPeople = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedPeople.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedPeople, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedPeople.length / rowsPerPage);

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (error) {
    return <h1>Oops! looks like something went wrong!</h1>;
  }

  if (!loading && (!people || people.length === 0)) {
    return <p>No People Available.</p>;
  }

  return (
    <div>
      <input
        role="textbox"
        type="text"
        aria-label="Search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table role="table">
        <thead>
          <tr>
            <th
              role="columnheader"
              aria-sort={sortOrder as "ascending" | "descending"}
              onClick={() =>
                setSortOrder(
                  sortOrder === "ascending" ? "descending" : "ascending"
                )
              }>
              Name
            </th>
            <th role="columnheader">Show</th>
            <th role="columnheader">Actor/Actress</th>
            <th role="columnheader">Date of birth</th>
            <th role="columnheader">Movies</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPeople.map((p, index) => (
            <tr key={index} role="row">
              <td role="cell">{p.name}</td>
              <td role="cell">{p.show}</td>
              <td role="cell">{p.actor}</td>
              <td role="cell">{p.dob}</td>
              <td role="cell">
                {p.movies.map(({ title }) => title).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Showing {(currentPage - 1) * rowsPerPage + 1}-
        {Math.min(currentPage * rowsPerPage, sortedPeople.length)} of{" "}
        {sortedPeople.length}
      </p>
      <div>
        <button
          role="button"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          aria-label="First">
          First
        </button>
        <button
          role="button"
          name="Previous"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Previous">
          Previous
        </button>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          name="Next"
          disabled={currentPage === totalPages}
          aria-label="Next">
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last">
          Last
        </button>
      </div>
    </div>
  );
}
