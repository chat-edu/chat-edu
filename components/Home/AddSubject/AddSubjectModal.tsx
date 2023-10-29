import React from 'react';
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import useAddSubject from "@/hooks/mutators/useAddSubject";
import TextInput from "@/components/Utilities/TextInput";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddSubjectModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const { setFieldTouched, setFieldValue, values, touched, errors, submitForm } = useAddSubject();

    const onSubmit = async () => {
        await submitForm();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Subject</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextInput
                        label={'Subject Name'}
                        placeholder={'Subject Name'}
                        value={values.name}
                        onChange={(name) => setFieldValue('name', name)}
                        onBlur={() => setFieldTouched('name')}
                        error={touched.name && errors.name || undefined}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="brand"
                        onClick={onSubmit}
                    >
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddSubjectModal;