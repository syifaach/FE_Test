import {
  Button,
  HStack,
  Select,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { columns, TabPanelList } from "../constants";

const data = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const PAGE_SIZE = 5;

const ListTable = () => {
  const [tabs, _] = useState(TabPanelList);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const start = (page - 1) * PAGE_SIZE;
  const paginatedData = data.slice(start, start + PAGE_SIZE);

  return (
    <Tabs isFitted variant="enclosed-colored" colorScheme="blue">
      <TabList>
        {tabs.map((tab) => (
          <Tab>{tab.tab}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    {columns.map((column) => (
                      <Th key={column.key}>{column.name}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr >
                    <Td colSpan={12} textAlign={'center'}>To Be Continue</Td>
                  </Tr>
                </Tbody>
              </Table>

              <div className="flex justify-end items-center">
                <HStack justify="space-between" mt={4}>
                  <Select className="max-w-50" placeholder="Show 1-5 entries">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>

                  <Button onClick={handlePrev} isDisabled={page === 1}>
                    Previous
                  </Button>

                  <Text>
                    Page {page} of {totalPages}
                  </Text>

                  <Button onClick={handleNext} isDisabled={page === totalPages}>
                    Next
                  </Button>
                </HStack>
              </div>
            </TableContainer>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default ListTable;
