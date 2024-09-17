import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox, IconButton } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const ParentChildDataGrid = () => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const data = [
    {
      groupBy: ["000000025"],
      storeNo: "000000025",
      chain: "0L7856",
      merchantId: "4445017521245",
      tid: "",
      fundingDate: null,
      merchantName: "BST*ATT MOBILITY",
      settlementType: "CD",
      transCount: 1532,
      ttlFeeAmt: 170371.96,
      isLinked: false,
      fundingId: 0,
      id: "000000025",
    },
    {
      storeNo: "000000025",
      chain: "0L7856",
      merchantId: "4445017521245",
      tid: "",
      fundingDate: "2024-08-21",
      merchantName: "BST*ATT MOBILITY",
      settlementType: "CD",
      transCount: 633,
      ttlFeeAmt: 28561.9,
      isLinked: false,
      fundingId: 30373,
      groupBy: ["000000025", "000000025-1"],
      id: "000000025-1",
    },
    {
      storeNo: "000000025",
      chain: "0L7856",
      merchantId: "4445017521245",
      tid: "",
      fundingDate: "2024-08-26",
      merchantName: "BST*ATT MOBILITY",
      settlementType: "CD",
      transCount: 541,
      ttlFeeAmt: 106168.34,
      isLinked: false,
      fundingId: 31239,
      groupBy: ["000000025", "000000025-2"],
      id: "000000025-2",
    },
    {
      storeNo: "000000025",
      chain: "0L7856",
      merchantId: "4445017521245",
      tid: "",
      fundingDate: "2024-08-19",
      merchantName: "BST*ATT MOBILITY",
      settlementType: "CD",
      transCount: 358,
      ttlFeeAmt: 35641.72,
      isLinked: false,
      fundingId: 20093,
      groupBy: ["000000025", "000000025-3"],
      id: "000000025-3",
    },
    {
      groupBy: ["000000121"],
      storeNo: "000000121",
      chain: "0L7856",
      merchantId: "4445017800839",
      tid: "",
      fundingDate: null,
      merchantName: "BST*IRON MOUNTAIN",
      settlementType: "CD",
      transCount: 601,
      ttlFeeAmt: 58617.41,
      isLinked: false,
      fundingId: 0,
      id: "000000121",
    },
    {
      storeNo: "000000121",
      chain: "0L7856",
      merchantId: "4445017800839",
      tid: "",
      fundingDate: "2024-08-21",
      merchantName: "BST*IRON MOUNTAIN",
      settlementType: "CD",
      transCount: 165,
      ttlFeeAmt: 16224.01,
      isLinked: false,
      fundingId: 30377,
      groupBy: ["000000121", "000000121-1"],
      id: "000000121-1",
    },
    {
      storeNo: "000000121",
      chain: "0L7856",
      merchantId: "4445017800839",
      tid: "",
      fundingDate: "2024-08-26",
      merchantName: "BST*IRON MOUNTAIN",
      settlementType: "CD",
      transCount: 210,
      ttlFeeAmt: 19087.32,
      isLinked: false,
      fundingId: 31242,
      groupBy: ["000000121", "000000121-2"],
      id: "000000121-2",
    },
    {
      storeNo: "000000121",
      chain: "0L7856",
      merchantId: "4445017800839",
      tid: "",
      fundingDate: "2024-08-19",
      merchantName: "BST*IRON MOUNTAIN",
      settlementType: "CD",
      transCount: 226,
      ttlFeeAmt: 23306.08,
      isLinked: false,
      fundingId: 20097,
      groupBy: ["000000121", "000000121-3"],
      id: "000000121-3",
    },
  ];

  // Group rows by the first item in groupBy
  const groupedData = data.reduce((acc, row) => {
    const groupId = row.groupBy[0];
    if (!acc[groupId]) {
      acc[groupId] = [];
    }
    acc[groupId].push(row);
    return acc;
  }, {});

  // Column definitions
  const columns = [
    {
      field: "expand",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        const isParent = params.row.groupBy.length === 1;
        return isParent ? (
          <IconButton
            onClick={() => toggleRowExpansion(params.row.id)}
            aria-label="expand row"
            size="small"
          >
            {expandedRows[params.row.id] ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDown />
            )}
          </IconButton>
        ) : null;
      },
    },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "chain", headerName: "Chain", flex: 1 },
    { field: "merchantId", headerName: "MID", flex: 1 },
    { field: "merchantName", headerName: "DBAName", flex: 1.8 },
    { field: "settlementType", headerName: "SettleType", flex: 1 },
    {
      field: "fundingDate",
      headerName: "FundingDate",
      flex: 1.3,
      type: "date",
      valueGetter: (params) => new Date(params),
    },
    {
      field: "transCount",
      headerName: "TxnCnt",
      flex: 1,
      cellClassName: "align-right",
    },
    {
      field: "ttlFeeAmt",
      headerName: "TotalMonthEndFee",
      flex: 1.3,
      cellClassName: "align-right",
      type: "number",
    },
    { field: "fundingId", headerName: "Funding Id", flex: 1 },
    { field: "storeNo", headerName: "Store Number", flex: 1 },
  ];

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const onSelectionModelChange = (newSelectionModel) => {
    const newSelection = new Set(newSelectionModel);

    const updatedSelection = new Set(newSelectionModel);

    const selectedRows = data.filter((row) => newSelection.has(row.id));
    data.forEach((row) => {
      // If a parent row is selected, add all its children
      if (row.groupBy.length === 1 && newSelectionSet.has(row.id)) {
        data.forEach((child) => {
          if (child.groupBy.includes(row.id)) {
            updatedSelectionSet.add(child.id);
          }
        });
      }
    });

    setSelectionModel(Array.from(updatedSelection));
  };

  const getVisibleRows = () => {
    let visibleRows = [];
    Object.values(groupedData).forEach((rows) => {
      // Sort rows: parent rows first, then child rows
      rows
        .sort((a, b) => {
          return (
            a.groupBy.length - b.groupBy.length || a.id.localeCompare(b.id)
          );
        })
        .forEach((row) => {
          if (row.groupBy.length === 1 || expandedRows[row.groupBy[0]]) {
            visibleRows.push(row);
          }
        });
    });
    return visibleRows;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={getVisibleRows()}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ParentChildDataGrid;
