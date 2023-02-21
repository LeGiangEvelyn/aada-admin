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
} from "react-admin";

const PostListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const NewsList = () => {
  return (
    <List actions={<PostListActions />}>
      <Datagrid>
        {/* <NumberField source="id"  /> */}
        <TextField source="title" />
        <TextField source="shortContent" />
        <DateField source="createdAt" />
        <TextField source="thumbnail" />
        <TextField source="tags" />
        <EditButton label={"Edit"} />
        <DeleteButton label={"Delete"} />
      </Datagrid>
    </List>
  );
};
