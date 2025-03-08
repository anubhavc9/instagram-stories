import "../App.css";

const Error = () => {
  return (
    <div style={{ textAlign: "center", margin: "16px" }}>
      <img src="/assets/error.svg" alt="404" style={{ height: "40px" }} />
      <h4 style={{ color: "black", margin: "0px" }}>
        An error occurred. Please try again after sometime.
      </h4>
    </div>
  );
};

export default Error;
