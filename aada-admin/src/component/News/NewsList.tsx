import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  NumberField,
} from "react-admin";

const NewsListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const NewsList = () => {
  return (
    <List actions={<NewsListActions />}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="shortContent" />
        <DateField source="createdAt" />
        <TextField source="thumbnail" />
        <TextField source="tags" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
