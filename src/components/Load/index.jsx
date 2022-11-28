export default function LoadingHolder({loading = false, ...props}) {
    if(!!loading) {
        return (
            <div className = "position-relative" {...props}>
                <div className="position-absolute d-flex justify-content-center align-items-center" style={{
                    top: 0,
                    backgroundColor: 'rgba(255,255,255,0.65)',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 2
                }}>
                    <div className="spinner-border" style={{ width: 45, height: 45 }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}