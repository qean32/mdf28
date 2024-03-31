const Modal = ({ component,viewModal,propsStyle, propsStyle_two}) => {
    return (
        <>
            {viewModal && 
            <div className="modal" style={propsStyle}>
                <div style={propsStyle_two}>
                    {component}
                </div>
            </div>}
        </>
    );
}

export default Modal;