const Shadow = ({viewShadow, of_modal}) => {
    return (
        <>
        {viewShadow && <div className="shadow" onClick={of_modal}></div>}
        </>
     )
}
 
export default Shadow;