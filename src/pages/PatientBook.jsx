import axios from 'axios';
import { useEffect, useState } from 'react';

export default function PatientBook() {
    const [availableSLots, setAvailableSlots] = useState(null);

    useEffect(() => {
        async function getAvailableSlots() {
            try {

            } catch (err){
                console.error("Error fetching slots:", err);
            }
        }

        getAvailableSlots();
    }, []);


    return <h2 className="text-xl">Book Appointment Page</h2>;
}
