import { Industries } from "@/types/Industry";
import { Option } from "@/types/Option";
import { axios } from "@/utils/axios";
import React, { useEffect, useState } from "react";

export default () => {
  const [industries, setIndustries] = useState<Option[]>();
  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get<Industries>("/industries");
      setIndustries(
        data.map((e) => ({
          label: e.title,
          value: e.id,
        }))
      );
    };
    fetchCountries();
  }, []);
  return industries;
};
