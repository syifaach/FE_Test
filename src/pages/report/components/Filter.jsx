import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

const Filter = () => {
  return (
    <div className="p-6">
      <Card>
        <CardBody>
          <Text className="mb-3 text-lg font-bold">Filter</Text>

          <div className="flex justify-start items-center gap-3">
            <div className="flex justify-start gap-3 me-2">
              <InputGroup className="max-w-72">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input type="tel" placeholder="Search" />
              </InputGroup>

              <Input type="date" placeholder="tanggal" />
            </div>

            <div className="flex gap-2">
              <Button variant="solid" backgroundColor="blue.900" color="white">
                Filter
              </Button>
              <Button>Reset</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Filter;
