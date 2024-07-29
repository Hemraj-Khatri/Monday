function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer>
        <h4 className="text-center">
          All rights reserved &copy; {currentYear}{" "}
        </h4>
      </footer>
    </>
  );
}
export default Footer;
