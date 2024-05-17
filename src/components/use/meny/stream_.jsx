const Stream_ = () => {
    return (
        <div className='content_right_' style={{ height: '240px', transform: 'translateX(-30px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', overflow: 'hidden', padding: '0'}}>
            <img src="/svg/repair.svg" style={{height: '100px',margin: '10px'}} alt="" />
            <p style={{margin: '10px'}}>трансляция не идет</p>
            {/* <iframe
                src="https://player.twitch.tv/?channel=byzxclown"
                height="100%"
                width="100%">
            </iframe> */}
        </div>
    );
}

export default Stream_;