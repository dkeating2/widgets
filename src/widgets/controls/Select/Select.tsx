import { DropDownTreeComponent } from "@syncfusion/ej2-react-dropdowns";
let data: { [key: string]: Object }[] = [
  {
    nodeId: "01",
    nodeText: "Music",
    nodeChild: [{ nodeId: "01-01", nodeText: "Gouttes.mp3" }],
  },
  {
    nodeId: "02",
    nodeText: "Videos",
    expanded: true,
    nodeChild: [
      { nodeId: "02-01", nodeText: "Naturals.mp4" },
      { nodeId: "02-02", nodeText: "Wild.mpeg" },
    ],
  },
  {
    nodeId: "03",
    nodeText: "Documents",
    nodeChild: [
      { nodeId: "03-01", nodeText: "Environment Pollution.docx" },
      { nodeId: "03-02", nodeText: "Global Water, Sanitation, & Hygiene.docx" },
      { nodeId: "03-03", nodeText: "Global Warming.ppt" },
      { nodeId: "03-04", nodeText: "Social Network.pdf" },
      { nodeId: "03-05", nodeText: "Youth Empowerment.pdf" },
    ],
  },
];
let data2 = [
  { nodeId: "03-01", nodeText: "Environment Pollution.docx" },
  { nodeId: "03-02", nodeText: "Global Water, Sanitation, & Hygiene.docx" },
  { nodeId: "03-03", nodeText: "Global Warming.ppt" },
  { nodeId: "03-04", nodeText: "Social Network.pdf" },
  { nodeId: "03-05", nodeText: "Youth Empowerment.pdf" },
];

let fields: Object = {
  dataSource: data2,
  value: "nodeId",
  text: "nodeText",
  child: "nodeChild",
};
let treeSettings = { autoCheck: true };

const Select = () => {
  return (
    <>
      <DropDownTreeComponent
        cssClass="e-outline"
        mode="Box"
        title="test"
        id="dropdowntree"
        allowFiltering
        showClearButton
        fields={fields}
        showCheckBox={true}
        treeSettings={treeSettings}
        showSelectAll={true}
      />
    </>
  );
};
export default Select;
