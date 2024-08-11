import { Helmet } from "react-helmet-async";

function Meta({
  title = "Welcome To Online Shopping",
  description = "Test description",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
export default Meta;
