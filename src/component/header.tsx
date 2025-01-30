import { useState } from "react";
import DfhLogo from "../assets/logo.svg";
import CommonModal from "./modal/commonModal";
import { CreatePerson } from "../app/modules/people/createPerson.component";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { Person } from "../app/modules/people";

interface HeaderProps {
  addPerson: (person: Person) => void;
}

export const Header = ({ addPerson }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between px-2 sm:px-5 bg-[#ebedf1] sticky top-0 z-50 md:flex-nowrap sm:flex-wrap flex-wrap gap-2 py-2">
        <div>
          <img src={DfhLogo} alt="logo" />
        </div>

        <div className="order-3 md:order-2 text-center hidden md:block">
          <h3 className="text-xl font-semibold">
            Welcome to the DFS Frontend Technical Assessment.
          </h3>
          <p className="text-sm">
            Please follow the rules and guidelines in the <b> README.</b>
          </p>
          <p className="text-sm">Best of Luck! 😉.</p>
        </div>

        <div className="md:hidden">
          <button
            className="cursor-pointer !bg-[#4576a9] text-white font-semibold py-2 px-4 rounded"
            onClick={toggleDrawer}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <div className="order-2 md:order-3 hidden md:block">
          <button
            className="cursor-pointer !bg-[#4576a9] text-white font-semibold py-2 px-4 rounded flex gap-2 w-full"
            onClick={handleOpenModal}
          >
            Add Person
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 right-0 w-80 sm:w-84 h-full bg-gray-100 transition-transform duration-300 ease-in-out transform z-99 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-2">
          <div>
            <XMarkIcon
              className="h-7 w-7 cursor-pointer m-2 float-right"
              onClick={toggleDrawer}
            />
          </div>

          <div className="py-15 px-4">
            <h3 className="text-xl font-semibold py-2">
              Welcome to the DFS Frontend Technical Assessment.
            </h3>
            <p className="text-sm py-2">
              Please follow the rules and guidelines in the <b> README.</b>
            </p>
            <p className="text-sm py-2">Best of Luck! 😉.</p>
            <button
              className="cursor-pointer !bg-[#4576a9] text-white font-semibold py-2 px-4 rounded flex gap-2 my-4 text-center"
              onClick={handleOpenModal}
            >
              Add Person
            </button>
          </div>
        </div>
      </div>

      <CommonModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        width="600px"
        height="auto"
        title="Add Person"
      >
        <CreatePerson setIsModalOpen={setIsModalOpen} addPerson={addPerson} />
      </CommonModal>
    </>
  );
};
