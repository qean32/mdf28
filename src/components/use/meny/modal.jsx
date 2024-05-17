const Modal = ({ component, viewModal, propsStyle, propsStyle_ }) => {
    return (
        <>
            {viewModal &&
                <div className="modal" style={propsStyle}>
                    <div style={propsStyle_}>
                        {component}
                    </div>
                </div>}
        </>
    );
}

export default Modal;