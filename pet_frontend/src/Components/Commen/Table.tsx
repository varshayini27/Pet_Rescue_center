import React from 'react';
import CustomDataTable from './customDataTable';

interface DataTableProps {
  dataRows: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  paginationTotalRows: number;
  dataColumns: any[];
  pagination?: boolean;
}

const CommonDataTable: React.FC<DataTableProps> = ({
  dataRows,
  onEdit,
  onDelete,
  paginationTotalRows,
  dataColumns,
  pagination
}) => {
  return (
    <CustomDataTable
      dataColumns={dataColumns}
      dataRows={dataRows}
      paginationTotalRows={paginationTotalRows}
      onEdit={onEdit}
      onDelete={onDelete}
      pagination={pagination ?? true}
    />
  );
};

export default CommonDataTable;
