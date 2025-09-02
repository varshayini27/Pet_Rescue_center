
export const PetColumns = [
    {
        name: 'Branch Account Name',
        selector: (row: any) => row?.acc_name,
    },
    {
        name: 'Bank',
        selector: (row: any) => (row?.bank?.name),
    },
    {
        name: 'Account Type',
        selector: (row: any) => (row?.bankAccountType?.name),
    },
    {
        name: 'Mobile No',
        selector: (row: any) => (row?.mobile),
    },
    {
        name: 'Mail ID',
        selector: (row: any) => (row?.mail),
    },
    {
        name: 'Status',
        center: true,
        selector: (row: any) => (row?.is_active ? 'Active' : 'Inactive'),
        cell: (row: any) => (
            <span
                style={{
                    color: row?.is_active ? '#3c8c3f' : 'red',
                    fontWeight: 'bold',
                }}
            >
                {row?.is_active ? 'Active' : 'Inactive'}
            </span>
        ),
    },
];
