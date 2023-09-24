import { Modal } from 'antd';
import React from 'react';
import SpecialityForm, { SpecialityProps } from '../froms/SpecialityForm';

type Props = SpecialityProps &  {
    open: boolean;
}
const SpecialityFormModal = ({open,isLanguage: isLang, ...rest}: Props) => {
    return (
        <Modal title={`${rest?.id ? 'Edit' : 'Add'} Your ${isLang ? "Language Level" :"Speciality"}`} onCancel={rest.onCancel} open={open} footer={<></>} >
            <SpecialityForm  {...rest} isLanguage={isLang}/>
        </Modal>
    )
};

export default SpecialityFormModal;