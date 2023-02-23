import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import NewsEdit from "./component/News/NewsEdit";
import { NewsList } from "./component/News/NewsList";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import { UserList } from "./component/User/UserList";
import CreateItem from "./component/News/Create";

export default function App() {
  return (
    <Admin dataProvider={dataProvider()} authProvider={authProvider}>
      <Resource
        name="dashboard"
      />

      <Resource
        name="users"
        list={UserList}
      />
      <Resource
        name="news"
        list={NewsList}
        edit={NewsEdit}
        create={CreateItem}
      />
      <CustomRoutes>
        <Route path="http://localhost:3000/api/v2/admin" />
      </CustomRoutes>
      {/* edit={EditGuesser} /> */}
    </Admin>
  );
}
