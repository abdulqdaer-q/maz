
import { axios } from "@/utils/axios";
import React, { useEffect, useState } from "react";

export default () => {
    const [companies, setCompanies] = useState<any[]>();
    useEffect(() => {
        const fetchCompanies = async () => {
            const { data } = await axios.get<any>("/companies");
            setCompanies(
                data.map((e) => ({
                    label: e.companyName,
                    value: e.id,
                }))
            );
        };
        fetchCompanies();
    }, []);
    return companies;
};
