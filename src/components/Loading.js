import "../loading.css";
const LoadingIndicator = (props) => {
    return (
        <>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
    );
  };