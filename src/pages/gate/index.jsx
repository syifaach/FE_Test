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
import FormModal from "./components/FormModal";

const PAGE_SIZE = 10;

const Gate = () => {
  const [data, setData] = useState();
  const [values, setValues] = useState({
    id: "",
    idCabang: "",
    namaGerbang: "",
    namaCabang: "",
  });
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
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

  const onClose = () => {
    setIsAdd(false)
    setIsEdit(false)
    setIsView(false)
  }

  const addData = async () => {
    const { addGate } = gateService();
    const request = {
      id: values.id,
      IdCabang: values.idCabang,
      NamaCabang: values.namaCabang,
      NamaGerbang: values.namaGerbang,
    };

    await addGate(request)
      .then((res) => {
        if (res) {
          alert("Tambah Berhasil");
          setIsOpen(false);
          window.location.reload();
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

  const editData = async () => {
    const { updateGate } = gateService();
    const request = {
      id: values.id,
      IdCabang: values.idCabang,
      NamaCabang: values.namaCabang,
      NamaGerbang: values.namaGerbang,
    };

    await updateGate(request)
      .then((res) => {
        if (res) {
          alert("Update Berhasil");
          setIsEdit(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEdit = (idCabang) => {
    setIsEdit(true)
    const find = data?.find((val) => val.IdCabang === idCabang)
    setValues(prev => ({
      ...prev,
      id: find?.id,
      idCabang: find?.IdCabang,
      namaCabang: find?.NamaCabang,
      namaGerbang: find?.NamaGerbang
    }))
  }

  const onView = (idCabang) => {
    setIsView(true)
    const find = data?.find((val) => val.IdCabang === idCabang)
    setValues(prev => ({
      ...prev,
      id: find?.id,
      idCabang: find?.IdCabang,
      namaCabang: find?.NamaCabang,
      namaGerbang: find?.NamaGerbang
    }))
  }

  console.log("data", data);
  console.log("pagesize", pageSize);

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

        <Button
          leftIcon={<AddIcon />}
          backgroundColor="blue.900"
          color="white"
          onClick={() => setIsAdd(true)}
        >
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
                      onClick={() => onEdit(row.IdCabang)}
                    />
                    <IconButton
                      variant="outline"
                      icon={<ViewIcon />}
                      onClick={() => onView(row.IdCabang)}
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

      {isAdd && (
        <FormModal
          isOpen={isAdd}
          values={values}
          onClose={onClose}
          onChange={onChange}
          onSubmit={addData}
          type={"Tambah"}
        />
      )}
      {isEdit && (
        <FormModal
          isOpen={isEdit}
          values={values}
          onClose={onClose}
          onChange={onChange}
          onSubmit={editData}
          type={"Edit"}
        />
      )}

      {isView && (
        <FormModal
          isOpen={isView}
          values={values}
          onClose={onClose}
          onChange={onChange}
          type={"View"}
        />
      )}
    </div>
  );
};

export default Gate;
