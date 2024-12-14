
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
                    <h2 className="text-3xl font-bold mb-4 text-white">Responsive Image & Text</h2>
                    <p className="text-lg text-white">
                        This is an example of a responsive component with an image on the left and text on the right. On smaller screens, the image will be placed above the text. Tailwind CSS is used for styling and making the layout responsive.
                    </p>
                </div>
                
                 
            </div>
            
             
        </>
    )
}
export default Hero