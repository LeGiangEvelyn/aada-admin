import { ArrayInput, Create, SimpleForm, SimpleFormIterator, TextInput } from "react-admin";

const CreateItem = (props: any) => {
  return (
    <Create {...props} title="Create news">
      <SimpleForm>
        <TextInput label="title" source="title" validate={require} fullWidth resettable />
        <TextInput label="short content" source="shortContent" validate={require} fullWidth multiline resettable />
        <TextInput label="content" source="content" validate={require} fullWidth multiline resettable />
        <TextInput label="description" source="description" multiline />
        <TextInput label="thumbnail" source="thumbnail" resettable />
        <ArrayInput source="tags">
          <SimpleFormIterator>
            <TextInput source="" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default CreateItem;
