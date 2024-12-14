import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';
import { Link } from 'react-router-dom';
const FeatureComponent = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className='text-white max-w-7xl mx-auto px-4 mt-40'>
            <h2 className='text-center text-3xl font-bold mb-8'>Our Features</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {FEATURES.map((feature, index) => (
                    <motion.div
                        key={index}
                        className='bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-700 transition-transform duration-300'
                        variants={cardVariants}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Link to={feature.link} >
                            <h3 className='text-xl font-semibold mb-4'>{feature.title}</h3>
                            <p className='text-gray-300'>{feature.description}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeatureComponent;
