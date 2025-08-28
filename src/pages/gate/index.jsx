import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { gateService } from "../../services/gate";

const PAGE_SIZE = 5;

const Gate = () => {
  const [data, setData] = useState();
  const [values, setValues] = useState({
    id: "",
    idCabang: "",
    namaGerbang: "",
    namaCabang: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    start: (page - 1) * pageSize,
  });

  useEffect(() => {
    getAllData();
  }, [pageSize, page]);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const onChange = (e) => {
    const { name, value } = e?.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClose = () => setIsOpen(false);

  const addData = async () => {
    const { addGate } = gateService();
    const request = {
      id: values.id,
      IdCabang: values.idCabang,
      NamaCabang: values.namaCabang,
      NamaGerbang: values.namaGerbang
    }

    await addGate(request)
      .then((res) => {
        if (res) {
          alert("Tambah Berhasil");
          setIsOpen(false)
          window.location.reload()
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAllData = async () => {
    const { getAllGate } = gateService();
    await getAllGate()
      .then((res) => {
        if (res && res?.data) {
          console.log(res?.data);
          const paginatedData = res?.data?.data?.rows?.rows?.slice(
            pagination.start,
            pagination.start + pageSize
          );

          setData(paginatedData);
          setPagination((prev) => ({
            ...prev,
            totalPages: res?.data?.data?.total_pages,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteData = async (id, idCabang) => {
    const { deleteGate } = gateService();
    const req = { id, IdCabang: idCabang };
    await deleteGate(req)
      .then((res) => {
        if (res) {
          alert("Delete Success");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log("data", data);
  console.log('pagesize', pageSize)

  return (
    <div className="p-6">
      <Text className="mb-7">Master Data Gerbang</Text>
      <div className="flex justify-between items-center mb-5 gap-5">
        <InputGroup className="max-w-72">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Search" />
        </InputGroup>

        <Button leftIcon={<AddIcon />} backgroundColor="blue.900" color="white" onClick={() => setIsOpen(true)}>
          Tambah
        </Button>
      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Ruas</Th>
              <Th>Gerbang</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((row, index) => (
              <Tr key={row.id}>
                <Td>{index + 1}</Td>
                <Td>{row.NamaCabang}</Td>
                <Td>{row.NamaGerbang}</Td>
                <Td>
                  <div className="flex flex-row gap-2">
                    <IconButton
                      variant="outline"
                      icon={<EditIcon />}
                      onClick={() => alert("To Be Continue")}
                    />
                    <IconButton
                      variant="outline"
                      icon={<ViewIcon />}
                      onClick={() => alert("To Be Continue")}
                    />
                    <IconButton
                      variant="outline"
                      icon={<DeleteIcon />}
                      onClick={() => deleteData(row.id, row.IdCabang)}
                    />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <div className="flex justify-end items-center">
          <HStack justify="space-between" mt={4}>
            <Select
              className="max-w-50"
              placeholder="Show 5 entries"
              onChange={(e) => setPageSize(e?.target?.value)}
              defaultValue={10}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Select>

            <Button onClick={handlePrev} isDisabled={page === 1}>
              Previous
            </Button>

            <Text>
              Page {page} of {pagination.totalPages}
            </Text>

            <Button
              onClick={handleNext}
              isDisabled={page === pagination.totalPages}
            >
              Next
            </Button>
          </HStack>
        </div>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Gerbang</ModalHeader>
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
            <Button colorScheme="blue" onClick={addData}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Gate;
