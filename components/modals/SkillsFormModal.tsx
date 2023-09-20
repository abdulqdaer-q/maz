import { useAuthContext } from "@/contexts/AuthContext";
import { Option } from "@/types/Option";
import { Skills } from "@/types/Specaility";
import { axios } from "@/utils/axios";
import { Modal, Select } from "antd";
import { Options } from "autoprefixer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<boolean>>;
  default: Options
};
const SkillFormModal = ({ open, ...rest }: Props) => {
  const [skills, setSkills] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([])
  const handleChange = (e: any) => {
    setSelectedOptions(e)
  };
  useEffect(() => {
    const fetcher = async () => {
      const { data: options } = await axios.get<Skills>("/skills");
      setSkills(
        options.map((e) => ({
          label: e.name,
          value: e.id,
        }))
      );
      setLoading(false);
    };
    fetcher();
  }, []);
  const {user} = useAuthContext();
  const hadnleOk = async () => {
    await axios.put('/user-infos/'+user!.userInfo!.id, {
        data: {
            skills: selectedOptions
        }
    });
    rest.setOpen(false);
    rest.setReload(e => !e);
  };
  return (
    <Modal title={`${open ? "Edit" : "Add"} Your Skill`} open={open} onOk={hadnleOk} onCancel={() => {
        rest.setOpen(false);
    }} >
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Please select"
        virtual
        onChange={handleChange}
        defaultValue={rest.default}
        options={skills}
        loading={loading}
      />
    </Modal>
  );
};

export default SkillFormModal;
