import React, { useContext } from 'react';
import './ExploreCategories.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreCategories = ({ category, setCategory }) => {
  const { vacation_list } = useContext(StoreContext);

  return (
    <div className='explore-vacation' id='explore-vacation'>
      <h1>Explore Destinations</h1>
      <p className='explore-vacation-text'>
        Choose from a diverse range of travel themes and experiences. Whether you're chasing mountains, beaches, or cities — we’ve got your next trip covered.
      </p>
      <div className="explore-vacation-list">
        {vacation_list.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(prev => prev === item.vacation_name ? "All" : item.vacation_name)} 
              key={index} 
              className='explore-vacation-list-item'
            >
              <img 
                src={item.vacation_image} 
                className={category === item.vacation_name ? "active" : ""} 
                alt={item.vacation_name} 
              />
              <p>{item.vacation_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreCategories;
