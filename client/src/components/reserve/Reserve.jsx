import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);//this date is a range so we need all in one


  //dates ile gelen tarixi parcalayib milli secondlara bolub Aalldates olarag degiskene atayiriq
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];
    //5 nen 11 ne kimi  5 6 7 8 9 10 11 de icine eklenir
    while (date <= end) {
      dates.push(new Date(date).getTime());

      date.setDate(date.getDate() + 1);//we r increasing the date after pushing
    }

    return dates;//milliseconds seklinde geri doner
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);//millisecondlarla 4-nen 7sene olan aralig gunleri verir

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime()) //if it includes any date our inside db
    );

    //if it includes it is gonna be true so we shoudl return  opposite .
    //If it is true it means it is not available
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    //eger checked ise selected roomsu al ve icine id ni ekle
    //yox eger degilse onda  butun selected roomlslari filter et ve o degeri ordan cixart
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
  };

  console.log(selectedRooms);
  const navigate = useNavigate();


  //update room avalibality
  const handleClick = async () => {
    try {
      await Promise.all(
        //burda secilen otaglarin her birin icine secilen tarixi enjekte edirik
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, { dates: alldates, });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) { }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              {/* title=>room name  */}
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}$</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber, i) => (
                <div className="room" key={i}>
                  <label>{roomNumber.number}</label>
                  <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
