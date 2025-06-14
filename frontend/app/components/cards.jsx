 import React from "react";
 import Single from '../assets/single.png';



 const cards=()=>{
    return(
        <div className="w-full py-[10rem] px-4 bg-black">
            <div className=' max-w-[1240px] mx-auto grid grid-cols-3 gap-8'>
                <div className="w-full border">
                    <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Single} alt="" />
                    <h2>Beginner</h2>
                    <p>Learning How To Code From Scratch </p>
                    <button>
                        Start Here
                    </button>

                </div>

            </div>
            
        </div>
    );
 };
 export default cards;