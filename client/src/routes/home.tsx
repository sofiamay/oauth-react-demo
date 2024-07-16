import MainLayout from "../layouts/MainLayout";
import { SITE_TITLE } from "../constants";

function Home() {
  const title = SITE_TITLE;
  return (
    <MainLayout title={title}>
      <div className="flex flex-col justify-center">
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
      </div>
    </MainLayout>
  );
}

export default Home;