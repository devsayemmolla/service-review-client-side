import { Button, IconButton } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { AuthContext } from '../../../../Contexts/UserContext';

const AddReview = ({ setRdata }) => {
    const [stars, setStars] = useState(0)

    const [text, setText] = useState("")
    const starsCount = (num) => {
        setStars(num);
    }

    const { user } = useContext(AuthContext);

    const addReview = () => {
        const ratings = stars;
        const img = user?.photoURL;
        const email = user?.email;
        const name = user?.displayName;
        const timestamp = Date.now();
        const time = new Date(timestamp);
        const description = text;
        console.log(description)
        const data = { name, email, img, ratings, description, time }
        fetch("https://service-review-server-server.vercel.app/reviews", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged
                    > 0) {
                    alert("reviews add successfully");
                    setRdata(true)
                }
            });

    }


    return (
        <div>
            <div className="flex flex-col mt-16 p-8 shadow-sm rounded-xl lg:p-12 bg-gray-900 text-gray-100">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                    <div className="flex flex-col items-center py-6 space-y-3">
                        <span className="text-center">How was your experience?</span>
                        <div className="flex space-x-3">
                            {/* ----btn 1----- */}
                            <IconButton className='text-amber-400 font-2xl' size="sm" variant="text" onClick={() => { starsCount(3.9) }}>
                                <FaStar />
                            </IconButton>
                            {/* ----btn 1----- */}
                            <IconButton className='text-amber-400 font-2xl' size="sm" variant="text" onClick={() => { starsCount(4.5) }}>
                                <FaStar />
                            </IconButton>
                            {/* ----btn 1----- */}
                            <IconButton className='text-amber-400 font-2xl' size="sm" variant="text" onClick={() => { starsCount(4.6) }}>
                                <FaStar />
                            </IconButton>
                            {/* ----btn 1----- */}
                            <IconButton className='text-amber-400 font-2xl' size="sm" variant="text" onClick={() => { starsCount(4.9) }}>
                                <FaStar />
                            </IconButton>
                            {/* ----btn 1----- */}
                            <IconButton className='text-amber-400 font-2xl' size="sm" variant="text" onClick={() => { starsCount(5.0) }}>
                                <FaStar />
                            </IconButton>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <textarea rows="3" onBlur={(event) => setText(event.target.value)} placeholder="Message..." className="p-4 rounded-md resize-none text-gray-100 bg-gray-900"></textarea>
                        <Button onClick={addReview} type="button" className="py-4 my-8 font-semibold rounded-md dark:text-gray-900 dark:bg-violet-400">Give feedback</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddReview;