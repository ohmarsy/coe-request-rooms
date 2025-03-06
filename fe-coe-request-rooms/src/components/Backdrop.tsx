const Backdrop = ({ onClick }: { onClick: () => void }) => {
    return (
      <div
        className="fixed inset-0 bg-gray-500/50 z-40"
        onClick={onClick}
      ></div>
  )
}

export default Backdrop