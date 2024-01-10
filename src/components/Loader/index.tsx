import loader from 'assets/loader/loader.gif'

const Spinner = () => (
  <div
    style={{
      display: 'flex',
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5,
      backdropFilter: 'blur(1px)',
    }}
  >
    <img src={loader} alt="loader" style={{ width: '800px', zIndex: 5 }} />
  </div>
)

Spinner.defaultProps = {
  fullScreen: false,
}

export default Spinner
