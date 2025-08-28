import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const FormModal = ({ isOpen, onClose, onSubmit, type, values, onChange }) => {
    console.log('values', values)
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{type} Gerbang</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-2">
              <Input
                name="id"
                placeholder="Input ID disini"
                value={values?.id}
                onChange={onChange}
              />
              <Input
                name="idCabang"
                placeholder="Input ID Cabang disini"
                value={values?.idCabang}
                onChange={onChange}
              />
              <Input
                name="namaCabang"
                placeholder="Input Nama Cabang disini"
                value={values?.namaCabang}
                onChange={onChange}
              />
              <Input
                name="namaGerbang"
                placeholder="Input Nama Gerbang disini"
                value={values?.namaGerbang}
                onChange={onChange}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            {type !== "View" && (
              <Button colorScheme="blue" onClick={onSubmit}>
                Submit
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
