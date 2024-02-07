import { useState, useEffect, useRef } from 'react';
import { clearMessage } from '../store/slices/notification.slice';
import { useAppDispatch, useAppSelector } from '../store/services/hooks.service';

export default function AlertComponent() {
    // set alerts 
    const [alerts, setAlerts] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    // state notification
    const { status, messages, isAlert } = useAppSelector(state => state.notificationState);

    const timerRef = useRef<number | null>(null);

    const closeAlert = (index: number) => {
        const updatedAlerts = [...alerts];
        updatedAlerts.splice(index, 1);
        setAlerts(updatedAlerts);
        dispatch(clearMessage());
    };

    useEffect(() => {
        if (isAlert) {
            setAlerts(messages);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = window.setTimeout(() => {
                setAlerts([]);
                dispatch(clearMessage());
            }, 5000);

            return () => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    dispatch(clearMessage());
                }
            };
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isAlert, dispatch]);

    return (
        <div className="fixed top-16 right-4 flex flex-col items-end z-50">
            {alerts.map((message, index) => (
                <div
                    key={index}
                    className={`flex items-center bg-white p-4 mb-2 rounded-lg text-xs sm:text-sm`}
                >
                    <span className="mr-2 flex-shrink-1">
                        <span className='font-bold'>{status}</span>: {message}
                    </span>
                    <button
                        className={`ml-2 font-bold text-xl`}
                        onClick={() => closeAlert(index)}
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
}