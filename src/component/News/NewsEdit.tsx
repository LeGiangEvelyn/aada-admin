import {
  Edit,
  TextInput,
  SimpleForm,
  ImageInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "react-admin";

// function Title() {
//   const { record } = props || {};
//   return <span>{record.title}</span>;
// }

const EditItem = (props: any) => {
  return (
    <Edit {...props} title={<title />}>
      <SimpleForm>
        <TextInput source="title" label="Tiêu đề" fullWidth />
        <TextInput source="shortContent" label="Nội dung xem trước" fullWidth multiline />
        <TextInput source="content" label="Nội dung chi tiết" fullWidth multiline />
        <ImageInput source="thumnail" label="Ảnh preview" />
        <TextInput source="description" label="Mô tả" fullWidth multiline />
        <TextInput source="source" label="Nguồn" fullWidth multiline />
        <ImageInput source="wallpaper" label="Wallpaper" fullWidth />
        <ArrayInput source="tags">
          <SimpleFormIterator>
            <TextInput source="" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default EditItem;
