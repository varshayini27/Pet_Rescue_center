import { Fragment, useState } from "react";
import { Eye } from "lucide-react";
import { FaPen, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import type { TableColumn, TableStyles } from "react-data-table-component";
import DataTable from "react-data-table-component";

interface TAction {
    onClick: (row: any, index: number) => void;
    variant: 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'success';
    icon: React.ReactNode;
    color?: string;
    title: string;
    disabled?: boolean;
}
interface ICustomDataTable<T> {
    dataColumns: TableColumn<T>[];
    dataRows: T[];
    paginationTotalRows?: number;
    dense?: boolean;
    pagination?: boolean;
    subHeader?: boolean;
    selectableRows?: boolean;
    onView?: (row: T, index: any) => void;
    onEdit?: (row: T, index: any) => void;
    onDelete?: (row: T, index: any) => void;
    actions?: (row: T, index: number) => TAction[];
    subHeaderComponent?: import("react").ReactNode;
    selectableRowSelected?: (row: T) => boolean;
    onSelectedRowsChange?: (selected: { allSelected: boolean, selectedCount: number, selectedRows: T[] }) => void;
    styles?: TableStyles,
}

const CustomDataTable = <T,>({
    styles,
    dataRows,
    dataColumns,
    paginationTotalRows,
    onView, onEdit, onDelete, actions: otherActions = () => ([]),
    subHeaderComponent,
    dense = false,
    subHeader = true,
    pagination = true,
    selectableRows = false,
    selectableRowSelected,
    onSelectedRowsChange,
}: ICustomDataTable<T>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [resetPagination, setResetPagination] = useState(false);

    const actions: TAction[] = [];
    const colors: { [key: string]: string } = {
        primary: '#fe6fc0',
        secondary: '#6e7985',
        info: '#3c8c3f',
        warning: '#ffc107',
        danger: '#ff5454',
        success: '#0cb785',
    };

    if (typeof onView == "function") {
        actions.push({
            onClick: onView,
            variant: 'primary',
            icon: <Eye size={20} />,
            title: 'View',
        });
    }
    if (typeof onEdit == "function") {
        actions.push({
            onClick: onEdit,
            variant: 'info',
            icon: <FaPen size={20} />,
            title: 'Edit',
        });
    }
    if (typeof onDelete == "function") {
        actions.push({
            onClick: onDelete,
            variant: 'danger',
            icon: <FaTrash size={20} />,
            title: 'Delete',
        });
    }

    const columns: TableColumn<T>[] = [
        {
            name: '#',
            selector: (row, rowIndex) => (parseInt(searchParams.get('size') || '0') * (parseInt(searchParams.get('page') || '1') - 1)) + rowIndex! + 1,
            width: "40px",
            // center: true,
        },
        ...dataColumns,
    ];

    const actionsCount = [...otherActions({} as any, 0), ...actions].length;
    if (actionsCount) {
        columns.push({
            name: 'Actions',
            button: true,
            center: true,
            minWidth: `${Math.max(actionsCount * 30, 80)}px`,
            cell: (row, index) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {[...otherActions(row, index), ...actions].map((action, index) => {
                        const { onClick, icon, variant, color, title, disabled = false } = action;
                        return (
                            <button
                                key={index}
                                title={title}
                                disabled={disabled}
                                style={{
                                    width: 40,
                                    height: 40,
                                    lineHeight: 0,
                                    color: color ?? colors[variant],
                                    zIndex: 0,
                                    border: 'none',
                                    cursor: disabled ? 'default' : 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 0,
                                }}
                                className="side-menu__icon"
                                onClick={() => onClick(row, index)}
                            >
                                {icon}
                            </button>
                        );
                    })
                    }
                </div>
            ),
        });
    }

    const customStyles: TableStyles = {
        head: {
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                zIndex: 1,
            },
        },
        headRow: {
            style: {
                zIndex: 1,
                backgroundColor: '#fff',
                marginBottom: '5px',
                borderRadius: '5px'
            }
        },
        rows: {
            style: {
                fontSize: '13px',
                cursor: 'pointer',
                paddingRight: '5px',
                backgroundColor: '#fff',
                borderBottom: 'none',
                marginBottom: '8px',
                borderRadius: '5px',
                textAlign: 'center',
            },
        },
        headCells: {
            style: {
                paddingLeft: '5px',
                paddingRight: '5px',
                borderBottom: 'none',
            },
        },
        cells: {
            style: {
                paddingLeft: '5px',
                paddingRight: '5px',
                borderBottom: 'none',
                backgroundColor: 'tranparent'
            },
        },
        table: {
            style: {
                minHeight: '300px',
                userSelect: 'none',
                borderCollapse: 'collapse',
                border: 'none',
                backgroundColor: 'tranparent'
            },
        },
        tableWrapper: {
            style: {
                paddingLeft: 0,
                marginLeft: 0,
                height: '100%',
                // ...styles?.tableWrapper?.style,
            },
        },
        pagination: {
            style: {
                minHeight: 30,
                userSelect: 'none',
                borderRadius: '5px',
            },
            pageButtonsStyle: {
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2px',
            },

        },
        subHeader: {
            style: {
                paddingLeft: 0,
                paddingRight: '15px',
                borderRadius: '5px'
            }
        },
        noData: {
            style: {
                backgroundColor: 'transparent',
            }
        },
        header: {
            style: {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
            },
        },
    };

    const handleChangeRowsPerPage = (currentRowsPerPage: number, currentPage: number) => {
        searchParams.set('size', currentRowsPerPage.toString());

        if (currentPage != 1) {
            searchParams.set('page', currentPage.toString());
        }
        setSearchParams(searchParams);
    }

    const handleChangePage = (page: number) => {
        if (!page || page == 1) {
            searchParams.delete('page');
            setSearchParams(searchParams);
        }
        else {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
        }
    }

    const onSearch = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const keyword = e.target.value;
        if (!keyword) {
            searchParams.delete('q');
            setSearchParams(searchParams);
        }
        else {
            searchParams.set('q', keyword);
            setSearchParams(searchParams);
            setResetPagination(true);
            handleChangePage(0)
        }
    }

    const onReset = () => {
        searchParams.delete('q');
        setSearchParams(searchParams);
    }

    return (
        <Fragment>
            <DataTable
                columns={columns}
                data={dataRows}
                className="custom-datatable custom-outline-border table-hover col-12"
                // className="table table-report"
                dense={dense}
                customStyles={customStyles}
                striped={false}
                highlightOnHover={false}
                responsive={true}
                selectableRows={selectableRows}
                selectableRowSelected={selectableRowSelected}
                onSelectedRowsChange={onSelectedRowsChange}
                pagination={pagination}
                paginationServer
                // paginationTotalRows={paginationTotalRows}
                paginationTotalRows={Math.max(paginationTotalRows ?? 0, 1)}
                paginationDefaultPage={searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined}
                paginationPerPage={searchParams.get('size') ? parseInt(searchParams.get('size')!) : undefined}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                paginationResetDefaultPage={resetPagination}

                // fixedHeader={true}
                // fixedHeaderScrollHeight="calc(100vh - 350px)"
                persistTableHead={true}
                subHeaderWrap
                subHeaderComponent={
                    <div className="w-100 d-flex justify-content-between">
                        <div>{subHeaderComponent}</div>
                        <div className="d-flex justify-content-center">
                            <form className="input-group" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" className="form-control form-control-sm"
                                    value={searchParams.get('q') || ""}
                                    onChange={(e) => onSearch(e)}
                                    placeholder="Type to search" />
                                <button
                                    className="btn text-light btn-sm btn-info ri-search-2-line fs-6"
                                    type="button" onClick={onReset}
                                ><MdClose size={20} /></button>
                            </form>
                        </div>
                    </div>
                }
                subHeader={subHeader}
                noDataComponent={<div style={{ padding: '24px', width: '100%', textAlign: 'center', minHeight: '300px', alignContent: 'center' }} className="no_data">There are no records to display</div>}
            // progressPending={!products?.length ? true : false}
            // progressComponent={<h2>Loading.....</h2>}
            />
        </Fragment >
    )
}

export default CustomDataTable;