import Loader from 'react-loader-spinner';

const Loading = (() => {
  return(
    <>
      <Loader
        type='Oval'
        color='#3d66ba'
        height={30}
        width={30}
        timeout={2000}
      />
      </>
  )
})
export default Loading;