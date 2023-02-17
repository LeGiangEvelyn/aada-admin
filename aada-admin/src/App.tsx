import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { NewsList } from "./component/News/NewsList";
import dataProvider from "./dataProvider";

export default function App() {
  return (
    <Admin dataProvider={dataProvider()}>
      <Resource name="news" list={NewsList} />
      <CustomRoutes>
        <Route path="http://localhost:3000/admin" />
      </CustomRoutes>
      {/* edit={EditGuesser} /> */}
    </Admin>
  );
}
