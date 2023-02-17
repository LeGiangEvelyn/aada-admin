import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
} from "react-admin";

export const NewsList = () => {
  return (
    <List>
      <Datagrid>
        {/* <NumberField source="id"  /> */}
        <TextField source="title" />
        <TextField source="shortContent" />
        <DateField source="createdAt" />
        <TextField source="thumbnail" />
        <TextField source="tags" />
        {/* <EditButton basePath="/news" /> */}
        {/* <DeleteButton basePath="/news" /> */}
      </Datagrid>
    </List>
  );
};
