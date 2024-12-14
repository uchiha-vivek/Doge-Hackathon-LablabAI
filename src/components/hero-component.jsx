
import chart from '../assets/charts.jpg'

import form from '../assets/form.png'
function Hero() {
    return (
        <>
            <div className='flex flex-col md:flex-row items p-6 mt-8 ' >
                <div className='md:w-1/2 mb-6 md:mb-0' >
                    <img src={chart} alt='chart' height={100} width={450} className=' h-auto rounded-lg' />
                </div>
                <div className="md:w-1/2 pl-6">
                    <h2 className="text-3xl font-bold mb-4 text-white">Streamline Government Services with Instant Forms and Real-Time Analysis  </h2>
                    <p className="text-lg text-white">
                        Simplify your engagement with government services by accessing instant forms tailored to your needs. Whether you're providing feedback, requesting a service, or completing a task, our platform offers a seamless, efficient way to submit your information.

                       


                    </p>
                </div>


            </div>


        </>
    )
}
export default Hero