import {
  Edit,
  TextInput,
  SimpleForm,
  RichTextField,
  ImageInput,
} from "react-admin";

// function Title() {
//   const { record } = props || {};
//   return <span>{record.title}</span>;
// }

const EditItem = (props: any) => {
  return (
    <Edit {...props} title={<title />}>
      <SimpleForm>
        <TextInput source="title" label="Tiêu đề" />
        <TextInput source="shortContent" label="Nội dung xem trước" />
        <RichTextField source="content" label="Nội dung chi tiết" />
        <ImageInput source="thumnail" label="Ảnh preview" />
        <TextInput source="description" label="Mô tả" />
        <TextInput source="source" label="Nguồn" />
        <TextInput source="tags" />
      </SimpleForm>
    </Edit>
  );
};

export default EditItem;
