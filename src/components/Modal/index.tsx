import ReactModal from 'react-modal'

interface IModalProps {
  isOpen: boolean
  children?: JSX.Element
  className?: string
  shouldCloseOnOverlayClick?: boolean
  hideModal?: () => void
}

const Modal = ({ isOpen, children, className, hideModal }: IModalProps) => (
  <ReactModal
    isOpen={isOpen}
    className={className}
    shouldCloseOnOverlayClick={true}
    ariaHideApp={false}
    onRequestClose={hideModal}
  >
    {children}
  </ReactModal>
)

export default Modal
