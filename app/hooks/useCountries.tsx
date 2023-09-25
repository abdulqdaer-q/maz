import { Countries } from "@/types/Country";
import { Option } from "@/types/Option";
import { axios } from "@/utils/axios";
import React, { useEffect, useState } from "react";

export default () => {
  const [countries, setCountries] = useState<Option[]>();
  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get<Countries>("/countries?pagination[limit]=-1");
      setCountries(
        data.map((e) => ({
          label: e.name,
          value: e.id,
        }))
      );
    };
    fetchCountries();
  }, []);
  return countries;
};
