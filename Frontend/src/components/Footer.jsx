function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <h4 className="text-center">&copy; Online Shopping {currentYear}</h4>
    </>
  );
}

export default Footer;
