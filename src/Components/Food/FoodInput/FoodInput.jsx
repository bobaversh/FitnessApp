import { useEffect, useState } from "react"
import { getFoodDataForDate } from "../FoodCalendar/foodService"
import styles from './FoodInput.module.css'


export default function FoodInput ( {selectedDate} ) {

    const [csvUrl, setCsvUrl] = useState('');
    const [csvData, setCsvData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [foodData, setFoodData] = useState({
        id: Date.now().toString(),
        date: selectedDate,
        url:'',
        kkal: '',
        protein: '',
        fats: '',
        carbs: ''
    })
  
    const handleDownload = async () => {
      if (!csvUrl) {
        setError('Please enter a valid URL');
        return;
      }
  
      setLoading(true)
      setError(null)
  
      try {
        const response = await fetch(csvUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const text = await response.text();
        const parsedData = parseCSV(text);
        setCsvData(parsedData);
      } catch (err) {
        setError(`Failed to download CSV: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
  
    const parseCSV = (text) => {
      const lines = text.split('\n');
      return lines.map(line => line.split(','));
    }
  
  

    useEffect(()=> {
        setFoodData(getFoodDataForDate(selectedDate))
    }, [selectedDate])

    return (
        <>        
        <div className={styles.containers}>
            <input 
            className={styles.csv}
            value={csvUrl}
            onChange={(e) => setCsvUrl(e.target.value)}
            ></input>
            <button onClick = {handleDownload}>p</button>
            <div className={styles.macroContainers}>
                <div className={styles.kkals}>{foodData.kkal}</div>
                <div className={styles.macro}>{foodData.protein}</div>
                <div className={styles.macro}>{foodData.fats}</div>
                <div className={styles.macro}>{foodData.carbs}</div>
            </div>
            <button onClick = {()=>{console.log(csvUrl, csvData)}}>check</button>
        </div>
        </>

    )
}