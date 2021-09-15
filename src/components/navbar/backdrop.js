import PropTypes from "prop-types";
import "./navbar.css";

function Backdrop({ closeHandler }) {
    return (
    <div className="backdrop" onClick={closeHandler}>
    </div>);
}
Backdrop.propTypes = {
    closeHandler: PropTypes.func,
};

export default Backdrop;