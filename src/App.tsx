import { useRef, useState } from "react";
import "@/styles/colors.css";
import "@/styles/spacing.css";
import "@/styles/layout.css";
import "@/styles/z-index.css";
import Button from "./components/Button/Button";
import ComboMultiSelect from "./components/ComboMultiSelect/ComboMultiSelect";
import Modal from "./components/Modal/Modal";
import NumberInput from "./components/NumberInput/NumberInput";
import ToastContainer from "./components/Toast/ToastContainer";
import { ToastFunctions } from "./components/Toast/Toast.types";
import Checkbox from "./components/Checkbox/Checkbox";
import RadioButtonGroup from "./components/RadioButtonGroup";
import RadioButton from "./components/RadioButton";
import ToggleButton from "./components/ToggleButton";
import Accordion from "./components/Accordion/Accordion";
import AccordionToggle from "./components/Accordion/AccordionToggle";
import AccordionCollapse from "./components/Accordion/AccordionCollapse";
import DefaultCalendar from "./components/Calendar/DefaultCalendar";
import MultiSelectCalendar from "./components/Calendar/MultiSelectCalendar";
import RangeCalendar from "./components/Calendar/RangeCalendar";
import XIcon from "./icons/XIcon";
import DataTable from "./components/DataTable/DataTable";
import Paginator from "./components/Paginator/Paginator";

const headers = [
  { key: "name", header: "Name", isSortable: true },
  { key: "lastname", header: "LastName", isSortable: true },
  { key: "email", header: "Email", isSortable: true },
  { key: "age", header: "Age" },
];
const rows = [
  { name: "Hristijan", lastname: "Veleski", email: "haha", age: 19 },
  { name: "Anna", lastname: "Couroff", email: "lmao", age: 18 },
  { name: "Igor", lastname: "Customer", email: "abe", age: 180 },
  { name: "Santa", lastname: "Claus", email: "neznam", age: 1828 },
  {
    name: "Mike",
    lastname: "Coxlong",
    email: "mike",
    age: 8,
    _contextMenu: [
      {
        label: "Action1",
        action: () => {
          console.log("Action1");
        },
      },
    ],
  },
];

const content = [
  {
    question: "What is Lorem Ipsum?",
    answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    question: "Where does it come from?",
    answer: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  },
  {
    question: "Why do we use it?",
    answer: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
  },
  {
    question: "Where can I get some?",
    answer: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
  },
];

function App() {
  const options = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];
  const [selection, setSelection] = useState<(typeof rows)[0] | null>(null);
  const [value, setValue] = useState<string[] | null>(null);
  const [dropdownValue, setDropdownBalue] = useState<string[] | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement & ToastFunctions>(null);

  const [number, setNumber] = useState<string | undefined>("1");
  const [toggled, setToggled] = useState(false);
  const [activeEventKey, setActiveEventKey] = useState<number[] | null>(null);

  const [date, setDate] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date[] | null>(null);
  const [date3, setDate3] = useState<[Date | null, Date | null] | null>(null);

  function openModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  const [first, setFirst] = useState(0);
  const [paginatorRows, setPaginatorRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setPaginatorRows(event.rows);
  };

  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div className="card">
        <Button
          icon={<XIcon />}
          label="Open modal"
          onClick={() => {
            toastRef.current?.show({
              severity: "success",
              summary: "Success Message",
              detail: "Order submitted",
              sticky: true,
            });
          }}
        />
        <ToastContainer ref={toastRef} position="bottom-right" />
        <Checkbox
          id="cbx"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <ComboMultiSelect
          options={options}
          value={dropdownValue}
          filterValue={filterValue}
          onChangeFilterValue={setFilterValue}
          onChange={(e) => {
            setDropdownBalue(e.value);
          }}
          showClear
        />
        <Modal
          header={"Modal Title"}
          visible={modalVisible}
          onHide={hideModal}
          footer={
            <>
              <Button severity="secondary" label="Close" onClick={hideModal} />
              <Button severity="primary" label="Submit" onClick={hideModal} />
            </>
          }
        >
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <ComboMultiSelect
            options={options}
            value={value}
            filterValue={filterValue}
            onChange={(e) => {
              setValue(e.value);
            }}
            onChangeFilterValue={(value) => setFilterValue(value)}
            showClear
          />
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
          <h2>Lmfao</h2>
        </Modal>
        <NumberInput
          value={number}
          onChange={(e) => setNumber(e.value)}
          id="textInput"
          label="Text input label"
          helperText="Helper Text"
        />
        <RadioButtonGroup legendText="Radio Button group">
          <RadioButton
            name="radio"
            labelText="Radio button label"
            value="radio-1"
            id="radio-1"
          />
          <RadioButton
            name="radio"
            labelText="Radio button label"
            value="radio-2"
            id="radio-2"
          />
          <RadioButton
            name="radio"
            labelText="Radio button label"
            value="radio-3"
            id="radio-3"
          />
        </RadioButtonGroup>
        <ToggleButton
          id="toggleButton"
          checked={toggled}
          onChange={(e) => setToggled(e.value)}
        />

        <h3>Uncontrolled Accordion</h3>
        <Accordion multiple>
          {content.map(({ question, answer }, index) => (
            <div key={index}>
              <AccordionToggle eventKey={index}>
                {index + 1}. {question}
              </AccordionToggle>
              <AccordionCollapse eventKey={index}>{answer}</AccordionCollapse>
            </div>
          ))}
        </Accordion>
        <h3>Controlled Accordion</h3>

        <Accordion
          activeEventKey={activeEventKey}
          onToggle={setActiveEventKey}
          multiple
        >
          {content.map(({ question, answer }, index) => (
            <div key={index}>
              <AccordionToggle eventKey={index}>
                {question}
                {activeEventKey?.includes(index) ? (
                  <span>👇🏻</span>
                ) : (
                  <span>👆🏻</span>
                )}
              </AccordionToggle>
              <AccordionCollapse eventKey={index}>{answer}</AccordionCollapse>
            </div>
          ))}
        </Accordion>
      </div>
      <Paginator
        first={first}
        rows={paginatorRows}
        totalRecords={120}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />

      <DefaultCalendar
        value={date}
        onChange={(event) => setDate(event.value)}
      />
      <MultiSelectCalendar
        value={date2}
        onChange={(event) => setDate2(event.value)}
      />
      <RangeCalendar
        value={date3}
        onChange={(event) => setDate3(event.value)}
      />

      <DataTable
        title="Random table"
        description="haha description"
        selectionMode
        selection={selection}
        setSelection={setSelection}
        headers={headers}
        rows={rows}
        zebraStyles
      />
    </>
  );
}

export default App;
