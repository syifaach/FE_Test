import Filter from "./components/Filter";
import ListTable from "./components/ListTable";

const Report = () => {
  return (
    <>
      <div className="mb-3">
        <Filter />
      </div>

      <div>
        <ListTable />
      </div>
    </>
  );
};

export default Report;
