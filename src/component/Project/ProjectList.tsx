import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    TopToolbar,
    ExportButton,
    NumberField,
} from "react-admin";

const UserListAction = () => (
    <TopToolbar>
        <ExportButton />
    </TopToolbar>
);

export const UserList = () => {
    return (
        <List actions={<UserListAction />}>
            <Datagrid>
                <NumberField source="id" />
                <TextField source="firstName" />
                <TextField source="lastName" />
                <TextField source="email" />
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
                <TextField source="enabled" />
                <TextField source="role" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
