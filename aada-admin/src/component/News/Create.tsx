import { Create, SimpleForm, TextInput } from "react-admin";

const CreateItem = (props: any) => {
  return (
    <Create {...props} title="create news">
      <SimpleForm>
        <TextInput label="title" source="title" resettable />
        <TextInput label="short content" source="shortContent" resettable />
        <TextInput label="content" source="content" resettable />
        <TextInput label="description" source="description" multiline />
        <TextInput label="thumbnail" source="thumbnail" resettable />
        <TextInput label="tags" source="tags" resettable />
      </SimpleForm>
    </Create>
  );
};

export default CreateItem;
