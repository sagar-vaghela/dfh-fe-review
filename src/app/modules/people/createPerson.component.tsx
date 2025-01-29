import React, { useState } from "react";
import { Person } from "./model";
import { InputField } from "../../../component/dynamicInput/InputField";

interface CreatePersonProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export function CreatePerson({ setIsModalOpen }: CreatePersonProps) {
  const [formData, setFormData] = useState<Person>({
    id: "",
    name: "",
    show: "",
    actor: "",
    dob: "",
    movies: [{ title: "", released: "" }],
    updatedAt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMovieChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const updatedMovies = [...formData.movies];
    updatedMovies[index] = { ...updatedMovies[index], [name]: value };
    setFormData((prev) => ({ ...prev, movies: updatedMovies }));
  };

  const handleAddMovie = () => {
    setFormData((prev) => ({
      ...prev,
      movies: [...prev.movies, { title: "", released: "" }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson = {
      ...formData,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    console.log(newPerson); // This is where you will send the data to the backend
    setFormData({
      id: "",
      name: "",
      show: "",
      actor: "",
      dob: "",
      movies: [{ title: "", released: "" }],
      updatedAt: "",
    });
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex flex-col gap-6">
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          label="Show"
          name="show"
          value={formData.show}
          onChange={handleChange}
        />
        <InputField
          label="Actor"
          name="actor"
          value={formData.actor}
          onChange={handleChange}
        />

        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>

      <h3 className="pt-4 text-sm font-bold">Movies</h3>
      {formData.movies.map((movie, index) => (
        <div key={index} className="flex flex-col gap-4 mt-4">
          <InputField
            label="Title"
            name="title"
            value={movie.title}
            onChange={(e) => handleMovieChange(index, e)}
          />
          <InputField
            label="Release Date"
            name="released"
            type="date"
            value={movie.released}
            onChange={(e) => handleMovieChange(index, e)}
          />
        </div>
      ))}

      <div className="flex gap-4 items-center flex-wrap justify-end mt-6">
        <button
          type="button"
          onClick={handleAddMovie}
          className="cursor-pointer !bg-[#4576a9] text-white font-semibold py-2 px-4 rounded"
        >
          Add Another Movie
        </button>
        <button
          type="submit"
          className="cursor-pointer !bg-[#4576a9] text-white font-semibold py-2 px-4 rounded"
        >
          Create Person
        </button>
      </div>
    </form>
  );
}
