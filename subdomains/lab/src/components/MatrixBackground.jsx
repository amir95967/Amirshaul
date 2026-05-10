// subdomains/lab/src/components/MatrixBackground.jsx
import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // הגדרת גודל הקנבס שיתפרס על כל המסך
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // התווים שירצו (אותיות, מספרים, וסימנים מיוחדים)
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789$+-*/%=<>!&|?#@';
        const charArray = characters.split('');

        const fontSize = 16;
        const columns = canvas.width / fontSize; // מספר העמודות

        // מערך שישמור את מיקום ה-Y הנוכחי של כל עמודה
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1; // כולן מתחילות מלמעלה
        }

        // פונקציית הציור המרכזית
        const draw = () => {
            // יצירת אפקט ה"שובל" על ידי ציור רקע שחור שקוף למחצה
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // הגדרת צבע ופונט לקוד
            ctx.fillStyle = '#0f0'; // ירוק קלאסי
            ctx.font = `${fontSize}px monospace`;

            // ציור תו אחד עבור כל עמודה
            for (let i = 0; i < drops.length; i++) {
                // בחירת תו אקראי
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                
                // ציור התו במיקום ה-X וה-Y המתאים
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // אם התו הגיע לסוף המסך, או באופן אקראי - נחזיר אותו להתחלה
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // קידום מיקום ה-Y לעבר השורה הבאה
                drops[i]++;
            }
        };

        // הרצת פונקציית הציור בלולאה (אנימציה)
        const intervalId = setInterval(draw, 33); // בערך 30 פריים לשנייה

        // פונקציית ניקוי (למקרה שהרכיב מוסר מהמסך)
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // הגדרות הסטייל כדי שהקנבס יתפקד כרקע
    const canvasStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // מבטיח שזה יהיה מתחת לכל התוכן
        pointerEvents: 'none', // מאפשר ללחוץ על אלמנטים שמתחת
    };

    return <canvas ref={canvasRef} style={canvasStyle} />;
};

export default MatrixBackground;