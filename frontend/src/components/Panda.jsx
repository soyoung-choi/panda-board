import panda from 'images/panda.svg'

const Panda = () => {
  return (
    <>
      <div className="panda" style={{ width: '230px', margin: '50px auto' }}>
        <img
          src={panda}
          alt="판다"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <h1 style={{ fontSize: '36px', textAlign: 'center' }}>Panda Board</h1>
      </div>
    </>
  )
}

export default Panda
