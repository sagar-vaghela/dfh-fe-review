import { People, Person } from "./modules/people";
import { AxiosProvider } from "./shared/context";
import { Header } from "../component/header";
import { usePeopleQuery } from "./modules/people/query";
import { useEffect, useState } from "react";

export function App() {
  const { data: initialData, loading, error } = usePeopleQuery();
  const [people, setPeople] = useState<Person[]>(initialData || []);

  useEffect(() => {
    if (initialData) {
      setPeople(initialData);
    }
  }, [initialData]);

  const addPerson = (newPerson: Person) => {
    setPeople((prevPeople) => [...prevPeople, newPerson]);
  };
  return (
    <AxiosProvider>
      <div className="h-full">
        <Header addPerson={addPerson} />
        <section className="!h-[calc(100vh-100px)] flex justify-center items-center">
          <People people={people} loading={loading} error={error} />
        </section>
      </div>
    </AxiosProvider>
  );
}
