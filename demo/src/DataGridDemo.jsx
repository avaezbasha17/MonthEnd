import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import Checkbox from "@mui/material/Checkbox";

export default function TreeDataSimple() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [expandedRows, setExpandedRows] = React.useState([]);

  const rows = [
    {
      hierarchy: ["Sarah"],
      jobTitle: "Head of Human Resources",
      recruitmentDate: new Date(2020, 8, 12),
      id: 0,
    },
    {
      hierarchy: ["Thomas"],
      jobTitle: "Head of Sales",
      recruitmentDate: new Date(2017, 3, 4),
      id: 1,
    },
    {
      hierarchy: ["Thomas", "Robert"],
      jobTitle: "Sales Person",
      recruitmentDate: new Date(2020, 11, 20),
      id: 2,
    },
    {
      hierarchy: ["Thomas", "Karen"],
      jobTitle: "Sales Person",
      recruitmentDate: new Date(2020, 10, 14),
      id: 3,
    },
    {
      hierarchy: ["Thomas", "Nancy"],
      jobTitle: "Sales Person",
      recruitmentDate: new Date(2017, 10, 29),
      id: 4,
    },
    {
      hierarchy: ["Thomas", "Daniel"],
      jobTitle: "Sales Person",
      recruitmentDate: new Date(2020, 7, 21),
      id: 5,
    },
    {
      hierarchy: ["Thomas", "Christopher"],
      jobTitle: "Sales Person",
      recruitmentDate: new Date(2020, 7, 20),
      id: 6,
    },
    {
      hierarchy: ["Thomas", "Donald"],
      jobTitle: "Sales Person",
      recruitmentDate: new Date(2019, 6, 28),
      id: 7,
    },
    {
      hierarchy: ["Mary"],
      jobTitle: "Head of Engineering",
      recruitmentDate: new Date(2016, 3, 14),
      id: 8,
    },
    {
      hierarchy: ["Mary", "Jennifer"],
      jobTitle: "Tech lead front",
      recruitmentDate: new Date(2016, 5, 17),
      id: 9,
    },
    {
      hierarchy: ["Mary", "Jennifer", "Anna"],
      jobTitle: "Front-end developer",
      recruitmentDate: new Date(2019, 11, 7),
      id: 10,
    },
    {
      hierarchy: ["Mary", "Michael"],
      jobTitle: "Tech lead devops",
      recruitmentDate: new Date(2021, 7, 1),
      id: 11,
    },
    {
      hierarchy: ["Mary", "Linda"],
      jobTitle: "Tech lead back",
      recruitmentDate: new Date(2017, 0, 12),
      id: 12,
    },
    {
      hierarchy: ["Mary", "Linda", "Elizabeth"],
      jobTitle: "Back-end developer",
      recruitmentDate: new Date(2019, 2, 22),
      id: 13,
    },
    {
      hierarchy: ["Mary", "Linda", "William"],
      jobTitle: "Back-end developer",
      recruitmentDate: new Date(2018, 4, 19),
      id: 14,
    },
  ];

  const columns = [
    {
      field: "checkbox",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.selected || false}
          onChange={(event) => handleCheckboxChange(event, params.row.id)}
        />
      ),
    },
    { field: "jobTitle", headerName: "Job Title", width: 200 },
    {
      field: "recruitmentDate",
      headerName: "Recruitment Date",
      type: "date",
      width: 150,
    },
  ];

  const getTreeDataPath = (row) => row.hierarchy;

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;

    // Find the row to update
    const rowToUpdate = rows.find((row) => row.id === id);

    // Get the parents of the row
    const parents = rowToUpdate.hierarchy.slice(0, -1);

    if (isChecked) {
      setSelectedRows((prev) => {
        const newSelectedRows = [...prev, id];
        // Add parents if not already selected
        parents.forEach((parentId) => {
          if (!newSelectedRows.includes(parentId)) {
            newSelectedRows.push(parentId);
            setExpandedRows((prevExpanded) => [...prevExpanded, parentId]);
          }
        });
        return newSelectedRows;
      });
    } else {
      setSelectedRows((prev) => {
        const newSelectedRows = prev.filter((rowId) => {
          // Check if the row is the row to remove
          if (rowId === id) return false;
          // Check if the row is a child of the row to remove
          const row = rows.find((r) => r.id === rowId);
          return !row || !row.hierarchy.includes(rowToUpdate.id);
        });
        return newSelectedRows;
      });
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={rows.map((row) => ({
          ...row,
          selected: selectedRows.includes(row.id),
        }))}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        treeData
        expandedRowIds={expandedRows}
        onRowSelectionModelChange={setSelectedRows}
      />
    </div>
  );
}
