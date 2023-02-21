import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import NewsEdit from "./component/News/NewsEdit";
import { NewsList } from "./component/News/NewsList";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import CreateItem from "./User/Create";

export default function App() {
  return (
    <Admin dataProvider={dataProvider()} authProvider={authProvider}>
      <Resource
        name="news"
        list={NewsList}
        edit={NewsEdit}
        create={CreateItem}
      />
      <CustomRoutes>
        <Route path="http://localhost:3000/admin" />
      </CustomRoutes>
      <Resource
        name="dashboard"
        list={NewsList}
        edit={NewsEdit}
        create={CreateItem}
      />

      {/* edit={EditGuesser} /> */}
    </Admin>
  );
}
