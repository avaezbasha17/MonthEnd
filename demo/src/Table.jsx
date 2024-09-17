import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const ParentChildTable = () => {
  const [selected, setSelected] = useState({});
  const [expandedRows, setExpandedRows] = useState({});

  const data = [
    {
      groupBy: ["000000025"],
      storeNo: "000000025",
      chain: "0L7856",
      merchantId: "4445017521245",
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
  ];

  const handleParentCheck = (parentId) => {
    const isSelected = selected[parentId]?.selected || false;
    setSelected((prev) => {
      const updatedState = { ...prev, [parentId]: { selected: !isSelected } };
      data.forEach((d) => {
        if (d.groupBy.includes(parentId) && d.id !== parentId) {
          updatedState[d.id] = { selected: !isSelected };
        }
      });
      return updatedState;
    });
  };

  const handleChildCheck = (parentId, childId) => {
    const isSelected = selected[childId]?.selected || false;
    setSelected((prev) => ({
      ...prev,
      [childId]: { selected: !isSelected },
      [parentId]: {
        selected: data
          .filter((d) => d.groupBy.includes(parentId) && d.id !== parentId)
          .every((child) => prev[child.id]?.selected || child.id === childId),
      },
    }));
  };

  const toggleRowExpansion = (parentId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [parentId]: !prev[parentId], // Toggle expansion state
    }));
  };

  const renderParentRow = (parent) => (
    <>
      <TableRow key={parent.id}>
        <TableCell style={{ width: 50 }}>
          <IconButton
            onClick={() => toggleRowExpansion(parent.id)}
            aria-label="expand row"
            size="small"
          >
            {expandedRows[parent.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell style={{ width: 100 }}>
          <Checkbox
            checked={selected[parent.id]?.selected || false}
            onChange={() => handleParentCheck(parent.id)}
          />
        </TableCell>
        <TableCell style={{ width: 200 }}>{parent.merchantName}</TableCell>
        <TableCell style={{ width: 120 }}>{parent.storeNo}</TableCell>
        <TableCell style={{ width: 150 }}>{parent.transCount}</TableCell>
        <TableCell style={{ width: 150 }}>${parent.ttlFeeAmt.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={expandedRows[parent.id]} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableBody>
                {data
                  .filter((d) => d.groupBy.includes(parent.id) && d.id !== parent.id)
                  .map((child) => renderChildRow(parent.id, child))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );

  const renderChildRow = (parentId, child) => (
    <TableRow key={child.id}>
      <TableCell style={{ paddingLeft: 70, width: 50 }}>
        <Checkbox
          checked={selected[child.id]?.selected || false}
          onChange={() => handleChildCheck(parentId, child.id)}
        />
      </TableCell>
      <TableCell style={{ paddingLeft: 70, width: 200 }}>
        {child.merchantName}
      </TableCell>
      <TableCell style={{ paddingLeft: 70, width: 120 }}>
        {child.storeNo}
      </TableCell>
      <TableCell style={{ paddingLeft: 70, width: 150 }}>
        {child.transCount}
      </TableCell>
      <TableCell style={{ paddingLeft: 70, width: 150 }}>
        ${child.ttlFeeAmt.toFixed(2)}
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 50 }}></TableCell>
            <TableCell style={{ width: 100 }}>Select</TableCell>
            <TableCell style={{ width: 200 }}>Merchant Name</TableCell>
            <TableCell style={{ width: 120 }}>Store No</TableCell>
            <TableCell style={{ width: 150 }}>Transaction Count</TableCell>
            <TableCell style={{ width: 150 }}>Total Fee Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((d) => d.groupBy.length === 1) // Get only parents
            .map((parent) => renderParentRow(parent))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParentChildTable;
