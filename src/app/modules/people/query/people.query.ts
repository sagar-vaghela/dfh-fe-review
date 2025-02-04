import { useEffect,useMemo,useState } from "react";
import { AxiosError } from "axios";

// import { API_RESOURCE } from "../../../shared/constant";
// import { useAxios } from "../../../shared/context";
import { Person } from "../model";
import { PEOPLE } from "../../../../api-mocks/fixtures";

interface PeopleQueryState {
  loading: boolean;
  data?: Person[];
  error?: AxiosError;
}

export const usePeopleQuery = (): PeopleQueryState => {
  // const axios = useAxios();
  const [state,setState] = useState<PeopleQueryState>({ loading: false });

  const fetchPeoples = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve,300));
     
      // const { data } = await axios.get<Person[]>(`/${API_RESOURCE.PEOPLE}`);
      const data = PEOPLE;
      setState({ data,loading: false,error: undefined });
    } catch (error) {
      setState({ data: [],error: error as AxiosError,loading: false });
    }
  };

  useEffect(() => {
    setState({ loading: true });
    fetchPeoples();
  },[]);

  return useMemo(() => state,[state]);
};
