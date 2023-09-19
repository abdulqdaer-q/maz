import { Modal } from 'antd';
import React from 'react';
import SpecialityForm, { SpecialityProps } from '../froms/SpecialityForm';

type Props = SpecialityProps &  {
    open: boolean;
}
const SpecialityFormModal = ({open, ...rest}: Props) => {
    return (
        <Modal title={`${rest?.id ? 'Edit' : 'Add'} Your Speciality`} onCancel={rest.onCancel} open={open} footer={<></>} >
            <SpecialityForm {...rest}/>
        </Modal>
    )
};

export default SpecialityFormModal;