import { People } from "./modules/people";
import { AxiosProvider } from "./shared/context";
import { Header } from "../component/header";

export function App() {
  return (
    <AxiosProvider>
      <div className="h-full">
        <Header />
        <section className="!h-[calc(100vh-100px)] flex justify-center items-center">
          <People />
        </section>
      </div>
    </AxiosProvider>
  );
}
