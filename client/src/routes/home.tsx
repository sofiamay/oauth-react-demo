import MainLayout from "../layouts/MainLayout";
import { SITE_TITLE } from "../constants";
import Login from "../components/Login";

function Home() {
  const title = SITE_TITLE;
  return (
    <MainLayout title={title}>
      <Login />
    </MainLayout>
  );
}

export default Home;